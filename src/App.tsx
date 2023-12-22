import "./globals.css";
import { Routes, Route } from "react-router-dom";
import AuthLayout from "./_auth/AuthLayout";
import MerchantSignup from "./_auth/forms/MerchantSignup";
import { Toaster } from "./components/ui/toaster";
import Signin from "./_auth/forms/signin";
import Home from "./_root/pages/Home";
import CreateOffer from "./_root/pages/createOffer";
import UserSignup from "./_auth/forms/UserSignup";
import { RoleSelect } from "./_auth/forms/RoleSelect";
import PaymentMethodsCard from "./_auth/forms/paymentMethod";
import RoutesPath from "./_root/pages/RotesPath";

export default function App() {
  return (
    <>
      <main className="flex h-screen">
        <Routes>
          <Route element={<AuthLayout />}>
            <Route path="/merchantsignup" element={<MerchantSignup />} />
            <Route path="/usersignup" element={<UserSignup />} />
            <Route path="/roles" element={<RoleSelect />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/payment" element={<PaymentMethodsCard />} />
          </Route>

          <Route index path="/" element={<Home />} />
          <Route
            path="/createoffer"
            element={<CreateOffer action="Create" />}
          />
          <Route path="/searchPlace" element={<RoutesPath />} />
        </Routes>
      </main>
      <Toaster />
    </>
  );
}
