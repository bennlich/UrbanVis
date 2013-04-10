import json
import math
from numpy import interp

geoJsonIn = file('sfbldg_dup.json', 'r');
jsonDictIn = json.load(geoJsonIn);
jsonDictOut = { 'type':'FeatureCollection', 'features': [] }

minRatio = 1000;
maxRatio = -1;

print 'Calculating surface area to volume ratios...'
for building in jsonDictIn['features']:
	props = building['properties']
	surfaceArea = 2 * props['AREA'] + props['PERIMETER'] * props['height']
	volume = props['AREA'] * props['height']
	if (volume > 0):
		ratio = surfaceArea / volume
		buildingOut = {
			'type': 'Feature',
			'properties': {
				'surfaceArea': surfaceArea,
				'volume': volume,
				'surfaceAreaPerVolume': ratio,
				'height': props['height']
			},
			'geometry': building['geometry']
		}
		if (ratio < minRatio and ratio != 0):
			minRatio = ratio
		if (ratio > maxRatio):
			maxRatio = ratio
		jsonDictOut['features'].append(buildingOut)

print 'Calculating wall colors...'
print 'maxRatio',maxRatio,'minRatio',minRatio
for building in jsonDictOut['features']:
	props = building['properties']
	redness = int(round(interp(props['surfaceAreaPerVolume'],[minRatio,maxRatio],[0,255])))
	props['wallColor'] = 'rgb('+str(redness)+',0,0)'
	# print 'redness',redness,'ratio',props['surfaceAreaVolumeRatio']

print 'Saving...'
geoJsonOut = file('geoJsonOut.json', 'w')
json.dump(jsonDictOut, geoJsonOut, sort_keys=True, indent=4, separators=(',', ': '))
print 'done.'