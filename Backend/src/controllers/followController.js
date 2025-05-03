const followDao = require('../dao/followDao');
const blogDao = require('../dao/blogDao'); // Import blogDao for fetching posts

// Follow a user
exports.followUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    // Call the data access method to follow the user
    await followDao.followUser(followerId, followingId);
    return res.status(200).json({ message: 'User followed successfully' });
  } catch (error) {
    console.error('Error following user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Unfollow a user
exports.unfollowUser = async (req, res) => {
  try {
    const { followerId, followingId } = req.body;
    // Call the data access method to unfollow the user
    await followDao.unfollowUser(followerId, followingId);
    return res.status(200).json({ message: 'User unfollowed successfully' });
  } catch (error) {
    console.error('Error unfollowing user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get followers of a user
exports.getFollowers = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch followers of the user
    const followers = await followDao.getFollowers(userId);
    return res.status(200).json(followers);
  } catch (error) {
    console.error('Error fetching followers:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get users you are following (full user details)
exports.getFollowing = async (req, res) => {
  try {
    const { userId } = req.params;
    // Fetch users that the current user is following
    const following = await followDao.getFollowing(userId);
    return res.status(200).json(following);
  } catch (error) {
    console.error('Error fetching following:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

// Get posts from followed users
exports.getFollowedPosts = async (req, res) => {
  try {
    const { userId } = req.params;

    // Fetch the list of followed user IDs
    const followedUserIds = await followDao.getFollowingIds(userId);
    
    console.log("Followed User IDs:", followedUserIds);  // Debugging step

    if (followedUserIds.length === 0) {
      return res.status(404).json({ message: 'No followed users found' });
    }

    // Extract the user IDs from the followedUserIds array
    const followedUserIdsList = followedUserIds;

    console.log("Followed User IDs List:", followedUserIdsList);  // Debugging step

    // Fetch posts from these followed users
    const posts = await blogDao.getPostsByUserIds(followedUserIdsList);

    // Check if no posts are found
    if (posts.length === 0) {
      return res.status(404).json({ message: 'No posts found from followed users' });
    }

    // Return the posts
    return res.status(200).json(posts);
  } catch (error) {
    console.error('Error fetching followed posts:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

