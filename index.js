import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6";

var vw = $(window).width();
var vh = $(window).height();
var bb = [0, 0, vw, vh];

const final = "kelp";

class Center {

    constructor() {
        this.points = [
            [parseInt(vw / 6) * 1, parseInt(vh / 8) * 1],
            [parseInt(vw / 6) * 5, parseInt(vh / 8) * 1],
            [parseInt(vw / 6) * 5, parseInt(vh / 8) * 7],
            [parseInt(vw / 6) * 1, parseInt(vh / 8) * 7],
            [parseInt(vw / 6) * 1, parseInt(vh / 8) * 1]
        ];
        let center_path = this.points.map(
            coords => [coords[0] - (vw * .165), coords[1] - (vh * .125)]
        ).join(' ');
        let center_tag = `<polygon class="center" points="${center_path}" />`
        $('svg.center').html(center_tag);

    }

    containsPoint = function(pt) {
        let x = parseInt(pt[0]);
        let y = parseInt(pt[1]);
        return (y > (vh/8) && y < (7*vh/8)) && (x > (vw/6) && x < (5*vw/6));
    };
}

function loadDelaunay(center, step, multiplier) {

    function getPointsOnLine(start, end, step) {

        var coords = Array();

        let run = parseInt(start[0]) - parseInt(end[0]);
        let rise = parseInt(start[1]) - parseInt(end[1]);
        let length = Math.sqrt(run ** 2 + rise ** 2);

        let intervals = parseInt(multiplier * length / step);

        for (let i = 1; i <= intervals; i += 1) {
            coords.push([
                start[0] - parseInt(i * run / intervals),
                start[1] - parseInt(i * rise / intervals)
            ]);
        };

        return coords
    };

    // place points on edge of center
    var coords = center.points.map(pt => ({ ...pt }));
    for (let c = 0; c < center.points.length; c += 1) {
        let n = c > 0 ? c - 1 : center.points.length - 1;
        let points = getPointsOnLine(center.points[c], center.points[n], step);
        for (let i in points) {
            coords.push(points[i]);
        };
    };

    // place points on edges of page
    for (let w = 0; w <= vw; w += step) {
        coords.push([w, 0], [w, vh]);
    };
    for (let h = step; h <= vh; h += step) {
        coords.push([0, h], [vw, h]);
    };
    coords.push([vw, 0], [vw, vh]);

    // fill rest of page with random points
    let x, y = null;
    let numPoints = Math.min(parseInt((vh * vw) / (step * 50)), 500);
    for (let i = 0; i < numPoints; i += 1) {
        do {
            x = parseInt(Math.random() * vw);
            y = parseInt(Math.random() * vh);
        } while (center.containsPoint([x, y]))
        coords.push([x, y]);
    };

    // create delaunay
    const delaunay = Delaunay.from(coords);

    // draw delaunay
    let path_tag = `<path id="triangulation" d="${delaunay.render()}" />`;
    $('#diagram').html(path_tag);

    return delaunay;

};

function loadVoronoi(delaunay) {

    const voronoi = delaunay.voronoi(bb);
    
    let voronoi_tag = `<path id="tesselation" d="${voronoi.render()}" />`;
    $('#diagram').html($('#diagram').html().concat(voronoi_tag));

    return voronoi;

};

function insertScrollPaths(center, delaunay, voronoi) {

    // helper functions
    function lineIntersectionPoint(l1, l2) {
        // https://dirask.com/posts/JavaScript-how-to-calculate-intersection-point-of-two-lines-for-given-4-points-VjvnAj

        let p1 = l1[0];
        let p2 = l1[1];
        let p3 = l2[0];
        let p4 = l2[1];

        // down part of intersection point formula
        var d1 = (p1[0] - p2[0]) * (p3[1] - p4[1]); // (x1 - x2) * (y3 - y4)
        var d2 = (p1[1] - p2[1]) * (p3[0] - p4[0]); // (y1 - y2) * (x3 - x4)
        var d = (d1) - (d2);

        if (d == 0) return [];

        // upper part of intersection point formula
        var u1 = (p1[0] * p2[1] - p1[1] * p2[0]); // (x1 * y2 - y1 * x2)
        var u4 = (p3[0] * p4[1] - p3[1] * p4[0]); // (x3 * y4 - y3 * x4)

        var u2x = p3[0] - p4[0]; // (x3 - x4)
        var u3x = p1[0] - p2[0]; // (x1 - x2)
        var u2y = p3[1] - p4[1]; // (y3 - y4)
        var u3y = p1[1] - p2[1]; // (y1 - y2)

        // intersection point formula
        var px = (u1 * u2x - u3x * u4) / d;
        var py = (u1 * u2y - u3y * u4) / d;

        if (px < 0 || py < 0 || px > vw || py > vh) return [];
        var p = [parseInt(px), parseInt(py)];

        return p;
    };

    function pointDistance(a, b) {
        return Math.sqrt((a[0] - b[0]) ** 2 + (a[1] - b[1]) ** 2);
    };

    function lineToPath(start, end, className) {
        return `<path class="drawPath ${className}" d="M${start}L${end}Z" />`
    };

    // useful attributes
    const { halfedges, points, triangles } = delaunay;
    const { circumcenters } = voronoi;

    // write a tag for each path
    var path_tags = Array();
    for (let i in halfedges) {

        let j = halfedges[i];
        if (j < i) continue;

        const ti = triangles[i];
        const tj = triangles[j];

        var dl = [
            [points[ti * 2], points[ti * 2 + 1]],
            [points[tj * 2], points[tj * 2 + 1]]
        ];

        const cc = circumcenters;
        var vl = [
            [cc[Math.floor(i / 3) * 2], cc[Math.floor(i / 3) * 2 + 1]],
            [cc[Math.floor(j / 3) * 2], cc[Math.floor(j / 3) * 2 + 1]]
        ];

        // find startpoint for delaunay paths
        var dpt = lineIntersectionPoint(dl, vl);

        // find startpoint for voronoi paths
        var vpt = dpt;
        let segmentLength = pointDistance(vl[0], vl[1]);
        if (pointDistance(dpt, vl[0]) > segmentLength || pointDistance(dpt, vl[1]) > segmentLength) {
            vpt = [(vl[0][0] + vl[1][0]) / 2, (vl[0][1] + vl[1][1]) / 2];
        };

        // convert point pairs to path elements
        path_tags.push([
            lineToPath(dpt, dl[0], "delaunay"),
            lineToPath(dpt, dl[1], "delaunay"),
            lineToPath(vpt, vl[0], "voronoi"),
            lineToPath(vpt, vl[1], "voronoi"),
        ].join(""));
    };

    $('#diagram').html($('#diagram').html().concat(path_tags));

    var pathLengths = {
        "delaunay": Array(),
        "voronoi": Array()
    };

    $(".delaunay").each(function() {
        let length = this.getTotalLength();
        pathLengths["delaunay"].push(length);
        this.style.strokeDasharray = length;
        this.style.strokeDashoffset = length;
    });

    $(".voronoi").each(function() {
        let length = this.getTotalLength();
        pathLengths["voronoi"].push(length);
        this.style.strokeDasharray = length;
        this.style.strokeDashoffset = length;
    });

    return pathLengths;

};

// Color polygons on hover
/*
$("#diagram").on('mouseenter', '#tesselation', function() {
    let colors = ["red", "green", "blue"];
    $(this).css("fill", colors[parseInt(Math.random() * colors.length)]);
}).on('mouseleave', '#tesselation', function() {
    $(this).css("fill", "white");
});*/


// Render text
let transitionArray = $("div.transition").map(function() {
    return [
        $(this).attr("id").split('-')[0], 
        $(this).offset().top
    ];
});
let transitionObject = {};
for (let i = 0; i < transitionArray.length; i += 2) {
    transitionObject[transitionArray[i]] = transitionArray[i+1];
}
transitionObject[final] = $(document).height() + 1;

let anchorArray = $("a.anchor").map(function() {
    return [
        $(this).attr("id").split('-')[0], 
        $(this).offset().top + $(this).height()
    ];
});

const anchorsByHeight = {};
for (let i = 0; i < anchorArray.length; i += 2) {
    if (!isNaN(anchorArray[i+1])) {

        let id = anchorArray[i];
        anchorsByHeight[`div.content#${id}-content`] = [
            transitionObject[id],
            parseInt(anchorArray[i+1])
        ];
    };
}

function scrollFuncs() {

    // Get scroll height
    let scrollHeight = $(window).scrollTop() + (vh/2);

    // Change text
    let bottomAnchor, topAnchor = null;
    let inSection = false;

    for (const [tag, anchorHeights] of Object.entries(anchorsByHeight)) {

        // See if this is the current anchor
        [bottomAnchor, topAnchor] = anchorHeights;
        inSection = scrollHeight > topAnchor && scrollHeight <= bottomAnchor;

        if (inSection) {

            // Display content
            $(tag).fadeIn();

            currentAnchor = tag;
            for (const other of Object.keys(anchorsByHeight)) {
                if (other != tag) $(other).hide();
            }

            // Format image
            let textBox = $(tag).children(".text-box");
            if (textBox.length) {
                let remaining = $(tag).height() - textBox.height() - textBox.position().top - $("#nav").height();
                $("img").height(`${parseInt(remaining)}px`);
            }
            else $("img").height("auto");
        }
        else {

            // Hide content
            $(tag).fadeOut();
            if (tag == currentAnchor) currentAnchor = null;
        }

    };

    // Animate diagram
    var percent = Math.min(
        (document.body.scrollTop + document.documentElement.scrollTop) / 
        ($(".container#initial-container").height()), 
        1
    );
    var halfPercent = percent <= 0.5 ? percent + 0.5 : 1;

    if (percent == 0) {
        $("#triangulation").css("display", "none");
        $(".drawPath").css("display", "none");
        $("#tesselation").css("display", "block");
    }
    else if (percent < 1) {
        $("#triangulation").css("display", "none");
        $(".drawPath").css("display", "block");
        $("#tesselation").css("display", "none");
    }
    else {
        $("#triangulation").css("display", "block");
        $(".drawPath").css("display", "none");
        $("#tesselation").css("display", "none");
    }
    
    $(".delaunay").each(function(i) {
        let length = pathLengths["delaunay"][i];
        this.style.strokeDashoffset = length - (length * percent);
    });

    $(".voronoi").each(function(i) {
        let length = pathLengths["voronoi"][i];
        this.style.strokeDashoffset = (length * halfPercent);
    });


}

var currentAnchor = null;

// Call functions
var center = new Center();
var delaunay = loadDelaunay(center, 300, 4);
var voronoi = loadVoronoi(delaunay);
var pathLengths = insertScrollPaths(center, delaunay, voronoi);

window.onresize = function() {
    vw = $(window).width();
    vh = $(window).height();
    bb = [0, 0, vw, vh];
    center = new Center();
    delaunay = loadDelaunay(center, 300, 4);
    voronoi = loadVoronoi(delaunay);
    pathLengths = insertScrollPaths(center, delaunay, voronoi);
};

window.addEventListener("scroll", scrollFuncs);
scrollFuncs();