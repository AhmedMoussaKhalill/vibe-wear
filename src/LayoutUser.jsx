import React from "react";
import UserHeader from "./components/user/UserHeader";
import UserProfile from "./pages/UserProfile";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const LayoutUser = ({ users, logged, setLogged, userDetails, setUserDetails, CartArray, setCartArray }) => {
  return (
    <div>
      <UserHeader
        logged={logged}
        setLogged={setLogged}
        userDetails={userDetails}
      />
      <Routes>
        <Route
          path="/profile"
          element={logged && <UserProfile userDetails={userDetails} setUserDetails={setUserDetails} />}
        />
        <Route
          path="/shop"
          element={<Shop CartArray={CartArray} setCartArray={setCartArray} /> />}
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
