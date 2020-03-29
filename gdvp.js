// Useful variables
var vh = $(window).height();
var vw = $(window).width();
var isMobile = vh > vw;
var field = "rawUtility";
var tooltipButton = document.getElementById("button-tooltip");

// Set up the map
var map  = L.map('gdvp-map').setView((isMobile) ? [20, -99] : [38, -93], (isMobile) ? 5 : 4);
var gdvp = document.getElementById("gdvp-map");

// Fields
var fieldDict = {
  "rawUtility": {
    name:    "Overall Relative Voting Power",
    title:   "Overall Relative<br>Voting Power",
    scheme:  "black-ryg",
    range:   [0, 1],
    labels:  ["0.4 (Blowouts)", "1 (Ties)"],
    display: function(val) { return String(val).slice(0, 6); }
  },
  "decUtility": {
    name:    "Overall Election Competitiveness",
    title:   "Overall Election<br>Competitiveness",
    scheme:  "black-ryg",
    range:   [0, 1],
    labels:  ["0.0 (Safe)", "0.9293 (Swing)"],
    display: function(val) { return String(val).slice(0, 6); }
  },
  "h_rawMargin_avg": {
    name:    "House Average Raw Margin",
    title:   "House Average<br>Raw Margin",
    scheme:  "purpscale",
    range:   [17193, 192181],
    labels:  ["17,193 Votes", "192,181 Votes"],
    display: function(val) { return parseInt(val); }
  },
  "s_rawMargin_avg": {
    name:    "Senate Average Raw Margin",
    title:   "Senate Average<br>Raw Margin",
    scheme:  "purpscale",
    range:   [38699, 2064244],
    labels:  ["38,699 Votes", "2,064,224 Votes"],
    display: function(val) { return parseInt(val); }
  },
  "p_rawMargin_avg": {
    name:    "Presidential Average Raw Margin",
    title:   "Presidential<br>Average Raw Margin",
    scheme:  "purpscale",
    range:   [25431, 2615286],
    labels:  ["25,431 Votes", "2,615,286 Votes"],
    display: function(val) { return parseInt(val); }
  },
  "h_decMargin_avg": {
    name:    "House Proportional Average Margin",
    title:   "House Proportional<br>Average Margin",
    scheme:  "purpscale",
    range:   [0, 1],
    labels:  ["0% (Ties)", "100% (Blowouts)"],
    display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
  },
  "s_decMargin_avg": {
    name:    "Senate Proportional Average Margin",
    title:   "Senate Proportional<br>Average Margin",
    scheme:  "purpscale",
    range:   [0, 1],
    labels:  ["0% (Ties)", "100% (Blowouts)"],
    display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
  },
  "p_decMargin_avg": {
    nname:   "Presidential Proportional Average Margin",
    title:   "Presidential Proportional<br>Average Margin",
    scheme:  "purpscale",
    range:   [0, 1],
    labels:  ["0% (Ties)", "100% (Blowouts)"],
    display: function(val) { return String(val * 100).slice(0, 7) + "%"; }
  },
  "changes": {
    name:    "Number of Times Redistricted",
    title:   "Number of Times<br>Redistricted",
    scheme:  "purpscale",
    range:   [0, 5],
    labels:  ["0", "5"],
    display: function(val) { return val; }
  },
  "changeDesc": {
    display: function(val) { return val; }
  }
};

// Header formatting
var info = document.getElementById("gdvp-info");
var infoText = document.getElementById("gdvp-info-text");
var headerButtons = document.getElementsByClassName("gdvp-header");
formatHeader = function() {
  if (isMobile) {
    info.style.width    = 0.98 * vw + "px";
    info.style.position = "relative";
    gdvp.style.height   = .8 * vh + "px";
    document.getElementById("button-back").innerHTML = "«";
    tooltipButton.innerHTML = "≡";
    for (var i = 0; i < headerButtons.length - 1; i++) {
      headerButtons[i].style.marginLeft = "3vw";
    }
  } else {
    vw = $(window).width();
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
  if (infoText.offsetHeight > 0.07 * vh) { infoText.style.marginTop = "1vh"; }
}
window.onload = formatHeader;
window.addEventListener('resize', formatHeader);
info.update = function(properties) {
  if (properties) {
    var f = (field == "changes") ? "changeDesc" : field;
    info.innerHTML = '<h3 id="gdvp-info-text">' + fieldDict[f].display(properties[f]) + '</h3>';
  } else {
    info.innerHTML = '<h4 id="gdvp-info-text">' + fieldDict[field].name + '</h4>';
  }
}

// Symbologies
function colorize(val) {
  var scheme = fieldDict[field].scheme;
  var range  = fieldDict[field].range;
  var r = 0;
  var g = 0;
  var b = 0;
  if (val || val == 0) {
    var normal = (val - range[0]) / range[1];
    if (scheme == "black-ryg") {
      if (normal > .8) {
        r = ((.8 - normal) * 1275) + 255;
        g = 255;
      } else if (normal > .6) {
        r = 255;
        g = (normal - .6) * 1275;
      } else {
        r = (normal - .4) * 1275;
        g = 0;
      }
    } 
    else if (scheme == "purpscale") {
      r = b = 128 + (127 * (1 - normal));
      g = 255 * (1 - normal);
    }
    return "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
  }
  return "rgba(0, 0, 0, 0)";
}

// Interactions
function styleLayers(feat) {
  return {
    fillColor: colorize(feat.properties[field], fieldDict[field].scheme),
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
      if (isMobile) {
        (featureClicked) ? showData : hideData;
        featureClicked = !featureClicked;
      } else {
        map.fitBounds(e.target.getBounds());
      }
    }
  });
}

// Add the basemap
var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
	maxZoom: 20,
	attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);

// Display the initial data
var lyrs = {'Alabama':'', 'Alaska':'', 'Arizona':'', 'Arkansas':'', 'California':'', 'Colorado':'', 'Connecticut':'', 'Delaware':'',
 'District of Columbia':'', 'Florida':'', 'Georgia':'', 'Hawaii':'', 'Idaho':'', 'Illinois':'', 'Indiana':'', 'Iowa':'', 'Kansas':'',
  'Kentucky':'', 'Louisiana':'', 'Maine':'', 'Maryland':'', 'Massachusetts':'', 'Michigan':'', 'Minnesota':'', 'Mississippi':'', 
  'Missouri':'', 'Montana':'', 'Nebraska':'', 'Nevada':'', 'New Hampshire':'', 'New Jersey':'', 'New Mexico':'', 'New York':'', 
  'North Carolina':'', 'North Dakota':'', 'Ohio':'', 'Oklahoma':'', 'Oregon':'', 'Pennsylvania':'', 'Rhode Island':'', 
  'South Carolina':'', 'South Dakota':'', 'Tennessee':'', 'Texas':'', 'Utah':'', 'Vermont':'', 'Virginia':'', 'Washington':'', 
  'West Virginia':'', 'Wisconsin':'', 'Wyoming':''};

// Build the layers
buildLayer = function(st) {
  $.getJSON("https://raw.githubusercontent.com/joelsalzman/joelsalzman.github.io/master/final_by_state/" + st + ".js", function(data) {
    lyrs[st] = new L.geoJSON(data, {
      style: styleLayers,
      onEachFeature: onEachFeature
    }).addTo(map);
  });
}
for (let st in lyrs) { buildLayer(st); };

// Legend and scale bar
var legend   = L.control({position: "bottomleft"})
legend.onAdd = function(map) {
  var div = L.DomUtil.create("div", "control-container");
  div.innerHTML = '<div id="legend-title"></div>'  +
                  '<div class="legend-container">' +
                    '<div id="legend-bar"></div>'  +
                  '</div>' +
                  '<div class="legend-container">' +
                    '<div class="legend-key" id="key-top"></div>'    +
                    '<div class="legend-key" id="key-bottom"></div>' +
                  '</div>';
  return div;
}
legend.addTo(map);

setLegend    = function() {
  var labels = fieldDict[field].labels;
  var keys   = [document.getElementById("key-bottom"), document.getElementById("key-top")];

  document.getElementById("legend-title").innerHTML = fieldDict[field].title;
  document.getElementById("legend-bar").style.backgroundImage = (fieldDict[field].scheme == "black-ryg") ?
      "linear-gradient(to top, rgb(0, 0, 0), rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0))" :
      "linear-gradient(to top, rgb(255, 255, 255), rgb(127, 0, 127)";
  for (let i = 0; i < 2; i++) { keys[i].innerHTML = labels[i]; };
}
setLegend();

L.control.scale().addTo(map);

/* -------------------------------------- The tooltip -------------------------------------- */

// Toggle the tooltip
var tools   = [false, false]
var tooltip = document.getElementById("tooltip");

tooltipButton.onclick = function() {
  if (isMobile && tooltip.style.width != "70vw") {
    gdvp.style.width = "30vw";
    tooltip.style.display = "block";
    tooltip.style.width = "70vw";
  }
  else if (!isMobile && tooltip.style.width != "30%") {
    gdvp.style.width = "70vw";
    tooltip.style.display = "block";
    tooltip.style.width = "30%";
  } else {
    gdvp.style.width = "100vw";
    tooltip.style.width = "0%";
    tooltip.style.display = "none";
  }
};

// State
checkContainer = document.getElementById("state-checks");
showAllStates  = document.getElementById("button-state");

toggleCheckContainer = function() {
  if (tools[0]) { 
    showAllStates.style.display = "none"; 
    checkContainer.style.display = "none";
  }
  else { 
    showAllStates.style.display = "block"; 
    checkContainer.style.display = "block";
  }
  tools[0] = !tools[0];
}

toggleState = function(st, mustHide=false, mustShow=false) {
  let layer = lyrs[st];
  var check = document.getElementById("check-" + st);
  if ((mustHide && check.checked) || (mustShow && !check.checked) || (!mustHide && !mustShow && map.hasLayer(layer) == check.checked)) { 
    check.checked = !check.checked; 
  }
  var show  = (mustShow || (check.checked && !mustHide)) ? true : false;
  if (show && !map.hasLayer(layer)) { map.addLayer(layer); }
  if (!show && map.hasLayer(layer)) { map.removeLayer(layer); }
}
allButton = true;
toggleAllStates = function() {
  for (let st in lyrs) { (allButton) ? toggleState(st, true) : toggleState(st, false, true);}
  showAllStates.innerHTML = (allButton) ? "Show All" : "Hide All";
  allButton = !allButton;
}

// Change Field
var fieldCont = document.getElementById("field-container");
var circles = $(".circle");

toggleFieldContainer = function() {
  (tools[1]) ? fieldCont.style.display="none" : fieldCont.style.display="block";
  tools[1] = !tools[1];
}

changeField = function(newField) {
  if (field == newField) {
    var c = document.getElementById(field);
    c.checked = true;
    return;
  }

  field = newField;
  
  for (let st in lyrs) {
    let layer = lyrs[st];
    if (map.hasLayer(layer)) {
      map.removeLayer(layer);
      buildLayer(st);
    }
  };
  setLegend();
  info.update();

  circles.each(function(i) {
    let c = circles[i];
    if ((c.checked && $(c).attr("id") != field) || ($(c).attr("id") == field && !c.checked)) { c.checked = !c.checked; }
  });
}