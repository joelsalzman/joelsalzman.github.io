import { Delaunay } from "https://cdn.skypack.dev/d3-delaunay@6";

var vw = $(window).width();
var vh = $(window).height();
var bb = [0, 0, parseInt(vw/6), vh];

const final = "kelp";

class Center {

    constructor() {
        this.points = [
            [parseInt(vw / 6), 0],
            [0, 0],
            [0, vh],
            [parseInt(vw / 6), vh],
            [parseInt(vw / 6), 0]
        ];
        let center_path = this.points.map(
            coords => [coords[0] - (vw * .165), coords[1] - (vh * .125)]
        ).join(' ');
        let center_tag = `<polygon class="core" points="${center_path}" />`
        $('svg.core').html(center_tag);

    }

    containsPoint = function(pt) {
        let x = parseInt(pt[0]);
        return x > (vw/6);
    };
}

function loadDelaunay(step, multiplier) {

    // place points on edge of center
    var coords = new Array();

    // place points on edges of page
    for (let w = 0; w <= vw/6; w += step) {
        coords.push([w, 0], [w, vh]);
    };
    for (let h = step; h <= vh; h += step) {
        coords.push([0, h], [vw/6, h]);
    };
    coords.push([vw/6, 0], [vw/6, vh]);

    // fill rest of page with random points
    let x, y = null;
    let numPoints = Math.min(parseInt((vh * vw) / (step * 50)), 500);
    for (let i = 0; i < numPoints; i += 1) {
        x = parseInt(Math.random() * vw/6);
        y = parseInt(Math.random() * vh);
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

function insertScrollPaths(delaunay, voronoi) {

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

async function scrollFuncs() {

    // Get scroll height
    let scrollHeight = $(window).scrollTop() + (vh/2);

    // Trigger animation
    var percent = Math.min(
        (document.body.scrollTop + document.documentElement.scrollTop) / 
        ($("#prof-pic").outerHeight(true) + $("#prof-pic").height() + $("#prof-pic").offset().top),
        1
    );
    var halfPercent = percent <= 0.5 ? percent + 0.5 : 1;

    if (percent == 0) {
        $("#triangulation").css("display", "none");
        $(".drawPath").css("display", "none");
        $("#tesselation").css("display", "block");
        $("#Home").css("background-image", "url(./pics/Caret_top.png)");
    }
    else if (percent < 1) {
        $("#triangulation").css("display", "none");
        $(".drawPath").css("display", "block");
        $("#tesselation").css("display", "none");
        $("#Home").css("background-image", "url(./pics/Caret.png)");
    }
    else {
        $("#triangulation").css("display", "block");
        $(".drawPath").css("display", "none");
        $("#tesselation").css("display", "none");
    }
    
    // Animate diagram
    $(".delaunay").each(function(i) {
        let length = pathLengths["delaunay"][i];
        this.style.strokeDashoffset = length - (length * percent);
    });

    $(".voronoi").each(function(i) {
        let length = pathLengths["voronoi"][i];
        this.style.strokeDashoffset = (length * halfPercent);
    });

}

function sizeDivs() {
    $(".content").width($(".core").width() - $("#button-div").width() - 80);
}

var currentAnchor = null;

// Call functions
var delaunay = loadDelaunay(300, 4);
var voronoi = loadVoronoi(delaunay);
var pathLengths = insertScrollPaths(delaunay, voronoi);

sizeDivs();

window.onresize = function() {

    vw = $(window).width();
    vh = $(window).height();
    bb = [0, 0, vw, vh];

    delaunay = loadDelaunay(300, 4);
    voronoi = loadVoronoi(delaunay);
    pathLengths = insertScrollPaths(delaunay, voronoi);

    sizeDivs();

};

window.addEventListener("scroll", scrollFuncs);
scrollFuncs();