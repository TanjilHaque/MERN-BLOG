import React, { useState } from "react";
import { useNavigate } from "react-router";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/registration");
  };
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post("http://localhost:4000/login", loginData);
    console.log(response);
    setLoginData({
      email: "",
      password: "",
    });
    if (response.status === 200) {
      navigate("/blog");
    }
  };
  return (
    <div className="h-screen text-black">
      <div className="flex flex-col justify-center items-center gap-[30px] h-full bg-sky-100">
        <div className="font-bold text-3xl">Login To Your Account</div>

        <div className="border-2 border-sky-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Email"
            type="email"
            name="email"
            value={loginData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="border-2 border-sky-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Password"
            type="password"
            name="password"
            value={loginData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-outline btn-info rounded-3xl"
        >
          Login
        </button>
        <div
          onClick={handleNavigate}
          className="cursor-pointer hover:text-blue-700 duration-200"
        >
          Don't have an account? Go to Sign Up
        </div>
      </div>
    </div>
  );
};

export default Login;
