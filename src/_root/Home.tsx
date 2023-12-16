import { useUserContext } from "@/contexts/AuthContext"
import { User } from "lucide-react"

export default function Home() {
    const { user } = useUserContext()

    return (
        <div className="m-2 rounded-xl px-2 py-1 w-full max-h-[20vh] bg-slate-500 text-black text-xl flex-center">
            <div className="mr-4">
                {user.avatar ? <img src={user.avatar} alt="user's avatar" className="rounded-md"/> : <User color="#1b263b" width={48} height={48}/>}
            </div>
            <div className="p-2">
                <p>{user.username || "username here"}</p>
                <p className="text-muted">{user.email || "user's email here"}</p>
            </div>

        </div>
    )
}