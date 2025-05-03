import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FollowedFeed = () => {
  const [userId, setUserId] = useState(null);  // State for user ID
  const [posts, setPosts] = useState([]);      // State for posts
  const [loading, setLoading] = useState(true); // State for loading

  useEffect(() => {
    // Fetch user ID from local storage (or another appropriate source)
    const fetchUserId = () => {
      const id = localStorage.getItem('userId');  // Assuming userId is stored in localStorage
      if (id) {
        setUserId(id);  // Set the userId if found
      } else {
        console.error('User ID not found in localStorage');
      }
    };

    fetchUserId();
  }, []); // Run this effect only once when the component mounts

  useEffect(() => {
    // Proceed to fetch posts only if the userId is available
    if (!userId) {
      console.error('User ID is undefined');
      setLoading(false);  // No need to continue if userId is not available
      return;
    }

    const fetchFollowedPosts = async () => {
      try {
        // Fetch posts from the API using the userId
        const res = await axios.get(`http://localhost:5000/api/follow/${userId}/followed-posts`);
        setPosts(res.data); // Set the fetched posts
      } catch (error) {
        console.error('Error fetching followed posts:', error);
        setPosts([]); // Set an empty array if an error occurs
      } finally {
        setLoading(false); // End loading
      }
    };

    fetchFollowedPosts();
  }, [userId]); // Dependency on userId so it runs when it's set

  return (
    <div style={{ padding: '20px' }}>
      <h2>Feed from Followed Users</h2>
      {loading ? (
        <p>Loading posts...</p>  // Show loading message if posts are being fetched
      ) : posts.length === 0 ? (
        <p>No posts available from followed users.</p>  // Show this if no posts were fetched
      ) : (
        <ul>
          {posts.map((post, index) => (
            <li key={index} style={{ marginBottom: '10px' }}>
              <strong>{post.title}</strong>
              <p>{post.content}</p>
              <span>Author: {post.username}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default FollowedFeed;
