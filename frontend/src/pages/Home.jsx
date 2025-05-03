import React, { useEffect, useState, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import bannerImg from "../img/Banner-img.jpg";
import cardImg from "../img/card-image.png";
import "font-awesome/css/font-awesome.min.css";
import FollowButton from "../components/FollowButton";

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [likedPosts, setLikedPosts] = useState([]);
  const [commentInputs, setCommentInputs] = useState({});
  const [sortOption, setSortOption] = useState("newest");
  const [followingList, setFollowingList] = useState([]);
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const username = localStorage.getItem("username");
  const currentUserId = localStorage.getItem("userId");

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

    const fetchFollowing = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/follow/${currentUserId}/following`
        );
        setFollowingList(res.data.map((user) => user.id));
      } catch (err) {
        console.error("Error fetching following list:", err.message);
      }
    };

    if (currentUserId) {
      fetchFollowing();
    }
  }, [fetchPosts, currentUserId]);

  const handleCreatePost = () => {
    if (token) {
      navigate("/create-blog-post");
    } else {
      navigate("/login", { state: { from: "/create-blog-post" } });
    }
  };

  const handleLikePost = async (postId) => {
    if (!token) {
      navigate("/login");
      return;
    }
    try {
      const res = await axios.post(
        `http://localhost:5000/api/blogs/like/${postId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      if (res.status === 200) {
        const updatedPosts = posts.map((post) =>
          post.id === postId ? { ...post, likes: res.data.likeCount } : post
        );
        setPosts(updatedPosts);
        setLikedPosts((prev) => [...new Set([...prev, postId])]);
      } else {
        console.error("Unable to like post, status:", res.status);
      }
    } catch (err) {
      console.error("Error liking post:", err.response?.data || err.message);
    }
  };

  const handleCommentInputChange = (postId, value) => {
    setCommentInputs((prev) => ({ ...prev, [postId]: value }));
  };

  const handleAddComment = async (postId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    const comment = commentInputs[postId];
    if (!comment) return;

    try {
      await axios.post(
        `http://localhost:5000/api/blogs/comment/${postId}`,
        { content: comment },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCommentInputs((prev) => ({ ...prev, [postId]: "" }));
      fetchPosts();
    } catch (err) {
      console.error("Error adding comment:", err.response?.data || err.message);
    }
  };

  const handleDeletePost = async (postId) => {
    if (!token) {
      navigate("/login");
      return;
    }

    if (window.confirm("Are you sure you want to delete this post?")) {
      try {
        await axios.delete(
          `http://localhost:5000/api/blogs/blog/delete/${postId}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );
        fetchPosts();
      } catch (err) {
        console.error("Error deleting post:", err.response?.data || err.message);
      }
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
          <button onClick={handleCreatePost} className="create-post-btn">
            Create New Post
          </button>
        </div>

        <div className="post-grid">
          {posts.length > 0 ? (
            posts.map((post) => (
              <div className="post-wrapper" key={post.id}>
                <div className="post-card">
                  <div className="post-topsection">
                    <div className="post-header">
                      <div className="image-container">
                        <img src={cardImg} alt="Banner" className="card-img" />
                        <div className="overlay">
                          <h2>{post.title}</h2>
                          <span>{new Date(post.date_of_visit).toLocaleDateString()}</span>
                          <span>Country: {post.country}</span>

                          <p className="post-content">
                            {post.content.length > 150
                              ? `${post.content.slice(0, 150)}...`
                              : post.content}
                          </p>

                          {post.content.length > 150 && (
                            <button
                              className="read-more-btn"
                              onClick={() => navigate(`/view-post/${post.id}`)}
                            >
                              Read More
                            </button>
                          )}

                          {parseInt(post.user_id) === parseInt(currentUserId) && (
                            <div className="post-actions">
                              <button
                                className="action-button edit-post-icon"
                                onClick={() => navigate(`/edit-post/${post.id}`)}
                                title="Edit Post"
                                aria-label="Edit Post"
                              >
                                Edit <i className="fa fa-pencil"></i>
                              </button>
                              <button
                                className="action-button delete-post-icon"
                                onClick={() => handleDeletePost(post.id)}
                                title="Delete Post"
                                aria-label="Delete Post"
                              >
                                <i className="fa fa-trash"></i>
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="post-meta">
                    <div className="post-author-follow">
                      <span>Author: {post.username}</span>
                      {parseInt(post.user_id) !== parseInt(currentUserId) && (
                        <FollowButton
                          currentUserId={parseInt(currentUserId)}
                          targetUserId={parseInt(post.user_id)}
                          initiallyFollowing={followingList.includes(post.user_id)}
                        />
                      )}
                    </div>
                  </div>
                </div>

                <div className="social-features">
                  <button
                    onClick={() => handleLikePost(post.id)}
                    className={`like-btn ${
                      likedPosts.includes(post.id) ? "liked" : ""
                    }`}
                  >
                    <i className="fa fa-thumbs-up" />
                  </button>
                  <span className="like-count">{post.likes} Likes</span>
                  <span className="comment-count">
                    <i className="fa fa-comment" />{" "}
                    {post.comments?.length ?? 0} Comments
                  </span>
                </div>

                <div className="comment-section">
                  {post.comments && post.comments.length > 0 ? (
                    <div className="comments-list">
                      {post.comments.map((comment) => (
                        <div key={comment.id} className="comment">
                          <span className="comment-author">
                            {comment.username}
                          </span>
                          <p className="comment-content">{comment.content}</p>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>No comments yet.</p>
                  )}

                  <input
                    type="text"
                    placeholder="Write a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) =>
                      handleCommentInputChange(post.id, e.target.value)
                    }
                    className="comment-input"
                  />
                  <button
                    onClick={() => handleAddComment(post.id)}
                    className="submit-comment-btn"
                  >
                    Comment
                  </button>
                </div>
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
