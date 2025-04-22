import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import bannerImg from "../img/travel.jpg";

const ViewPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/blogs/blog/${id}`);

        setPost(res.data);
        setError("");
      } catch (err) {
        console.error("Error fetching post:", err);
        setError("Failed to load the blog post.");
      }
    };

    fetchPost();
  }, [id]);

  if (error) {
    return (
      <div className="view-post-container">
        <h2>{error}</h2>
        <button onClick={() => navigate("/")}>Back to Home</button>
      </div>
    );
  }

  if (!post) {
    return <div className="view-post-container"><p>Loading...</p></div>;
  }

  return (
    <div>
      {/* Banner Image with Title Overlay */}
      <div className="SingleBanner-image">
        <div className="overlay"></div>
        <img src={bannerImg} alt="Banner" className="singleblog-img" />
        <div className="singleblog-title">{post.title}</div>
      </div>

      {/* Blog Post Content */}
      <div className="view-post-container">
        <div className="post-header">
          <div className="post-author">
            <strong>Posted by:</strong> {post.username || "Unknown"}
          </div>
          <div className="post-info">
            <p><strong>Country:</strong> {post.country}</p>
            <p><strong>Date of Visit:</strong> {new Date(post.date_of_visit).toLocaleDateString()}</p>
          </div>
        </div>

        <div className="post-body">
          <p>{post.content}</p>
        </div>

        
      </div>
    </div>
  );
};

export default ViewPost;