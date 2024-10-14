import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider, Route, Routes } from "react-router-dom";
import LayoutUser from "./LayoutUser";
import LayoutAdmin from "./LayoutAdmin";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import NotFound from "./pages/404";
import axios from "axios";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./App.css";

const App = () => {
  const [users, setUsers] = useState([]);
  const [logged, setLogged] = useState(false);
  const [userDetails, setUserDetails] = useState(null);
  const [CartArray, setCartArray] = useState(
    JSON.parse(localStorage.getItem("CartArray")) || []
  );

  const getUsers = () => {
    axios({
      method: "get",
      url: "http://localhost:3000/users",
    }).then(({ data }) => setUsers(data));
  };

  const getUserDetails = () => {
    axios({
      method: "get",
      url: `http://localhost:3000/users/${localStorage.ck}`,
    }).then(({ data }) => setUserDetails(data));
  };

  useEffect(() => {
    if (logged) {
      getUserDetails();
    } else {
      localStorage.ck && setLogged(true);
    }
  }, [logged]);

  useEffect(() => {
    getUsers();
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "", element: <Home /> },
        {
          path: "shop",
          element: <Shop CartArray={CartArray} setCartArray={setCartArray} />,
        },
        {
          path: "cart",
          element: <Cart CartArray={CartArray} setCartArray={setCartArray} />,
        },
      ],
    },
  ]);

  return (
    <div>
      <Routes>
        <Route
          path="/*"
          element={
            <LayoutUser
              users={users}
              userDetails={userDetails}
              logged={logged}
              setLogged={setLogged}
              setUserDetails={setUserDetails}
            />
          }
        />
        <Route
          path="/admin/*"
          element={
            userDetails?.role === "admin" ? (
              <LayoutAdmin users={users} userDetails={userDetails} setLogged={setLogged} />
            ) : (
              <NotFound />
            )
          }
        />
      </Routes>
      <RouterProvider router={router} />
    </div>
  );
};

export default App;