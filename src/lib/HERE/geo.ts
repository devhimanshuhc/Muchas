import {GeoJSON} from "geojson"

const singleobject = { name: 'Location A', category: 'Store', street: 'Market', lat: 39.984, lng: -75.343 }

const geojson = new GeoJSON()
geojson.parse(singleobject, {Point: ['lat', 'lng']})

/*  
{
    "type": "Feature",
    "geometry": {"type": "Point", "coordinates": [-75.343, 39.984]},
    "properties": {
      "name": "Location A",
      "category": "Store"
    }
} 
*/     