import React, { useState } from "react";
import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./Components/Layout/Layout";
import Home from "./Components/Home/Home";
import Shop from "./Components/Shop/Shop";
import Cart from "./Components/Cart/Cart";
import "@fortawesome/fontawesome-free/css/all.min.css";
function App() {
  let [CartArray, setCartArray] = useState(
    JSON.parse(localStorage.getItem("CartArray")) || [],
  );

  let router = createBrowserRouter([
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
  return <RouterProvider router={router} />;
}

export default App;
