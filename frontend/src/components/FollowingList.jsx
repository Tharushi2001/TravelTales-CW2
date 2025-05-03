import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FollowingList = ({ userId }) => {
  const [following, setFollowing] = useState([]);

  useEffect(() => {
    const fetchFollowing = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/follow/${userId}/following`);
        setFollowing(res.data);
      } catch (error) {
        console.error('Error fetching following users:', error.message);
      }
    };
    fetchFollowing();
  }, [userId]);

  return (
    <div>
      <h3>Following</h3>
      <ul>
        {following.map((user) => (
          <li key={user.id}>{user.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowingList;
