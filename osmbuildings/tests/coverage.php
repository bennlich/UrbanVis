<!DOCTYPE html>
<html>
<head>
    <title>OSM Buildings - Coverage</title>
    <meta http-equiv="content-type" content="text/html; charset=utf-8">
	<style>
	body {
		margin: 0;
		padding: 0;
		font-family: Arial, Helvetica, sans-serif;
	}
	#map {
		width: 700px;
		height: 400px;
		margin: 0 auto !important;
		border: 1px solid #ccc;
	}
	</style>
    <link rel="stylesheet" href="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.css">
    <script src="http://cdn.leafletjs.com/leaflet-0.5.1/leaflet.js"></script>
    <script src="../dist/L.BuildingsLayer.js"></script>
    <script src="coverage.js"></script>
</head>

<body>
    <div id="map"></div>

    <script>
    var map = new L.Map('map').setView([52.50440, 13.33522], 3);

    new L.TileLayer(
        'http://{s}.tiles.mapbox.com/v3/osmbuildings.map-c8zdox7m/{z}/{x}/{y}.png',
        { attribution: 'Map tiles &copy; <a href="http://mapbox.com">MapBox</a>', maxZoom: 17 }
    ).addTo(map);

    new L.GeoJSON(coverage, {
        style: function (feature) {
            return { color: '#ff9900', stroke: false, fillOpacity: 0.5 };
        }
    }).addTo(map);
    </script>
</body>
</html>
