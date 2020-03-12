import { strict } from "assert";

/* Set up the map */
var map = L.map('gdvp-map').setView([42, -100], 4);
var gdvp = document.getElementById("gdvp-map");

/* Symbologies */
function colorize(val, scheme) {
  var r = 0;
  var g = 0;
  var b = 0;
  if (val == undefined) return "rgb(0, 0, 0, 0)";
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

function styleLayers(feat) {
  return {
    fillColor: colorize(feat.properties.rawUtility, "black-ryg"),
    weight: 1,
    opacity: 1,
    color: 'black',
    fillOpacity: 0.9
  };
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
    let feat = new L.geoJSON(data, {
      style: styleLayers
    }).addTo(map);
    lyrs[st] = feat;
  })
};

/* Interactions */
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: function (e) {
      e.target.setStyle({
        weight: 2.5,
        fillOpacity: 1
      });
      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    mouseout: function (e) {
      layer.resetStyle(e.target);
    }
  })
}

for (let st in lyrs) {
  let newFeature = L.geoJSON(lyrs[st], {
    style: styleLayers,
    onEachFeature: onEachFeature
  }).addTo(map);
};

/* Toggle the tooltip */
var tooltipButton = document.getElementById("button-tooltip");
var btnText = document.getElementById("button-tooltip-text");
var tooltip = document.getElementById("tooltip");
tooltipButton.onclick = function() {
  if (tooltip.style.width != "30%") {
    gdvp.style.width = "70vw";
    tooltip.style.width = "30%";
    btnText.innerText = "Close Tooltip";
  } else {
    gdvp.style.width = "100vw";
    tooltip.style.width = "0%";
    btnText.innerText = "Open Tooltip";
  }
};

/* The tooltip */
