import React from "react";
import { Route, Routes } from "react-router-dom";
import DashBoard from "./pages/admin/DashBoard";
import SideBar from "./components/admin/SideBar";
import AdminHeader from "./components/admin/AdminHeader";

const LayoutAdmin = ({ users, userDetails, setLogged }) => {
  return (
    <div>
      <SideBar />
      <div className="pl-52">
        <AdminHeader userDetails={userDetails} setLogged={setLogged}  />
      </div>

      <Routes>
        <Route
          path="/"
          element={<DashBoard users={users}/>}
        />
      </Routes>
    </div>
  );
};

export default LayoutAdmin;
