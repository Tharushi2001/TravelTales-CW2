// src/pages/EditPost.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

const EditPost = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [post, setPost] = useState({ title: "", content: "", country: "", date_of_visit: "" });

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`);
        setPost(res.data);
      } catch (err) {
        console.error("Error fetching post:", err.response?.data || err.message);
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/api/blogs/blog/edit/${id}`, post, {
        headers: { Authorization: `Bearer ${token}` },
      });
      navigate("/");
    } catch (err) {
      console.error("Error updating post:", err.response?.data || err.message);
    }
  };

  return (
    <div className="edit-post-container">
      <h2>Edit Blog Post</h2>
      <form onSubmit={handleSubmit} className="edit-post-form">
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={post.title}
          onChange={handleChange}
          required
        />
        <textarea
          name="content"
          placeholder="Content"
          value={post.content}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={post.country}
          onChange={handleChange}
          required
        />
        <input
          type="date"
          name="date_of_visit"
          value={post.date_of_visit.split('T')[0]}
          onChange={handleChange}
          required
        />
        <button type="submit" className="update-post-btn">Update Post</button>
      </form>
    </div>
  );
};

export default EditPost;
