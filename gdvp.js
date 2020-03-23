/* See if the user is on mobile */
var vh = $(window).height();
var vw = $(window).width();
var isMobile = vh > vw;
var stillLoading = true;

/* Set up the map */
var map = L.map('gdvp-map').setView([38, -100], 4);
var gdvp = document.getElementById("gdvp-map");

/* Symbologies */
function colorize(val, scheme) {
  var r = 0;
  var g = 0;
  var b = 0;
  if (!val) { return "rgba(0, 0, 0, 0)"; }
  if (scheme == "black-ryg") {
    if (val > .8) {
      r = ((.8 - val) * 1275) + 255;
      g = 255;
    } else if (val > .6) {
      r = 255;
      g = (val - .6) * 1275;
    } else {
      r = (val - .4) * 1275;
      g = 0;
    }
  }
  else {
    
  }
  return "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
}

/* Fields */
var fieldDict = {
  "rawUtility": {
    name: "Individual Voting Power",
    display: function(val) { return String(val).slice(0, 6); }
  },
  "decUtility": {
    name: "Proportional Voting Power",
    display: function(val) { return String(val).slice(0, 6); }
  },
  "changes": {
    name: "Number of Times Redistricted",
    display: function(val) { return val; }
  }
}
var field = "rawUtility";

/* Header formatting */
var info = document.getElementById("gdvp-info");
var headerButtons = document.getElementsByClassName("gdvp-header");
formatHeader = function() {
  if (isMobile) {
    info.style.width = vw + "px";
    info.style.position = "relative";
    document.getElementById("gdvp-map").style.height = 80 * vh;
    document.getElementById("button-tooltip").innerHTML = "≡";
    for (var i = 0; i < headerButtons.length - 1; i++) {
      headerButtons[i].style.marginLeft = "3vw";
    }
  } else {
    var w = vw * 0.93;
    var m = vw * 0.03;
    for (var i = 0; i < headerButtons.length; i++) {
      let buttonLength = headerButtons[i].offsetWidth;
      w -= buttonLength;
      if (i < 2) { m += buttonLength; }
    }
    info.style.width = w + "px";
    info.style.marginLeft = m + "px";
  }
}
window.onload   = formatHeader;
window.onresize = formatHeader;
info.update = function(properties) {
  info.innerHTML = "<h3>" + fieldDict[field].name + (properties ? ": " + fieldDict[field].display(properties[field]) : "") + "</h3>";
  if (document.getElementsByClassName("header")[0].offsetHeight > $(window).height() / 10) {
    formatHeader();}
}

/* Interactions */
function styleLayers(feat) {
  return {
    fillColor: colorize(feat.properties[field], "black-ryg"),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.75
  };
}

function showData(e) {
  var layer = e.target;
  layer.setStyle({
    weight: 2.5,
    fillOpacity: 1
  });
  info.update(layer.feature.properties);
  if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
    layer.bringToFront();
  }
}

function hideData(e) {
  e.target.setStyle({
    weight: 1,
    fillOpacity: 0.75
  });
  info.update();
}

var featureClicked = false;
function onEachFeature(feat, layer) {
  layer.on({
    mouseover: showData,
    mouseout: hideData,
    click: function(e) {
      if (mobile) {
        (featureClicked) ? showData : hideData;
        featureClicked = !featureClicked;
      } else {
        map.fitBounds(e.target.getBounds());
      }
    }
  })
}

/* Add the basemap */
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

/* Display the initial data */
var lyrs = {'Alabama':'', 'Alaska':'', 'Arizona':'', 'Arkansas':'', 'California':'', 'Colorado':'', 'Connecticut':'', 'Delaware':'',
 'District of Columbia':'', 'Florida':'', 'Georgia':'', 'Hawaii':'', 'Idaho':'', 'Illinois':'', 'Indiana':'', 'Iowa':'', 'Kansas':'',
  'Kentucky':'', 'Louisiana':'', 'Maine':'', 'Maryland':'', 'Massachusetts':'', 'Michigan':'', 'Minnesota':'', 'Mississippi':'', 
  'Missouri':'', 'Montana':'', 'Nebraska':'', 'Nevada':'', 'New Hampshire':'', 'New Jersey':'', 'New Mexico':'', 'New York':'', 
  'North Carolina':'', 'North Dakota':'', 'Ohio':'', 'Oklahoma':'', 'Oregon':'', 'Pennsylvania':'', 'Rhode Island':'', 
  'South Carolina':'', 'South Dakota':'', 'Tennessee':'', 'Texas':'', 'Utah':'', 'Vermont':'', 'Virginia':'', 'Washington':'', 
  'West Virginia':'', 'Wisconsin':'', 'Wyoming':''}
for (let st in lyrs) {
  $.getJSON("https://raw.githubusercontent.com/joelsalzman/joelsalzman.github.io/master/final_by_state/" + st + ".js", function(data) {
    lyrs[st] = new L.geoJSON(data, {
      style: styleLayers,
      onEachFeature: onEachFeature
    });
    if (stillLoading) { lyrs[st].addTo(map); }
  })
};

/* Legend */
var legend = L.control({position: "bottomleft"});

setLegend = function(scheme) {
  var bar = document.getElementById("legend-bar");
  var key = document.getElementById("legend-container");

  // Set the scheme and key
  if (scheme == "black-ryg") {
    bar.style.backgroundColor = 
    "linear-gradient(to bottom, rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0));"
    key.innerHTML = "1<br>0";
  }
  else {}
  
}
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "legend-container");
  div.innerHTML = '<div id="legend-bar"></div> <div id="legend-key"></div>';
  return div;
}
legend.addTo(map);
setLegend(document.getElementById("black-ryg"));

/* -------------------------------------- The tooltip -------------------------------------- */

/* Toggle the tooltip */
var tooltipButton = document.getElementById("button-tooltip");
var btnText = document.getElementById("button-tooltip-text");
var tooltip = document.getElementById("tooltip");
tooltipButton.onclick = function() {
  if (tooltip.style.width != "30%") {
    gdvp.style.width = "70vw";
    tooltip.style.display = "block";
    tooltip.style.width = "30%";
  } else {
    gdvp.style.width = "100vw";
    tooltip.style.width = "0%";
    tooltip.style.display = "none";
  }
};
tooltipButton.onmouseenter = function() { tooltipButton.style.backgroundColor = "#DBDBDB"; }
tooltipButton.onmouseleave = function() { tooltipButton.style.backgroundColor = "#FFFFFF"; }

/* Variables */
var displayState = document.getElementById("display-state");
//var displayField = document.getElementById("display-field");
//var displayElect = document.getElementById("display-election");

/* State */
checkContShow  = false;
checkContainer = document.getElementById("state-checks");
toggleCheckContainer = function() {
  if (checkContShow) { checkContainer.style.display = "none"; }
  else { checkContainer.style.display = "block"; }
  checkContShow = !checkContShow;
}

toggleState = function(st, mustHide=false, mustShow=false) {
  var check = (st == "District of Columbia") ? document.getElementById("check-DC") : document.getElementById("check-" + st);
  var show  = (mustShow || (!check.checked && !mustHide)) ? true : false;
  if ((mustHide && check.checked) || (mustShow && !check.checked)) { check.checked = !check.checked; }
  let layer = lyrs[st];
  if (show && !map.hasLayer(layer)) { map.addLayer(layer); }
  else if (    map.hasLayer(layer)) { map.removeLayer(layer); }
}
allButton = true;
toggleAllStates = function() {
  if (stillLoading) { stillLoading = false; }
  for (let st in lyrs) { (allButton) ? toggleState(st, true) : toggleState(st, false, true);}
  document.getElementById("toggleAll-text").innerHTML = (allButton) ? "Show All" : "Hide All";
  allButton = !allButton;
}