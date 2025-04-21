import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImg from '../img/Banner-img.jpg';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]); // Track liked posts
  const [commentedPosts, setCommentedPosts] = useState([]); // Track commented posts
  const [sortOption, setSortOption] = useState("newest");
  const navigate = useNavigate();

  const fetchPosts = useCallback(async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/blogs/blog?sort=${sortOption}`
      );
      console.log("Fetched posts:", res.data);
      setPosts(res.data);
    } catch (err) {
      console.error("Error fetching posts:", err);
    }
  }, [sortOption]);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const token = localStorage.getItem("token"); // Get token from localStorage
  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  const handleCreatePost = () => {
    if (token) { // Check if user is logged in
      navigate("/create-blog-post");
    } else {
      navigate("/login", { state: { from: "/create-blog-post" } });
    }
  };

  const handleLikePost = async (postId) => {
    if (!token) {
      console.log("User is not logged in.");
      navigate("/login");
      return;
    }
    console.log("Liking post with ID:", postId); // Debugging
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/like/${postId}`,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct Authorization header format
          },
        }
      );
      console.log("Like response:", res.data); // Debugging
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return { ...post, likes: res.data.likeCount }; // Update the like count
        }
        return post;
      });
      setPosts(updatedPosts);

      // Update likedPosts state to reflect the liked post
      setLikedPosts((prev) => [...prev, postId]); // Add the postId to likedPosts
    } catch (err) {
      console.error("Error liking post:", err);
    }
  };

  const handleAddComment = async (postId, comment) => {
    if (!token) {
      console.log("User is not logged in.");
      navigate("/login");
      return;
    }
    console.log("Adding comment to post with ID:", postId); // Debugging
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/blog/comment/${postId}`,
        { content: comment },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Correct Authorization header format
          },
        }
      );
      console.log("Comment response:", res.data); // Debugging
      fetchPosts(); // Refresh the posts

      // Update commentedPosts state to reflect the commented post
      setCommentedPosts((prev) => [...prev, postId]); // Add the postId to commentedPosts
    } catch (err) {
      console.error("Error adding comment:", err);
    }
  };

  return (
    <div>
      <div className="Banner-image">
        <img src={bannerImg} alt="Banner" className="banner-img" />
        <div className="banner-text">
          <h1>Welcome to TravelTales</h1>
          <p>Discover and share your travel adventures!</p>
        </div>
      </div>

      <div className="home-container">
        <div className="sec1-header">
          <h2>Blog Posts</h2>
        </div>
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
                <div className="post-meta">
                  <span>Country: {post.country}</span>
                  <span>🧑‍💻 {post.username}</span>
                </div>
                <p className="post-content">{post.content.slice(0, 150)}...</p>

                <div className="post-stats">
                  <span>👍 {post.likes}</span>
                  <span>💬 {post.comments_count}</span>
                </div>

                <button
                  onClick={() => handleLikePost(post.id)}
                  className={`like-btn ${likedPosts.includes(post.id) ? "liked" : ""}`} // Add "liked" class if the user has already liked the post
                >
                  {likedPosts.includes(post.id) ? "Liked" : "Like"} {/* Show "Liked" if the user has liked the post */}
                </button>

                <button
                  onClick={() => handleAddComment(post.id, "Great post!")}
                  className={`comment-btn ${commentedPosts.includes(post.id) ? "commented" : ""}`} // Add "commented" class if the user has already commented
                >
                  {commentedPosts.includes(post.id) ? "Commented" : "Comment"} {/* Show "Commented" if the user has commented */}
                </button>
              </div>
            ))
          ) : (
            <p className="no-posts">No posts found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
