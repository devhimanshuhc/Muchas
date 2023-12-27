import AppBar from "@/components/shared/AppBar";
import { User } from "lucide-react";
import { Link, Outlet } from "react-router-dom";

const userType = "fleet member";

export default function RootLayout() {
  return (
    <div className="w-full relative">
      <section className="flex flex-1 h-full">
        <Outlet />
      </section>
      {userType === "fleet member" && (
        <>
          <AppBar />
          <Link to="/searchplace">
            <div className="absolute top-2 right-2  min-h-[50px] min-w-[50px] bg-transparent backdrop-blur-lg z-20 rounded-lg border-[2px] border-[#1e282d] ">
              <User color="#2f3e46" size={50} />
            </div>
          </Link>
        </>
      )}
    </div>
  );
}
/* 
 WORKFLOW: 
 1. get the userType and do conditional rendering.
 2. build them components for conditional rendering.

*/
