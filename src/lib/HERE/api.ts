import { RouteInputTyp, getRouteReturnTyp } from "../types";
import {GeoJSON} from "geojson"
// because we dont ve got the d.ts file for its type declaration. they didnt add the ts support for the lib.
// @ts-expect-error asddf
import * as flexpolyline from '@liberty-rider/flexpolyline';

import axios from "axios"
import { HEREconfig } from "./config";

export default async function getRoute(options: RouteInputTyp): Promise<getRouteReturnTyp | null> {

    try {
        // geojson parser
        const $ = new GeoJSON()
        const geojsonParser = $.parse

        // src geocode
        const srcGeoCode = (await axios.get(`${HEREconfig.geocodeEndpoint}?q=${options.origin}&apiKey=${HEREconfig.hereApiKey}`)).data.items[0].position

        // dest geocode
        const destGeoCode = (await axios.get(`${HEREconfig.geocodeEndpoint}?q=${options.destination}&apiKey=${HEREconfig.hereApiKey}`)).data.items[0].position

        let result = (await axios.get(`${HEREconfig.routesEndpoint}?transportMode=${options.transportMode}&origin=${srcGeoCode.lat,srcGeoCode.lng}&destination=${destGeoCode.lat,destGeoCode.lng}&return=summary,polyline&apiKey=${HEREconfig.hereApiKey}`)).data.routes[0].sections[0]

        const RouteSummary = result.summary
        const routePolylineEncoding = result.polyline
        const routePolylineCoords = flexpolyline.decode(routePolylineEncoding)
        
        /* 
         TODO: 
         gotta check this shit!
        */
        let geojson = {
            line: [
                routePolylineCoords
            ]
        }

        geojson = geojsonParser(geojson, {
            'LineString': 'line',
        })

        result = {
            "summary": RouteSummary,
            "geojson": geojson,
        }

        return result
 
    } catch (error) {
        console.error(error)
        return null
    }

    /* 
     WORKFLOW: 
     1. build the geojson data using the GeoJSON parser.
     2. get that thing inside the result along with the summary.

    */
}

/* 
 NOTE:  for using the geojson parser.
 For each geometry type, specify which attribute contains the geometric data
*/