var vh = $(window).height();
var vw = $(window).width();
var isMobile = vh > vw;

popup = function(key) {
    var contain = document.getElementById(key + "-container");
    var main    = document.getElementById(key + "-popup");

    // Size the container
    if (contain.style.display != "inline-block") {
        contain.style.display = "inline-block";
        (isMobile) ? main.style.marginTop  = "20vh" :
                     main.style.marginLeft = (vw - main.offsetWidth)  / 2 + "px" ;

        // Style individual popups
        if (key == "contact" && isMobile) {
            main.style.margin = "15vh 0 0";
            main.style.width = "96vw";
            var text = document.getElementById("email");
            text.style.fontSize = "2.5vh";
            text.style.height = "5vh";
        } else if (key == "aq") {
            var mapImg = document.getElementById("suitability");
            mapImg.style.maxHeight = window.innerHeight + "px";
            mapImg.style.maxWidth  = window.innerWidth  + "px";
        }

    } else {
        contain.style.display = "none";
    }
}