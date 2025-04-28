const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // Import CORS
const cookieParser = require('cookie-parser'); // Import cookie-parser
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', // Your frontend URL
  methods: 'GET, POST, PUT, DELETE',  // Allowed HTTP methods
    credentials: true  // Allow credentials (cookies) to be sent
}));

// Middleware to parse cookies
app.use(cookieParser()); // Add cookie-parser as middleware

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes); // Auth routes for user login, register, logout
app.use('/api/blogs', blogRoutes); // Blog routes for your blog-related API

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
