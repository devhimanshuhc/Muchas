import { Outlet } from "react-router-dom";

export default function RootLayout() {
    return (
        <div className="w-full">
            <section className='flex flex-1 h-full'>
                <Outlet />
            </section>
        </div>
    )
}