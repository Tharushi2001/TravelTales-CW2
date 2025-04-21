import React, { useEffect, useState } from "react";
import axios from "axios";


const Home = () => {
  const [posts, setPosts] = useState([]);
  const [sortOption, setSortOption] = useState("newest");

  useEffect(() => {
    fetchPosts();
  }, [sortOption]);

  const fetchPosts = async () => {
    try {
      const res = await axios.get(`/api/posts?sort=${sortOption}`);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  };

  return (
    <div className="home-container">
      <div className="home-header">
        <h1>🌍 TravelTales</h1>
        <select
          className="sort-select"
          value={sortOption}
          onChange={(e) => setSortOption(e.target.value)}
        >
          <option value="newest">Newest</option>
          <option value="most_liked">Most Liked</option>
          <option value="most_commented">Most Commented</option>
        </select>
      </div>

      <div className="post-grid">
        {posts.length > 0 ? (
          posts.map((post) => (
            <div className="post-card" key={post.id}>
              <div className="post-header">
                <h2>{post.title}</h2>
                <span>{new Date(post.date).toLocaleDateString()}</span>
              </div>
              <p className="post-content">{post.content.slice(0, 150)}...</p>
              <div className="post-meta">
                <span>✈️ {post.country}</span>
                <span>🧑‍💻 {post.username}</span>
              </div>
              <div className="post-stats">
                <span>👍 {post.likes}</span>
                <span>💬 {post.commentsCount}</span>
              </div>
            </div>
          ))
        ) : (
          <p className="no-posts">No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
