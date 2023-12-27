import { useUserContext } from "@/contexts/AuthContext";
import { useGetRoute } from "@/lib/query/queries";
import Map, { Layer, Marker, Source } from "react-map-gl";
import { TransportModes, getRouteReturnTyp } from "@/lib/types";
import { useReducer } from "react";


const points = [
  {
    lat: 21.110805152672782,
    lng: 79.11432818040981,
  },
  {
    lat: 21.11522896606384,
    lng: 79.1152079449276,
  },
  {
    lat: 21.112646756171547,
    lng: 79.12025049765145,
  },
  {
    lat: 21.1121663400709,
    lng: 79.12537888105997,
  },
];


function geoJsonReducer(state, action){
  switch (action.type) {
    case "displayRoute":
      
      break;
  
    default:
      break;
  }
}

const init_State: getRouteReturnTyp = {
  summary: {
    duration: 0,
    length: 0,
    baseDuration: 0
  },
  geojson: {},
}


export default function HomeMap() {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  
  const { user } = useUserContext();

  // @ts-expect-error ass
  const [state, dispatch] = useReducer(geoJsonReducer, init_State)

  const { mutateAsync: getRoute, isPending: isGettingRoute } = useGetRoute();

  //  SECTION:
  // gon blick this when im getting the data from the backend.

  const lng = parseFloat(user.location[0]),
    lat = parseFloat(user.location[1]);

  function handleClick() {
    dispatch({
      type: "displayRoute",
      source: "ashirwad nagar, nagpur"
    })
  }

  return (
    <div className="w-full h-screen relative">
      {lng ? (
        <Map
          mapboxAccessToken={accessToken}
          bearing={2}
          initialViewState={{
            latitude: lat,
            longitude: lng,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
          projection={{
            name: "globe",
            center: [Number(lng), Number(lat)],
          }}
        >
          {points.map((geocode) => {
            return (
              <Marker
                latitude={geocode.lat}
                longitude={geocode.lng}
                anchor="bottom"
                key={geocode.lat}
              >
                <img
                  src="public/assets/icons/bike.png"
                  width={30}
                  height={30}
                />
              </Marker>
            );
          })}

          {state.geojson  && (
            <Source id="route-source" type="geojson" data={state.geojson}>
              <Layer
                id="route-layer"
                type="line"
                source="route-source"
                paint={{
                  "line-color": "#3399FF",
                  "line-width": 4,
                  "line-opacity": 0.8,
                }}
                layout={{
                  "line-join": "round",
                  "line-cap": "round",
                }}
              />
            </Source>
          )}
        </Map>
      ) : (
        <div className="text-4xl font-extrabold absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse">
          Loading...
        </div>
      )}

      <button
        onClick={() =>
          getRoute({
            origin: "ashirwad nagar, nagpur",
            destination: "mahal, nagpur",
            transportMode: TransportModes.scooter,
          })
        }
      >
        Get Route
      </button>
    </div>
  );
}

/* 
 WORKFLOW: 
 1. we're going to ve a init_state that stores the init value of the geojson4Route
 2. then we gon distribute the dispatch f() thats going to be used to dispatch the action obj from the child component[assigned tasks]
 3. then we'll get the action object processed by the reducer f() thats going to call the getRoute f() in turn for us.
 4. finally, we're going to get the routes polyline and we gon put it on the map.
*/
