import React from "react";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Blog from "./pages/Blog";
import { Route, Routes } from "react-router";
import BlogDetails from "./pages/BlogDetails";
import BlogEditModal from "./components/BlogEditModal";

const App = () => {
  return (
    <Routes>
      <Route path="/registration" element={<SignUp />} />
      <Route path="/login" element={<Login />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog-details/:id" element={<BlogDetails />} />
      <Route path="/blogEdit/:id" element={<BlogEditModal></BlogEditModal>} />
    </Routes>
  );
};

export default App;
