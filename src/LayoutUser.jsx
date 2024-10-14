import React from "react";
import UserHeader from "./components/user/UserHeader";
import UserProfile from "./pages/UserProfile";
import { Route, Routes } from "react-router-dom";
import Login from "./pages/Login";

const LayoutUser = ({ users, logged, setLogged, userDetails, setUserDetails }) => {
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
          path="/login"
          element={<Login users={users} setLogged={setLogged} />}
        />
      </Routes>
    </div>
  );
};

export default LayoutUser;
