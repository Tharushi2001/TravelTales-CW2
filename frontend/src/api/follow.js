const API_BASE_URL = 'http://localhost:5000/api/follow';

// Follow a user
export const followUser = async (followerId, followingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Important to send cookies if session-based
      body: JSON.stringify({ followerId, followingId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to follow user');
    }
    return data;
  } catch (error) {
    throw error;
  }
};

// Unfollow a user
export const unfollowUser = async (followerId, followingId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/unfollow`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify({ followerId, followingId }),
    });

    const data = await response.json();
    if (!response.ok) {
      throw new Error(data.message || 'Failed to unfollow user');
    }
    return data;
  } catch (error) {
    throw error;
  }
};
