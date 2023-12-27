import { RouteInputTyp } from "../types";

// because we dont ve got the d.ts file for its type declaration. they didnt add the ts support for the lib.
// @ts-expect-error asddf
import flexpolyline from '@liberty-rider/flexpolyline';

import axios from "axios"
import { HEREconfig } from "./config";

export default async function getRoute(options: RouteInputTyp) {

    try {
        // src geocode
        const srcGeoCode = (await axios.get(`${HEREconfig.geocodeEndpoint}?q=${options.origin}&apiKey=${HEREconfig.hereApiKey}`)).data.items[0].position

        // dest geocode
        const destGeoCode = (await axios.get(`${HEREconfig.geocodeEndpoint}?q=${options.destination}&apiKey=${HEREconfig.hereApiKey}`)).data.items[0].position

        const routeSummary = (await axios.get(`${HEREconfig.routesEndpoint}?transportMode=${options.transportMode}&origin=${srcGeoCode.lat,srcGeoCode.lng}&destination=${destGeoCode.lat,destGeoCode.lng}&return=summary&apiKey=${HEREconfig.hereApiKey}`)).data.routes[0].sections[0].summary

        const routePolyline = (await axios.get(`${HEREconfig.routesEndpoint}?transportMode=${options.transportMode}&origin=${srcGeoCode.lat, srcGeoCode.lng}&destination=${destGeoCode.lat, destGeoCode.lng}&return=polyline&apiKey=${HEREconfig.hereApiKey}`)).data.routes[0].sections[0].polyline

        const coords = flexpolyline.decode(routePolyline)

        const geojson = {
            'type': 'Feature',
            'properties': {},
            'geometry': {
                'type': 'LineString',
                'coordinates': coords,
            }
        }

        const result = {
            "summary": routeSummary,
            "geojson": geojson
        }

        return result
 
    } catch (error) {
        console.error(error)
        return null
    }

    /* 
     WORKFLOW: 
     ✅ convert the addys in the geocode format.
     ✅ make the request to the here endpoint.
     ✅ get the flexible polyline encoding and put it on the lib to decode.
     ✅ build the geojson obj to plot it on the map.
    */
}

