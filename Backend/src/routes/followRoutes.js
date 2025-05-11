const express = require('express');
const router = express.Router();
const followController = require('../controllers/followController');

router.post('/', followController.followUser);
router.post('/unfollow', followController.unfollowUser);
router.get('/:userId/followers', followController.getFollowers);
router.get('/:userId/following', followController.getFollowing);
router.get('/:userId/followed-posts', followController.getFollowedPosts);

module.exports = router;
