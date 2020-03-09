// Useful variables
var stickyHeader = document.getElementById("sticky-header");
var education    = document.getElementById("Education");
var experience   = document.getElementById("Experience");
var skills       = document.getElementById("Skills");
var portfolio    = document.getElementById("Portfolio");
var divs         = [education, experience, skills, portfolio]
var buttons      = divs.map(el => document.getElementById("button-" + el.id.toLowerCase()));

// Ensure correct heights of divs
window.onload    = divs.forEach(el => {el.style.height = el.offsetHeight + 100 + "px";});
window.onresize  = divs.forEach(el => {el.style.height = el.offsetHeight + 100 + "px";});

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

// BSL for the modal popup
const bodyScrollLock    = require('body-scroll-lock');
const disableBodyScroll = bodyScrollLock.disableBodyScroll;
const enableBodyScroll  = bodyScrollLock.enableBodyScroll;

// Open the aquaculture maps
var popup    = document.getElementById("map-popup");
var barrier  = document.getElementById("barrier");
var flipCard = document.getElementById("aquaculture");
var mapImg   = document.getElementById("suitability");
flipCard.onclick = function() {
  popup.style.display = "block";
  let w = document.body.width;
  mapImg.style.maxHeight = window.innerHeight + "px";
  disableBodyScroll(popup);
  barrier.style.width = w - document.body.width;
  barrier.style.display = "block";
}

// Close the aquaculture maps
var box = document.getElementById("map-popup");
box.onclick = function() {
  popup.style.display = "none";
  barrier.style.display = "none";
  enableBodyScroll(popup);
  window.scrollTo(portfolio);
}