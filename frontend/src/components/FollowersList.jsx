import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FollowersList = ({ userId }) => {
  const [followers, setFollowers] = useState([]);

  useEffect(() => {
    const fetchFollowers = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/follow/${userId}/followers`);
        setFollowers(res.data);
      } catch (error) {
        console.error('Error fetching followers:', error.message);
      }
    };
    fetchFollowers();
  }, [userId]);

  return (
    <div>
      <h3>Followers</h3>
      <ul>
        {followers.map((follower) => (
          <li key={follower.id}>{follower.username}</li>
        ))}
      </ul>
    </div>
  );
};

export default FollowersList;
