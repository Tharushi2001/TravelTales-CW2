const db = require('../config/db');

// Follow a user
exports.followUser = (followerId, followingId) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO follows (follower_id, following_id) VALUES (?, ?)';
    db.query(query, [followerId, followingId], (err, results) => {
      if (err) {
        console.error('Error following user:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Unfollow a user
exports.unfollowUser = (followerId, followingId) => {
  return new Promise((resolve, reject) => {
    const query = 'DELETE FROM follows WHERE follower_id = ? AND following_id = ?';
    db.query(query, [followerId, followingId], (err, results) => {
      if (err) {
        console.error('Error unfollowing user:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get list of users the given user is following
exports.getFollowing = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id IN (SELECT following_id FROM follows WHERE follower_id = ?)';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching following users:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get only following IDs (for fetching posts)
exports.getFollowingIds = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT following_id FROM follows WHERE follower_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching following IDs:', err);
        reject(err);
      } else {
        const followingIds = results.map(result => result.following_id);
        resolve(followingIds);
      }
    });
  });
};

// Get list of followers for a user
exports.getFollowers = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id IN (SELECT follower_id FROM follows WHERE following_id = ?)';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching followers:', err);
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get the count of followers
exports.getFollowersCount = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM follows WHERE following_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching followers count:', err);
        reject(err);
      } else {
        resolve(results[0].count);
      }
    });
  });
};

// Get the count of following users
exports.getFollowingCount = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT COUNT(*) AS count FROM follows WHERE follower_id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        console.error('Error fetching following count:', err);
        reject(err);
      } else {
        resolve(results[0].count);
      }
    });
  });
};
