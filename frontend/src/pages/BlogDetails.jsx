import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import axios from "axios";

const BlogDetails = () => {
  const navigate = useNavigate();

  const [blog, setBlog] = useState({
    blogTitle: "",
    blogDescription: "",
    image: "",
  });
  const { id } = useParams();
  const handleDeleteBtn = async (id) => {
    try {
      const response = await axios.delete(
        `http://localhost:4000/delete-blog/${id}`
      );
      console.log("deleted data ", response);
      navigate(`/blog`);
    } catch (err) {
      console.log("error from deleting data ", err);
    }
  };
  const handleEditBtn = (id) => {
    navigate(`/blogEdit/${id}`);
  };
  useEffect(() => {
    const getSingleBlog = async () => {
      try {
        const response = await axios.get(
          `http://localhost:4000/get-single-blog/${id}`
        );
        console.log(response);
        setBlog(response.data.data);
      } catch (err) {
        console.log("error from getSingleBlog", err);
      }
    };
    getSingleBlog();
  }, []);
  return (
    <div>
      <div className="card lg:card-side bg-base-100 shadow-sm">
        <figure>
          <img
            className="lg:w-[70%] lg:h-[60%] sm:w-[40%] sm:h-[30%] md:w-[50%] md:h-[40%] object-cover"
            src={blog.image || "/noImage.png"}
            alt="Album"
          />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{blog.blogTitle}</h2>
          <p>{blog.blogDescription}</p>
          <div className="card-actions justify-end">
            <button
              onClick={() => {
                handleDeleteBtn(blog._id);
              }}
              className="btn btn-secondary"
            >
              Delete
            </button>
            <button
              onClick={() => {
                handleEditBtn(blog._id);
              }}
              className="btn btn-primary"
            >
              Edit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogDetails;
