import { CheckCheck, ChevronLeftCircle, ListTodo } from "lucide-react";
import { Link } from "react-router-dom";

export default function AppBar() {
  return (
    <div className="absolute bottom-1 z-20 left-1/2 -translate-x-1/2 min-h-[80px] w-[97%] sm:w-[40%] md:w-[30%] backdrop-blur-md border-2 rounded-2xl">
      <div className="flex align-middle justify-around p-1">
        <Link to={"/assignedtasks"}>
          <ListTodo size={70} color="#EEB902" />
        </Link>
        <Link to={"/delivered"}>
          <CheckCheck size={70} color="#97CC04" />
        </Link>
        <Link to={"/homemap"}>
          <ChevronLeftCircle size={70} color="#2D7DD2" />
        </Link>
      </div>
    </div>
  );
}
