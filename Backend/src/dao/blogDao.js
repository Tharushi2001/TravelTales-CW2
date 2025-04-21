const db = require("../config/db");

// Method to create a blog post
exports.createBlogPost = (userId, title, content, country, date_of_visit) => {
  const sql = "INSERT INTO blog_posts (user_id, title, content, country, date_of_visit) VALUES (?, ?, ?, ?, ?)";
  return new Promise((resolve, reject) => {
    db.query(sql, [userId, title, content, country, date_of_visit], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Method to get a single blog post by ID
exports.getBlogPostById = (id) => {
  const sql = "SELECT * FROM blog_posts WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [id], (err, results) => {
      if (err) return reject(err);
      resolve(results[0]);
    });
  });
};

// Method to update a blog post
exports.updateBlogPost = (postId, title, content, country, date_of_visit) => {
  const sql = "UPDATE blog_posts SET title = ?, content = ?, country = ?, date_of_visit = ? WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [title, content, country, date_of_visit, postId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Method to delete a blog post
exports.deleteBlogPost = (postId) => {
  const sql = "DELETE FROM blog_posts WHERE id = ?";
  return new Promise((resolve, reject) => {
    db.query(sql, [postId], (err, result) => {
      if (err) return reject(err);
      resolve(result);
    });
  });
};

// Method to get all blog posts
exports.getAllBlogPosts = () => {
  const sql = "SELECT * FROM blog_posts ORDER BY date_of_visit DESC"; // Sort by date_of_visit descending
  return new Promise((resolve, reject) => {
    db.query(sql, (err, results) => {
      if (err) return reject(err);
      resolve(results); // Return the list of blog posts
    });
  });
};
