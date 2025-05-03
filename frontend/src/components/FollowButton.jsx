import React, { useState, useEffect } from 'react';
import { followUser, unfollowUser } from '../api/follow';

const FollowButton = ({ currentUserId, targetUserId, initiallyFollowing, onToggleFollow }) => {
  const [isFollowing, setIsFollowing] = useState(initiallyFollowing);

  useEffect(() => {
    setIsFollowing(initiallyFollowing);
  }, [initiallyFollowing]);

  const handleFollow = async () => {
    try {
      await followUser(currentUserId, targetUserId);
      setIsFollowing(true);
      onToggleFollow(targetUserId, true);
    } catch (error) {
      console.error('Failed to follow:', error.message);
    }
  };

  const handleUnfollow = async () => {
    try {
      await unfollowUser(currentUserId, targetUserId);
      setIsFollowing(false);
      onToggleFollow(targetUserId, false);
    } catch (error) {
      console.error('Failed to unfollow:', error.message);
    }
  };

  return (
    <button
      onClick={isFollowing ? handleUnfollow : handleFollow}
      className={`follow-btn ${isFollowing ? 'btn btn-secondary' : 'btn btn-primary'}`}
    >
      {isFollowing ? 'Unfollow' : 'Follow'}
    </button>
  );
};

export default FollowButton;
