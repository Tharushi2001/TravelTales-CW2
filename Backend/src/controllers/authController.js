const bcrypt = require('bcryptjs');
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

  userDao.getUserByUsername(username)
    .then((user) => {
      if (!user) {
        return res.status(401).json({ message: 'Invalid username or password' });
      }
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
   
        console.log("Setting cookie with token:", token);

        // Set cookie with JWT token
        res.cookie('accessToken', token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === 'production', 
          sameSite: 'None',  
          maxAge: 3600000, 
        });

        res.status(200).json({
          message: 'Login successful',
          token,
          username: user.username,
          userId: user.id, 
        });
      });
    })
    .catch((error) => res.status(500).json({ message: 'Database error', error }));
};

// Logout user
exports.logout = (req, res) => {
  try {
    console.log("Clearing accessToken cookie...");

    // Clear the accessToken cookie
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'None',
      path: '/', 
    });

    res.status(200).json({ message: 'Logged out successfully' });
  } catch (error) {
 
    console.error('Logout error:', error);
    res.status(500).json({ message: 'Error logging out' });
  }
};


exports.getUserById = (req, res) => {
  const { userId } = req.params;


  userDao.getUserById(userId)
    .then((user) => {
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
      return res.json({ username: user.username, email: user.email });
    })
    .catch((error) => {
      console.error('Error fetching user:', error);
      return res.status(500).json({ message: 'Internal server error' });
    });
};
