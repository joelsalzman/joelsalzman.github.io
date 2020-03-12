// Useful variables
var stickyHeader = document.getElementById("sticky-header");
var education    = document.getElementById("Education");
var experience   = document.getElementById("Experience");
var skills       = document.getElementById("Skills");
var portfolio    = document.getElementById("Portfolio");
var divs         = [education, experience, skills, portfolio]
var buttons      = divs.map(el => document.getElementById("button-" + el.id.toLowerCase()));

// Ensure correct heights of divs
var vh = $(window).height();
var toScale = [education, experience, skills, document.getElementById("small-gradient"), document.getElementById("small-gradient-2")]
divHeight = function() {
  toScale.forEach(el => {
    let h = el.offsetHeight + vh + "px";
    el.style.height = h;
    document.getElementById(el.id + "-window").style.height = h;
  });
  portfolio.style.height = (0.9 * vh) + "px";
}
window.onload    = function() {divHeight();}
window.onresize  = function() {divHeight();}

// Store offsets from top
var headerOffset = stickyHeader.offsetTop;
var divOffsets   = divs.map(el => el.offsetTop - 200);

setButtons = function(id) {
  buttons.forEach(bt => {
    if (bt.id == id) {
      bt.classList.add("button-active");
    } else if (!("button" in bt.classList)) {
      bt.classList.remove("button-active");
    }
  });
};

// What to do when scrolling
window.onscroll = function() {
  
  var off = window.pageYOffset;

  // Sticky header
  if (off > headerOffset) {
    stickyHeader.classList.add("sticky");
  } else {
    stickyHeader.classList.remove("sticky");
  }

  // Buttons
  if (off >= divOffsets[3]) {
    setButtons("button-portfolio");
  } else if (off >= divOffsets[2]) {
    setButtons("button-skills");
  } else if (off >= divOffsets[1]) {
    setButtons("button-experience");
  } else if (off >= divOffsets[0]) {
    setButtons("button-education");
  } else {
    setButtons();
  }

};

// Toggle site card text
var siteCard  = document.getElementById("site-card");
var cardText  = document.getElementById("card-text");
var clicked   = false;
siteCardChange = function(type) {
  if (type == "click") {clicked = !clicked;}
  if (type != "enter" && !clicked) {
    $(cardText).fadeOut(500);
    $(siteCard).css("background-color", "rgb(0, 0, 0, 0)");
  } else {
    window.timeout = setTimeout(function() {
      $(cardText).fadeIn(500);
      $(siteCard).css("background-color", "#88f9a9");
    }, 500);
    siteCard.onmouseout = function() {
      clearTimeout(window.timeout);
    };
  }
}
siteCard.onmouseenter = function() {siteCardChange("enter");}
siteCard.onmouseleave = function() {siteCardChange("leave");}
siteCard.onclick      = function() {siteCardChange("click");}

// Open the aquaculture map
var popup   = document.getElementById("map-popup");
var barrier = document.getElementById("barrier");
var aqCard  = document.getElementById("aquaculture");
var mapImg  = document.getElementById("suitability");
aqCard.onclick = function() {
  popup.style.display = "block";
  let w = document.body.width;
  mapImg.style.maxHeight = window.innerHeight + "px";
  barrier.style.width = w - document.body.width;
  barrier.style.display = "block";
}

// Close the aquaculture map
var box = document.getElementById("map-popup");
box.onclick = function() {
  popup.style.display = "none";
  barrier.style.display = "none";
  window.scrollTo(portfolio);
}