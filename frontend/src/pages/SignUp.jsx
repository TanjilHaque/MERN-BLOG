import axios from "axios";
import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router";

const SignUp = () => {
  const navigate = useNavigate();
  const handleNavigate = () => {
    navigate("/login");
  };
  const [formData, setFormData] = useState({
    userName: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "http://localhost:4000/registration",
      formData
    );
    //console.log(response);
    setFormData({
      userName: "",
      phoneNumber: "",
      email: "",
      password: "",
    });
    if (response.status === 200) {
      navigate("/login");
    }
  };
  return (
    <div className="h-screen text-black">
      <div className="flex flex-col justify-center items-center gap-[30px] h-full bg-purple-100">
        <div className="font-bold text-3xl">Create an Account</div>
        <div className="border-2 border-purple-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Username"
            type="text"
            name="userName"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        <div className="border-2 border-purple-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Phone Number"
            type="text"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            required
          />
        </div>
        <div className="border-2 border-purple-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="border-2 border-purple-600 w-fit rounded-3xl">
          <input
            className="py-3 px-5 rounded-3xl focus:outline-0"
            placeholder="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <button
          onClick={handleSubmit}
          className="btn btn-outline btn-primary rounded-3xl"
        >
          Submit
        </button>
        <div
          className="cursor-pointer hover:text-blue-700 duration-200"
          onClick={handleNavigate}
        >
          Already have an account? Go to Login
        </div>
      </div>
    </div>
  );
};

export default SignUp;
