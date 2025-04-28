import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreateBlogPost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfVisit, setDateOfVisit] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("You need to be logged in to create a blog post.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blogs/blog/create",
        {
          title,
          content,
          country,
          date_of_visit: dateOfVisit, // Send field names matching backend expectation
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json", // Explicitly mention content type
          },
          withCredentials: true, // Important if backend also checks cookies
        }
      );

      if (response.status === 201 || response.data.success) {
        alert("Blog post created successfully!");
        navigate("/");
      } else {
        throw new Error("Unexpected server response");
      }
    } catch (error) {
      console.error(
        "Error creating blog post:",
        error.response ? error.response.data : error.message
      );

      if (error.response?.status === 401) {
        alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert(error.response?.data?.message || "Error creating blog post. Please try again.");
      }
    }
  };

  return (
    <div className="create-blog-post">
      <h1>Create Blog Post</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows="8"
        />
        <input
          type="text"
          placeholder="Country"
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          required
        />
        <input
          type="date"
          value={dateOfVisit}
          onChange={(e) => setDateOfVisit(e.target.value)}
          required
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
};

export default CreateBlogPost;
