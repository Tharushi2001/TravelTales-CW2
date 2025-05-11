import { useEffect, useState } from 'react';
import axios from 'axios';
import FollowersList from '../components/FollowersList';
import FollowingList from '../components/FollowingList';
import UserImg from "../img/userprofile.jpg";

function UserProfile() {
  const userId = localStorage.getItem("userId");
  const [userData, setUserData] = useState(null);
  const [followerCount, setFollowerCount] = useState(0);
  const [followingCount, setFollowingCount] = useState(0);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!userId) return;

      try {
        const resUser = await axios.get(`http://localhost:5000/api/auth/user/${userId}`);
        setUserData(resUser.data);

        const followersRes = await axios.get(`http://localhost:5000/api/follow/${userId}/followers`);
        const followingRes = await axios.get(`http://localhost:5000/api/follow/${userId}/following`);

        setFollowerCount(followersRes.data.length);
        setFollowingCount(followingRes.data.length);
      } catch (error) {
        console.error("Error loading profile data:", error.message);
      }
    };

    fetchUserData();
  }, [userId]);

  if (!userData) return <div className="loading">Loading...</div>;

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-picture">
          <img
            src={UserImg}
            alt="Profile"
          />
                 
        </div>
        <div className="profile-info">
          <h2>{userData.username}</h2>
          <p>{userData.email}</p>
          <div className="follow-counts">
            <span><strong>{followerCount}</strong> followers</span>
            <span><strong>{followingCount}</strong> following</span>
          </div>
        </div>
      </div>

      <div className="profile-follow-section">
        <FollowersList userId={userId} />
        <FollowingList userId={userId} />
      </div>
    </div>
  );
}

export default UserProfile;
