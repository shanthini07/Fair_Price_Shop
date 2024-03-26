import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLogin from "./components/UserLogin";
import { useState } from "react";
import { OTP } from "./context/OTPverify";
import OTPVerification from "./components/OTPverification";
import AdminLogin from "./components/AdminLogin";
import ShopLogin from "./components/ShopLogin";
import UserProfile from "./components/UserProfile";
import UserHome from "./components/UserHome";
import { Kart } from "./components/Kart";
import Bill from "./components/Bill";
import UserLayout from "./components/UserLayout";
import { Login } from "./components/Login";
import { AdminHome } from "./components/AdminHome";
import { ShopProfile } from "./components/ShopProfile";
import { ShopMembers } from "./components/ShopMembers";
import MemberProfile from "./components/MemberProfile";
import ShopLayout from "./components/ShopLayout";
import NewUser from "./components/NewUser";
import NewShop from "./components/NewShop";
import { ViewShops } from "./components/ViewShops";
import { UpdateShop } from "./components/UpdateShop";
import { AdminLayout } from "./components/AdminLayout";
import AdminMemberProfile from "./components/AdminMemberProfile";
import { AdminShopMembers } from "./components/AdminShopMembers";

function App() {
  const [otp,setotp]=useState(OTP)
  
  return (
    <div>
        <BrowserRouter>
          <Routes>

            <Route path="/login" element={<Login/>} />
            <Route path="/userlogin" element={<OTP.Provider value={[otp,setotp]}><UserLogin/></OTP.Provider>}/>
            <Route path="/otpverification" element={<OTP.Provider value={[otp,setotp]}><OTPVerification/></OTP.Provider>}/>
            <Route path="/adminlogin" element={<AdminLogin/>} />
            <Route path="/shoplogin" element={<ShopLogin/>} />      


            <Route path="/" element={<UserLayout/>} >
              <Route path="/userprofile" element={<UserProfile/>} />
              <Route path="/userhome" element={<UserHome/>} />
              <Route path="/kart" element={<Kart/>} />
              <Route path="/bill" element={<Bill/>} />
            </Route>

            <Route path='/shop' element={<ShopLayout/>}>
              <Route path="/shop/shopprofile" element={<ShopProfile/>} />
              <Route path="/shop/shopmembers" element={<ShopMembers/>} />
              <Route path="/shop/memberprofile/:uid" element={<MemberProfile/>} />
              <Route path="/shop/shopmembers" element={<ShopMembers/>} />
            </Route>   

            <Route path="/admin" element={<AdminLayout/>} >
                <Route path="/admin/adminhome" element={<AdminHome/>} />
                <Route path="/admin/shopmembers/:sid" element={<AdminShopMembers/>} />
                <Route path="/admin/viewshops" element={<ViewShops/>} />
                <Route path="/admin/updateshop/:sid" element={<UpdateShop/>} />
                <Route path="/admin/memberprofile/:uid" element={<AdminMemberProfile/>} />
            </Route>

            <Route path="/newuser" element={<NewUser/>} />
            <Route path="/newshop" element={<NewShop/>} />
            
            

          </Routes>
        </BrowserRouter>
    </div>
  );
}

export default App;
