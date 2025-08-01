import React, { useEffect } from "react";
import axios, { all } from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";

const Blog = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [realTime, setRealTime] = useState(false);
  useEffect(() => {
    const getAllBlogs = async () => {
      try {
        const allBlogs = await axios.get("http://localhost:4000/get-all-blog");
        setBlogs(allBlogs?.data.data);
      } catch (err) {
        console.log("error from getAllBlog", err);
      }
    };
    getAllBlogs();
  }, [realTime]);
  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDescription: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const userFormData = new FormData();
    userFormData.append("blogTitle", formData.blogTitle);
    userFormData.append("blogDescription", formData.blogDescription);
    userFormData.append("image", formData.image);

    const response = await axios.post(
      "http://localhost:4000/create-blog",
      userFormData
    );
    if (response.status === 201) {
      setRealTime(!realTime);
    }

    console.log("Submitted Data: ", userFormData);
  };
  const handleViewBtn = (id) => {
    navigate(`/blog-details/${id}`);
  };

  return (
    <div className="flex justify-between items-start px-6 py-4 bg-purple-100">
      {/* ======================== Form section 30% ======================== */}
      <div className="w-[30%] h-full">
        <div>
          <h2 className="text-2xl pb-6 font-bold text-purple-950">
            Create a Blog
          </h2>
          <form onSubmit={handleSubmit} className="flex flex-col gap-6">
            <input
              type="text"
              name="blogTitle"
              placeholder="Blog Title"
              value={formData.blogTitle}
              onChange={handleChange}
              className="w-full border-2 border-purple-400 rounded py-3 px-1 text-black"
              required
            />
            <textarea
              onChange={handleChange}
              placeholder="Blog Description"
              className="border-2 border-purple-400 rounded h-[150px] px-1 py-3 text-black"
              name="blogDescription"
              value={formData.blogDescription}
              id="blogDescription"
              required
            ></textarea>
            <label
              htmlFor="files"
              className="border rounded bg-purple-800 py-3 px-3 cursor-pointer hover:bg-purple-700"
            >
              Select an image
            </label>
            <input
              style={{ display: "none" }}
              id="files"
              type="file"
              accept="image/*"
              name="image"
              onChange={handleChange}
            />
            <button
              type="submit"
              className="w-[70%] bg-purple-500 text-white py-2 rounded-xl hover:bg-purple-600 cursor-pointer"
            >
              Submit Blog
            </button>
          </form>
        </div>
      </div>
      {/* ======================== Blog section 70% ======================== */}
      <div className="h-full w-[70%] max-w-screen-xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-4">
        {blogs.map((item) => (
          <div
            key={item._id}
            className="bg-base-100 shadow-sm rounded-xl overflow-hidden flex flex-col"
          >
            <figure className="w-full h-48 overflow-hidden">
              <img
                src={item.image}
                alt={item.blogTitle}
                className="w-full h-full object-cover"
              />
            </figure>
            <div className="card-body p-4 flex-1 flex flex-col justify-between text-center">
              <h2 className="card-title text-lg font-semibold mb-2">
                {item.blogTitle}
              </h2>
              <p className="text-sm text-white mb-4">
                {item.blogDescription.length > 20
                  ? item.blogDescription.substring(0, 20) + " ..."
                  : item.blogDescription}
              </p>
              <div className="card-actions justify-center">
                <button
                  onClick={() => handleViewBtn(item._id)}
                  className="btn btn-primary btn-sm"
                >
                  View More
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Blog;
