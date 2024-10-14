import React from "react";
import UserHeader from "./components/user/UserHeader";
import UserProfile from "./pages/UserProfile";
import Home from "./Components/Home/Home";
import Navbar from "./Components/Navbar/Navbar";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import { Route, Routes, Outlet } from "react-router-dom";

import Login from "./pages/Login";

const LayoutUser = ({ users, logged, setLogged, userDetails, setUserDetails, CartArray, setCartArray }) => {
  return (
    <div>
      <Navbar  
        logged={logged}
        setLogged={setLogged}
        userDetails={userDetails} 
        />
      <Routes>
        <Route
          path="/"
          element={<Home />}
        />
        <Route
          path="/profile"
          element={logged && <UserProfile userDetails={userDetails} setUserDetails={setUserDetails} />}
        />
        <Route
          path="/shop"
          element={<Shop CartArray={CartArray} setCartArray={setCartArray} />}
        />
        <Route
          path="/cart"
          element={<Cart CartArray={CartArray} setCartArray={setCartArray} />}
        />
        <Route
          path="/login"
          element={<Login users={users} setLogged={setLogged} />}
        />
      </Routes>
    </div>
  );
};

export default LayoutUser;
