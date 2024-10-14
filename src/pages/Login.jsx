import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowRight } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ users, setLogged }) => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate("");

  const handelForm = (e) => {
    e.preventDefault();

    const checkUser = users.find(
      ({ email, password }) => user.email == email && user.password == password,
    );

    // const emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (checkUser) {
      localStorage.ck = checkUser.id;
      setLogged(true);
      navigate("/");
    }
    //   user.name[0] == " " ||
    //   isNaN(user.name[0]) == false ||
    //   user.name.length < 3
    // ) {
    //   // toast.error("Please enter a valid name");
    //   return false;
    // } else if (!emailRegex.test(user.email)) {
    //   // toast.error("Please enter a valid email");
    //   return false;
    // } else if (user.password == "") {
    //   // toast.error("Please enter a valid password");
    //   return false;
    // }
    // return true;
  };

  return (
    <div className="mx-auto flex min-h-screen max-w-lg items-center justify-center px-5">
      <div className="w-full space-y-5 rounded-xl bg-gray-500/5 p-6 ring-1 ring-gray-900/10">
        <div className="flex flex-col items-center justify-center space-y-2">
          <h2 className="font font-serif text-4xl">Login</h2>
          <p>Nice To Meet You Again</p>
        </div>
        <form action="" onSubmit={handelForm} className="space-y-3.5">
          <div className="flex flex-col space-y-3.5">
            <label htmlFor="" className="font text-lg">
              Email
            </label>
            <Input
              value={user.email}
              type="email"
              placeholder="Enter Your Email..."
              className="h-11 rounded-lg border-0 bg-gray-500/5 ring-1 ring-gray-900/10"
              onChange={(e) => {
                setUser({
                  ...user,
                  email: e.target.value,
                });
              }}
            />
          </div>
          <div className="flex flex-col space-y-3.5">
            <label htmlFor="" className="font text-lg">
              Password
            </label>
            <Input
              value={user.password}
              placeholder="Enter Your Password..."
              type="password"
              className="h-11 rounded-lg border-0 bg-gray-500/5 ring-1 ring-gray-900/10"
              onChange={(e) => {
                setUser({
                  ...user,
                  password: e.target.value,
                });
              }}
            />
          </div>
          <div className="pt-3">
            <Button type="submit" size="lg" className="group w-full gap-x-2.5 rounded-lg">
              Sign In{" "}
              <ArrowRight className="size-3.5 transition-all duration-300 group-hover:translate-x-1" />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
