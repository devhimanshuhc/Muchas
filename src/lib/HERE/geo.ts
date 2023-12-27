import {GeoJSON} from "geojson"

const geojson = new GeoJSON()

const data2 = [
  {
    x: 0.5,
    y: 102.0,
    prop0: 'value0'
  },
  {
    line: [[102.0, 0.0], [103.0, 1.0], [104.0, 0.0], [105.0, 1.0]],
    prop0: 'value0',
    prop1: 0.0
  },
  {
    polygon: [
      [ [100.0, 0.0], [101.0, 0.0], [101.0, 1.0], [100.0, 1.0], [100.0, 0.0] ]
    ],
    prop0: 'value0',
    prop1: {"this": "that"}
  }
];

geojson.parse(data2, {'Point': ['x', 'y'], 'LineString': 'line', 'Polygon': 'polygon'});
