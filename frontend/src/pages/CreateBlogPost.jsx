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
    
    // Getting the token from localStorage for authentication
    const token = localStorage.getItem("token");
    
    if (!token) {
      alert("You need to be logged in to create a blog post.");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/blog/create", 
        { title, content, country, date_of_visit: dateOfVisit },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach the token for authentication
          }
        }
      );

      if (response.status === 201) {
        alert("Blog post created successfully!");
        navigate("/dashboard");
      }
    } catch (error) {
      console.error("Error creating blog post:", error);
      alert("Error creating blog post. Please try again.");
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
