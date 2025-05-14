import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const FollowedFeed = () => {
  const [userId, setUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserId = () => {
      const id = localStorage.getItem('userId');
      if (id) {
        setUserId(id);
      } else {
        console.error('User ID not found in localStorage');
        navigate('/login');
      }
    };

    fetchUserId();
  }, [navigate]);

   // Fetch posts from followed users once userId is set

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    const fetchFollowedPosts = async () => {
      try {
        setLoading(true);
        setError(null);

        const res = await axios.get(`http://localhost:5000/api/follow/${userId}/followed-posts`);  // Call backend API to get followed users' posts
        setPosts(res.data.length > 0 ? res.data : []);
      } catch (error) {
        console.error('Error fetching followed posts:', error);
        setError('Failed to fetch posts. Please try again later.');
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchFollowedPosts();
  }, [userId]);

  return (
    <div className="feed-container">
      <h2 className="feed-title">Feed from Followed Users</h2>

      {loading && <p>Loading posts...</p>}
      {error && <p className="feed-error">{error}</p>}
      {!loading && !error && posts.length === 0 && <p>No posts available from followed users.</p>}

      {!loading && !error && posts.length > 0 && (
        <div className="feed-card-list">
          {posts.map((post, index) => (
            <div key={index} className="feed-card">
              <div className="feed-card-title">{post.title}</div>
              <div className="feed-card-content">{post.content}</div>
              <div className="feed-card-author">Author: {post.username}</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default FollowedFeed;
