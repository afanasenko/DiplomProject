
var parse_georaster = require("georaster");
var GeoRasterLayer = require("georaster-layer-for-leaflet");

//Определяем карту, координаты центра и начальный масштаб
var map = L.map('map').setView([59.9386, 30.3141], 12);

//Добавляем на нашу карту слой OpenStreetMap
L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
   attribution: '&copy; <a rel="nofollow" href="http://osm.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map)


var url_to_geotiff_file = "1.tif";

fetch(url_to_geotiff_file)
  .then(response => response.arrayBuffer())
  .then(arrayBuffer => {
    parse_georaster(arrayBuffer).then(georaster => {
      console.log("georaster:", georaster);

      /*
          GeoRasterLayer is an extension of GridLayer,
          which means can use GridLayer options like opacity.
          Just make sure to include the georaster option!
          http://leafletjs.com/reference-1.2.0.html#gridlayer
      */
      var layer = new GeoRasterLayer({
          georaster: georaster,
          opacity: 0.7,
          pixelValuesToColorFn: values => values[0] > 100 ? '#ff0000' : '#0000ff',
          resolution: 64 // optional parameter for adjusting display resolution
      });
      layer.addTo(map);

      map.fitBounds(layer.getBounds());

  });
});