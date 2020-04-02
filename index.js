// Useful variables
var stickyHeader = document.getElementById("sticky-header");
var education    = document.getElementById("Education");
var experience   = document.getElementById("Experience");
var skills       = document.getElementById("Skills");
var portfolio    = document.getElementById("Portfolio");
var divs    = [education, experience, skills, portfolio]
var toScale = [education, experience, skills, document.getElementById("wg-gradient"), document.getElementById("ga-gradient")]
var buttons = divs.map(el => document.getElementById("button-" + el.id.toLowerCase()));
var vh = $(window).height();
var vw = $(window).width();
var isMobile = vh > vw;

// Resize text
resizeText = function() {
  if (isMobile) {
    buttons.forEach(el => { 
      el.style.fontSize = "5vw"; 
      el.style.paddingLeft = "2vw";
    });
    document.querySelectorAll('.button-social').forEach(el => { 
      el.style.cssFloat = "left"; 
      el.style.marginRight = "3vw";
    });
    document.getElementById("homepage-image").style.height = "80vh";
    document.getElementById("main-gradient").style.height = "80vh"
    document.getElementById("joel").style.fontSize = "20vw";
    document.getElementById("main-right").style.width = "97vw";
    document.getElementById("button-top").style.display = "none";
    document.getElementById("main-left").style.height = (0.07 * vw) + (0.05 * vh) + "px";
    document.getElementById("wg-gradient").style.backgroundImage = "linear-gradient(#ffffff 10%, #e1f1c4)";
  }
  let cardHeight = document.getElementById("site-card").offsetHeight;
  let cardText   = document.getElementsByClassName("card-text");
  for (let i=0; i < cardText.length; i++) {
    cardText[i].style.fontSize = cardHeight * 0.05 + "px";
  }
  document.getElementById("card-text-header").style.fontSize = cardHeight * 0.08 + "px";
}

// Store offsets from top
var headerOffset = stickyHeader.offsetTop;
var divOffsets;

// Ensure correct heights of divs
resizeDivs = function() {
  vh = $(window).height();
  let additional = (isMobile) ? 0 : vh;
  toScale.forEach(el => { el.style.height = el.offsetHeight + additional + "px"; });
  portfolio.style.height = (0.9 * vh) + "px";
  divOffsets = divs.map(el => el.offsetTop - 0.25 * vh);
}

// Change layout if on mobile
checkMobile = function() {
  if (vh > vw) {
    isMobile = true;
    toScale.forEach(el => { 
      el.style.width = "95vw";
      el.style.paddingRight = "5vw";
    });
  } else {
    isMobile = false;
    toScale.forEach(el => { 
      el.style.width = "45vw"; 
      el.style.paddingRight = "2.5vw";
    });
  }
  resizeText();
  resizeDivs();
}
checkMobile();
window.addEventListener('resize', checkMobile);

// Contact
contact = function() {
  window.alert("joelkevlessalzman@gmail.com (Email)\n\nI respond to social media DMs as well");
}

// Set the buttons while scrolling
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

  // Vector gimmick
  if (!isMobile) {
    
  }

};

// Toggle site card text
var siteCard  = document.getElementById("site-card");
var cardText  = document.getElementById("card-text-container");
var clicked   = false;
siteCardChange = function(type) {
  if (type == "click") {clicked = !clicked;}
  if (type != "enter" && !clicked) {
    $(cardText).fadeOut(500);
    $(siteCard).css("background-color", "rgba(0, 0, 0, 0)");
  } else {
    window.timeout = setTimeout(function() {
      $(cardText).fadeIn(500);
      $(siteCard).css("background-color", "#e1f1c4");
    }, 500);
    siteCard.onmouseout = function() {
      clearTimeout(window.timeout); 
    };
  }
}
siteCard.onmouseenter = function() {siteCardChange("enter");}
siteCard.onmouseleave = function() {siteCardChange("leave");}
siteCard.onclick      = function() {siteCardChange("click");}