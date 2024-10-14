import React, { useEffect, useState } from "react";
import "./Navbar.css";

import { Link, useLocation, useNavigate } from "react-router-dom";
function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  let [currentPath, setcurrentPath] = useState(location.pathname);
  useEffect(() => {
    const checkCartLength = () => {
      const cartArray = JSON.parse(localStorage.getItem("CartArray")) || [];
      console.log(cartArray.length);
    };
    checkCartLength();
    const intervalId = setInterval(checkCartLength, 3000);
    return () => clearInterval(intervalId);
  }, []);
  return (
    <nav className="">
      <div className="container-xl py-3">
        <div className="row justify-content-between align-items-center">
          <div className="col-lg-3 col-md-6">
            <Link to={""}>
              <img src="/logo.png" alt="" />
            </Link>
          </div>
          <div className="col-lg-3 col-md-6">
            <div className="row justify-content-end justify-content-lg-center">
              <h4 className="link">
                <Link
                  to={""}
                  className={currentPath == "/" ? "active" : ""}
                  onClick={() => {
                    setcurrentPath("/");
                  }}
                >
                  Home
                </Link>
              </h4>
              <h4 className="link">
                <Link
                  to={"shop"}
                  className={currentPath == "/shop" ? "active" : ""}
                  onClick={() => {
                    location.pathname = "/shop";
                    setcurrentPath("/shop");
                  }}
                >
                  Shop
                </Link>
              </h4>
            </div>
          </div>
          <div className="col-lg-3 col-md-12 mt-lg-0 mt-3">
            <div className="row justify-content-end">
              <h4
                className="btn btn-green btn-font position-relative px-4 py-2"
                onClick={() => {
                  setcurrentPath("/cart");
                  navigate("/cart");
                }}
              >
                <span className="position-absolute bg-danger rounded-circle circlaya h-6 w-6 pt-1">
                  {JSON.parse(localStorage.getItem("CartArray"))?.length}
                </span>
                <Link to={"cart"}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="lucide lucide-shopping-cart"
                  >
                    <circle cx="8" cy="21" r="1"></circle>
                    <circle cx="19" cy="21" r="1"></circle>
                    <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
                  </svg>
                </Link>
              </h4>
              <h4 className="btn btn-green btn-font mx-4 px-4 py-2">Login</h4>
              <h4 className="btn btn-moon position-relative px-3 py-2">
                <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
                  <svg
                    stroke="currentColor"
                    fill="currentColor"
                    strokeWidth="0"
                    viewBox="0 0 24 24"
                    className="text-mainWhite h-5 w-5"
                    height="1em"
                    width="1em"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path fill="none" d="M0 0h24v24H0z"></path>
                    <path d="M12 3a9 9 0 1 0 9 9c0-.46-.04-.92-.1-1.36a5.389 5.389 0 0 1-4.4 2.26 5.403 5.403 0 0 1-3.14-9.8c-.44-.06-.9-.1-1.36-.1z"></path>
                  </svg>
                </span>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
