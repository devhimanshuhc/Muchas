import { useUserContext } from "@/contexts/AuthContext";
import Map from "react-map-gl";
import { User } from "lucide-react";
import { Link } from "react-router-dom";

export default function HomeMap() {
  const accessToken = import.meta.env.VITE_MAPBOX_ACCESS_TOKEN;
  const { user } = useUserContext();

  const lng = parseFloat(user.location[0]),
    lat = parseFloat(user.location[1]);

  return (
    <div className="w-full h-screen relative">
      {lng ? (
        <Map
          mapboxAccessToken={accessToken}
          bearing={2}
          initialViewState={{
            longitude: lng,
            latitude: lat,
            zoom: 12,
          }}
          mapStyle="mapbox://styles/mapbox/navigation-night-v1"
          projection={{
            name: "globe",
            center: [Number(lng), Number(lat)],
          }}
        />
      ) : (
        <div className="text-4xl font-extrabold absolute top-1/2 left-1/2 -translate-x-1/2 animate-pulse">
          Loading...
        </div>
      )}

      <Link to="/searchplace">
      <div className="absolute bottom-2 right-2  min-h-[50px] min-w-[50px] bg-transparent backdrop-blur-lg z-20 rounded-lg border-[2px] border-[#1e282d] ">
        <User color="#2f3e46" size={50} />
      </div>
      </Link>
    </div>
  );
}

/* 
 1. 
*/
