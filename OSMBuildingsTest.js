var map, buildingData, buildingLayer, myColorSettings;

var MAX_RATIO = 0.963197123821;
var MIN_RATIO = 0.0469947590059;

function ColorSettings() {
	this.lerpMin = 0;
	this.lerpMax = 255;
}

function mapRange(val, inRange, outRange) {
	var inLen = inRange[1] - inRange[0];
	var outLen = outRange[1] - outRange[0];
	return ((val-inRange[0]) * outLen / inLen) + outRange[0];
}

function updateColorRange() {
	var buildings = buildingData['features'];
	for (var i = 0, il = buildings.length; i < il; i++) {
		var curBuilding = buildings[i];
		var props = curBuilding['properties'];
		var redness = Math.round(mapRange(props['surfaceAreaPerVolume'],[MIN_RATIO, MAX_RATIO],[myColorSettings.lerpMin, myColorSettings.lerpMax]));
		props['wallColor'] = 'rgb('+redness+',0,0)';
	}
	buildingLayer.geoJSON(buildingData);
}

$(document).ready(function() {
	
	// var map = new L.Map('map').setView([42.351999334557483, -71.069696997900422], 17);
	map = new L.Map('map').setView([35.695874931357586, -105.947794754237762], 17);
	
	new L.TileLayer(
	    'http://{s}.tiles.mapbox.com/v3/osmbuildings.map-c8zdox7m/{z}/{x}/{y}.png',
	    { attribution: 'Map tiles © MapBox', maxZoom: 17 }
	).addTo(map);

	$.getJSON("geoJsonOut.json", function(data) {
		console.log("Success");
		buildingData = data;
		buildingLayer = new L.BuildingsLayer().addTo(map).geoJSON(data);
	})
	.fail(function(data, textStatus, error) {
		console.log(textStatus, error);
	});

	// myColorSettings = new ColorSettings();
	// var gui = new dat.GUI();
	// var lerpMinCtrl = gui.add(myColorSettings, "lerpMin", 0, 255).step(1);
	// var lerpMaxCtrl = gui.add(myColorSettings, "lerpMax", 0, 255).step(1);
	// lerpMinCtrl.onFinishChange(updateColorRange);
	// lerpMaxCtrl.onFinishChange(updateColorRange);

});