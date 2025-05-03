const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

// Route to follow a user
router.post('/', followController.followUser);

// Route to unfollow a user
router.post('/unfollow', followController.unfollowUser);

// Route to get followers of a user
router.get('/:userId/followers', followController.getFollowers);

// Route to get users that a user is following
router.get('/:userId/following', followController.getFollowing);

// New route to get posts from followed users
router.get('/:userId/followed-posts', followController.getFollowedPosts);

module.exports = router;
