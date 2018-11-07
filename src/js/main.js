//load our custom elements
require("component-leaflet-map");
require("component-responsive-frame");

//get access to Leaflet and the map
var element = document.querySelector("leaflet-map");
var L = element.leaflet;
var map = element.map;


var data = require("./council.geo.json");
var element = document.querySelector("leaflet-map");

var mapElement = document.querySelector("leaflet-map");

if (mapElement) {
  var L = mapElement.leaflet;
  var map = mapElement.map;

  map.scrollWheelZoom.disable();

  var focused = false;

  var mode = "dist_name";

  var onEachFeature = function(feature, layer) {

  var label = L.marker(layer.getBounds().getCenter(), {
      icon: L.divIcon({
        className: 'member_name',
        html: feature.properties.member,
        iconSize: [75, 95],
        iconAnchor: [40, 35]
      })
    }).addTo(map);

    layer.on({

   	mouseover: function(e) {
        layer.setStyle({ weight: 4, fillOpacity: .5 });
        layer.openTooltip();
      },
      mouseout: function(e) {
        if (focused && focused == layer) { return }
        layer.setStyle({ weight: 2.1, fillOpacity: 0.1 });
      	layer.openTooltip();
      }
    });
  };



  var getColor = function(d) {
    var value = d[mode];

    if (typeof value == "string") {
      value = Number(value.replace(/,/, ""));
    }
    // console.log(value)
    if (typeof value != "undefined") {
     return value >= 0.01 ? '#00564e' :
     value >= 0 ? '#00564e' :
             '#f1f2f2' ;

    } else {
      return "#00564e"
    }
  };

  var style = function(feature) {
    var s = {
      fillColor: getColor(feature.properties),
      weight: 2.1,
      opacity: 1,
      color: '#00564e',
      fillOpacity: 0.1
    };
    return s;
  }

	  var geojson = L.geoJson(data, {
	    style: style,
	    onEachFeature: onEachFeature
	  }).addTo(map);

  }

var onEachFeature = function(feature, layer) {
  layer.bindPopup(feature.properties)
};

 map.scrollWheelZoom.disable();

 map.setView([47.6300, -122.3381], 11);