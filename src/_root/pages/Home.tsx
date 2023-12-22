import { ModeToggle } from "@/components/mode-toggle";
import { useUserContext } from "@/contexts/AuthContext";
import { User } from "lucide-react";

export default function Home() {
  const { user } = useUserContext();

  return (
    <>
      <ModeToggle />
      <div className="m-2 rounded-xl w-full max-h-[20vh] bg-slate-500 text-black text-xl flex-center">
        <div>
          {user.avatar ? (
            <img
              src={user.avatar}
              alt="user's avatar"
              className="rounded-md flex-grow-[2]"
            />
          ) : (
            <User color="#1b263b" width={48} height={48} />
          )}
        </div>
        <div className="max-w-[70%] overflow-hidden text-ellipsis">
          <p>{user.username || "username here"}</p>
          <a href={`mailto:${user.email}`} className="text-muted">
            {user.email || "user's email here"}
          </a>
        </div>
      </div>
    </>
  );
}
