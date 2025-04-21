const db = require("../config/db");

// Create a blog post
exports.createBlogPost = (userId, title, content, country, date_of_visit) => {
  const sql = "INSERT INTO blog_posts (user_id, title, content, country, date_of_visit) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, title, content, country, date_of_visit], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get all blog posts
exports.getAllBlogPosts = () => {
  const sql = "SELECT * FROM blog_posts ORDER BY date_of_visit DESC";
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results);
    });
  });
};

// Get blog post by ID
exports.getBlogPostById = (postId) => {
  const sql = "SELECT * FROM blog_posts WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [postId], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Update blog post
exports.updateBlogPost = (postId, title, content, country, date_of_visit) => {
  const sql = "UPDATE blog_posts SET title = ?, content = ?, country = ?, date_of_visit = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [title, content, country, date_of_visit, postId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Delete blog post
exports.deleteBlogPost = (postId) => {
  const sql = "DELETE FROM blog_posts WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [postId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Like a post
exports.likePost = (userId, postId) => {
  const sql = "INSERT IGNORE INTO likes (user_id, post_id) VALUES (?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, postId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Get like count for a post
exports.getLikeCount = (postId) => {
  const sql = "SELECT COUNT(*) AS like_count FROM likes WHERE post_id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [postId], (err, result) => {
      if (err) return reject(err);
      resolve(result[0].like_count);
    });
  });
};


// Add a comment
exports.addComment = (userId, postId, content) => {
  const sql = "INSERT INTO comments (user_id, post_id, content) VALUES (?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, postId, content], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};
