import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImg from '../img/Banner-img.jpg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/blog?sort=${sortOption}`
      );
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, [sortOption]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const isLoggedIn = localStorage.getItem("user");

  const handleCreatePost = () => {
    if (isLoggedIn) {
      navigate("/create-blog-post");
    } else {
      navigate("/login", { state: { from: "/create-blog-post" } });
    }
  };

  return (
    <div>
      <div className="Banner-image">
        <img src={bannerImg} alt="Banner" className="banner-img" />
      </div>

      <div className="home-container">
        <div className="home-header">
          <select
            className="sort-select"
            value={sortOption}
            onChange={(e) => setSortOption(e.target.value)}
          >
            <option value="newest">Newest</option>
            <option value="most_liked">Most Liked</option>
            <option value="most_commented">Most Commented</option>
          </select>
          <button
            onClick={handleCreatePost}
            className="create-post-btn"
          >
            Create New Post
          </button>
        </div>

        <div className="post-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-card" key={post.id}>
                <div className="post-header">
                  <h2>{post.title}</h2>
                  <span>{new Date(post.date_of_visit).toLocaleDateString()}</span>
                </div>
                <p className="post-content">{post.content.slice(0, 150)}...</p>
                <div className="post-meta">
                  <span>✈️ {post.country}</span>
                  <span>🧑‍💻 {post.username}</span>
                </div>
                <div className="post-stats">
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments_count}</span>
                </div>
              </div>
            ))
          ) : (
            <p className="no-posts">No posts found.</p>
          )}
        </div>
      </div>
    </div> // ✅ This closing div was missing
  );
};

export default Home;
