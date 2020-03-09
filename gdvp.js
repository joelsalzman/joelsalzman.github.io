import Map from 'ol/Map';
import GeoJSON from 'ol/format/GeoJSON';
import VectorLayer from 'ol/layer/Vector';
import View from 'ol/View';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';

const path = require('path');
const fs = require('fs');

/* Get data */
var gdvpData = new Array();
fs.readdir(path.join(__dirname, 'final_by_state')).map(file => {
  gdvpData.push(new ol.source.Vector({
    url: file,
    format: new GeoJSON()
  }));
  console.log(file);
});
console.log(gdvpData);

/* Create the map */
new Map({
  layers: [
    new TileLayer({source: new OSM()}),
    new VectorLayer({source: gdvpData})
  ],
  view: new View({
    center: [0, 0],
    zoom: 5
  }),/*.fit(gdvpData),*/
  target: 'gdvp-map'
});