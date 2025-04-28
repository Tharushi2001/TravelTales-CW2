const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
require('dotenv').config();

// Register user
exports.register = (req, res) => {
  const { username, email, password } = req.body;

  // Check if all fields are provided
  if (!username || !email || !password) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  // Hash the password
  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      return res.status(500).json({ message: 'Error hashing password', error: err });
    }

    // Register the user in the database
    userDao.registerUser(username, email, hashedPassword)
      .then(() => res.status(201).json({ message: 'User registered successfully' }))
      .catch((error) => res.status(500).json({ message: 'Error registering user', error }));
  });
};

// Login user
exports.login = (req, res) => {
  const { username, password } = req.body;

  // Retrieve user from database by username
  userDao.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }

      // Compare the provided password with the stored hashed password
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) {
          return res.status(401).json({ message: 'Invalid username or password' });
        }

        // Generate JWT token
        const token = jwt.sign(
          { id: user.id, username: user.username },
          process.env.JWT_SECRET,
          { expiresIn: '1h' }
        );

        // Log token generation for debugging
        console.log("Setting cookie with token:", token);

        // Set cookie with JWT token
        res.cookie('accessToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production',  // Use secure cookies in production
          sameSite: 'None',  // Important for cross-site cookies
          maxAge: 3600000,  // 1 hour
        });

        res.status(200).json({ message: 'Login successful',
          token,
          username:user.username,

         });
      });
    })
    .catch((error) => res.status(500).json({ message: 'Database error', error }));
};


// Logout user
exports.logout = (req, res) => {
  try {
   

    // Log cookie clearing for debugging
    console.log("Clearing accessToken cookie...");

    // Clear the accessToken cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/',  // Make sure the path matches where the cookie was set
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
    // Handle unexpected errors
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};
