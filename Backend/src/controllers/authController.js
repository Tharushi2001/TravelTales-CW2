const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userDao = require('../dao/userDao');
require('dotenv').config();

exports.register = (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password) return res.status(400).json({ message: 'All fields required' });

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) return res.status(500).json({ message: 'Error hashing password', error: err });

    userDao.registerUser(username, email, hashedPassword)
      .then(() => res.status(201).json({ message: 'User registered successfully' }))
      .catch((error) => res.status(500).json({ message: 'Error registering user', error }));
  });
};

exports.login = (req, res) => {
  const { username, password } = req.body;

  userDao.getUserByUsername(username) // Change from getUserByEmail to getUserByUsername
    .then((user) => {
      if (!user) return res.status(401).json({ message: 'Invalid username or password' });

      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err || !isMatch) return res.status(401).json({ message: 'Invalid username or password' });

        const token = jwt.sign({ id: user.id, username: user.username }, process.env.JWT_SECRET, { expiresIn: '1h' });

        // Set the token as an HTTP-only cookie
        res.cookie('accessToken', token, {
          httpOnly: true, // Cookie can't be accessed via JavaScript
          secure: process.env.NODE_ENV === 'production', // Set secure flag to true in production
          sameSite: 'None', // Allow cross-site cookie sharing (CORS), adjust as needed
          maxAge: 3600000, // 1 hour expiry
        });

        res.status(200).json({ message: 'Login successful', token });
      });
    })
    .catch((error) => res.status(500).json({ message: 'Database error', error }));
};

exports.logout = (req, res) => {
  res.clearCookie('accessToken', {
    httpOnly: true, // Cookie is removed from the browser
    secure: process.env.NODE_ENV === 'production', // Adjust this flag in production
    sameSite: 'None', // Adjust based on your needs
  });

  res.status(200).json({ message: 'User has been logged out' });
};
