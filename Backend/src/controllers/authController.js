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
          res.status(200).json({ message: 'Login successful', token });
        });
      })
      .catch((error) => res.status(500).json({ message: 'Database error', error }));
  };
  