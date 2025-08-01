import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router";

const BlogEditModal = () => {
  const { id } = useParams(); // Get blog ID from URL params
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    blogTitle: "",
    blogDescription: "",
    image: null,
  });

  // Fetch blog details
  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await axios.get(
          `http://localhost:4000/get-single-blog/${id}`
        );
        setFormData({
          blogTitle: res.data.title,
          blogDescription: res.data.description,
          image: null, // image preview handled separately
        });
      } catch (err) {
        console.error("Error fetching blog:", err);
      }
    };
    fetchBlog();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setFormData((prev) => ({ ...prev, image: files[0] }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updatedData = new FormData();
    updatedData.append("blogTitle", formData.blogTitle);
    updatedData.append("blogDescription", formData.blogDescription);
    if (formData.image) {
      updatedData.append("image", formData.image);
    }

    try {
      await axios.put(`http://localhost:4000/update-blog/${id}`, updatedData);
      navigate(`/blog`);
    } catch (err) {
      console.error("Update failed:", err);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-gray-900 shadow-xl rounded-xl">
      <h2 className="text-2xl font-bold mb-6 text-center">Edit Your Blog</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="blogTitle"
          placeholder="Blog Title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        />
        <textarea
          name="blogDescription"
          placeholder="Blog Description"
          value={formData.description}
          onChange={handleChange}
          rows={5}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
        ></textarea>
        <input
          type="file"
          name="image"
          accept="image/*"
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded-xl hover:bg-blue-700 transition duration-200"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};

export default BlogEditModal;
