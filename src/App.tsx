import "./globals.css"
import { Routes, Route } from "react-router-dom"
import AuthLayout from "./_auth/AuthLayout"
import MerchantSignup from "./_auth/forms/MerchantSignup"
import { Toaster } from "./components/ui/toaster"
import Signin from "./_auth/forms/signin"
import Home from "./_root/pages/Home"

export default function App() {
    return (
        <>
            <main className="flex h-screen">
                <Routes>
                    <Route element={<AuthLayout />} >
                        <Route path="/merchantsignup" element={<MerchantSignup />} />
                        <Route path="/signin" element={<Signin />} />
                    </Route>

                    <Route index path="/" element={<Home />} />
                </Routes>
            </main>
            <Toaster />
        </>
    )
}