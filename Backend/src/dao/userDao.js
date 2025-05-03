const db = require('../config/db');

// Register a new user
exports.registerUser = (username, email, hashedPassword) => {
  return new Promise((resolve, reject) => {
    const query = 'INSERT INTO users (username, email, password, created_at) VALUES (?, ?, ?, NOW())';
    db.query(query, [username, email, hashedPassword], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Get user by username
exports.getUserByUsername = (username) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE username = ?';  // Query by username instead of email
    db.query(query, [username], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);  // Return the first (and only) matching result
      }
    });
  });
};

// Get user by ID
exports.getUserById = (userId) => {
  return new Promise((resolve, reject) => {
    const query = 'SELECT * FROM users WHERE id = ?';
    db.query(query, [userId], (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results[0]);  // Return the first (and only) matching result
      }
    });
  });
};
