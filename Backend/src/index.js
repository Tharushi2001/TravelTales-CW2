const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); 
const cookieParser = require('cookie-parser'); 
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const searchRoutes = require('./routes/searchRoutes');
const followRoutes = require('./routes/followRoutes');
const countryRoutes = require('./routes/countryRoutes'); 

const app = express();

// CORS configuration
app.use(cors({
  origin: 'http://localhost:3000', 
  methods: 'GET, POST, PUT, DELETE',  
    credentials: true  
}));

app.use(cookieParser()); // Add cookie-parser as middleware

// Body parser middleware to parse incoming JSON requests
app.use(bodyParser.json());

// API routes
app.use('/api/auth', authRoutes); 
app.use('/api/blogs', blogRoutes); 
app.use('/api/search', searchRoutes);
app.use('/api/follow', followRoutes);
app.use('/api/country', countryRoutes);


// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
