// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"gdvp.js":[function(require,module,exports) {
/* Set up the map */
var map = L.map('gdvp-map').setView([38, -100], 5);
var gdvp = document.getElementById("gdvp-map");
/* Symbologies */

function colorize(val, scheme) {
  var r = 0;
  var g = 0;
  var b = 0;
  if (val == undefined) return "rgb(0, 0, 0, 0)";

  if (scheme == "black-ryg") {
    if (val > .8) {
      r = (.8 - val) * 1275 + 255;
      g = 255;
    } else if (val > .6) {
      r = 255;
      g = (val - .6) * 1275;
    } else {
      r = (val - .4) * 1275;
      g = 0;
    }
  } else {}

  return "rgb(" + String(r) + ", " + String(g) + ", " + String(b) + ")";
}
/* Fields */


var fieldDict = {
  "rawUtility": {
    name: "Individual Voting Power",
    display: function display(val) {
      return String(val).slice(0, 6);
    }
  },
  "decUtility": {
    name: "Proportional Voting Power",
    display: function display(val) {
      return String(val).slice(0, 6);
    }
  },
  "changes": {
    name: "Number of Times Redistricted",
    display: function display(val) {
      return val;
    }
  }
};
var field = "rawUtility";
/* Map information */

var info = document.getElementById("gdvp-info");
var headerButtons = document.getElementsByClassName("gdvp-header");

sizeInfoDiv = function sizeInfoDiv() {
  var w = $(window).width() * 0.935;

  for (var i = 0; i < headerButtons.length; i++) {
    w -= headerButtons[i].offsetWidth;
  }

  info.style.width = w + "px";
};

window.onload = function () {
  sizeInfoDiv();
};

window.onresize = function () {
  sizeInfoDiv();
};

info.update = function (properties) {
  info.innerHTML = "<h3>" + fieldDict[field].name + (properties ? ": " + fieldDict[field].display(properties[field]) : "") + "</h3>";

  if (document.getElementsByClassName("header")[0].offsetHeight > $(window).height() / 10) {
    sizeInfoDiv();
  }
};
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

function onEachFeature(feat, layer) {
  layer.on({
    mouseover: function mouseover(e) {
      var layer = e.target;
      layer.setStyle({
        weight: 2.5,
        fillOpacity: 1
      });
      info.update(layer.feature.properties);

      if (!L.Browser.ie && !L.Browser.opera && !L.Browser.edge) {
        layer.bringToFront();
      }
    },
    mouseout: function mouseout(e) {
      e.target.setStyle({
        weight: 1,
        fillOpacity: 0.75
      });
      info.update();
    },
    click: function click(e) {
      map.fitBounds(e.target.getBounds());
    }
  });
}
/* Add the basemap */


var Stadia_AlidadeSmooth = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
  maxZoom: 20,
  attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
}).addTo(map);
/* Display the initial data */

var lyrs = {
  'Alabama': '',
  'Alaska': '',
  'Arizona': '',
  'Arkansas': '',
  'California': '',
  'Colorado': '',
  'Connecticut': '',
  'Delaware': '',
  'District of Columbia': '',
  'Florida': '',
  'Georgia': '',
  'Hawaii': '',
  'Idaho': '',
  'Illinois': '',
  'Indiana': '',
  'Iowa': '',
  'Kansas': '',
  'Kentucky': '',
  'Louisiana': '',
  'Maine': '',
  'Maryland': '',
  'Massachusetts': '',
  'Michigan': '',
  'Minnesota': '',
  'Mississippi': '',
  'Missouri': '',
  'Montana': '',
  'Nebraska': '',
  'Nevada': '',
  'New Hampshire': '',
  'New Jersey': '',
  'New Mexico': '',
  'New York': '',
  'North Carolina': '',
  'North Dakota': '',
  'Ohio': '',
  'Oklahoma': '',
  'Oregon': '',
  'Pennsylvania': '',
  'Rhode Island': '',
  'South Carolina': '',
  'South Dakota': '',
  'Tennessee': '',
  'Texas': '',
  'Utah': '',
  'Vermont': '',
  'Virginia': '',
  'Washington': '',
  'West Virginia': '',
  'Wisconsin': '',
  'Wyoming': ''
};

var _loop = function _loop(st) {
  $.getJSON("https://raw.githubusercontent.com/joelsalzman/joelsalzman.github.io/master/final_by_state/" + st + ".js", function (data) {
    var feat = new L.geoJSON(data, {
      style: styleLayers,
      onEachFeature: onEachFeature
    }).addTo(map);
    lyrs[st] = feat;
  });
};

for (var st in lyrs) {
  _loop(st);
}

;
/* Legend */

var legend = L.control({
  position: "bottomleft"
});

setLegend = function setLegend(scheme) {
  var bar = document.getElementById("legend-bar");
  var key = document.getElementById("legend-container"); // Set the scheme and key

  if (scheme == "black-ryg") {
    bar.style.backgroundColor = "linear-gradient(to bottom, rgb(0, 0, 0), rgb(0, 0, 0), rgb(0, 0, 0), rgb(255, 0, 0), rgb(255, 255, 0), rgb(0, 255, 0));";
    key.innerHTML = "1<br>0";
  } else {}
};

legend.onAdd = function (map) {
  var div = L.DomUtil.create("div", "legend-container");
  div.innerHTML = '<div id="legend-bar"></div> <div id="legend-key"></div>';
  return div;
};

legend.addTo(map);
setLegend(document.getElementById("black-ryg"));
/* Toggle the tooltip */

var tooltipButton = document.getElementById("button-tooltip");
var btnText = document.getElementById("button-tooltip-text");
var tooltip = document.getElementById("tooltip");

tooltipButton.onclick = function () {
  if (tooltip.style.width != "30%") {
    gdvp.style.width = "70vw";
    tooltip.style.width = "30%";
  } else {
    gdvp.style.width = "100vw";
    tooltip.style.width = "0%";
  }
};

tooltipButton.onmouseenter = function () {
  tooltipButton.style.backgroundColor = "#DBDBDB";
};

tooltipButton.onmouseleave = function () {
  tooltipButton.style.backgroundColor = "#FFFFFF";
};
/* The tooltip */


var displayField = document.getElementById("display-field");
var displayState = document.getElementById("display-state");
var displayElect = document.getElementById("display-election");
},{}],"node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "57697" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["node_modules/parcel-bundler/src/builtins/hmr-runtime.js","gdvp.js"], null)
//# sourceMappingURL=/gdvp.b4be5b50.js.map