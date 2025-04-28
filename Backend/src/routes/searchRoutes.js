const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');

// Search by country
router.get('/country', searchController.searchByCountry);

// Search by username
router.get('/username', searchController.searchByUsername);

module.exports = router;
