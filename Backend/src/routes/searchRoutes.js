const express = require('express');
const router = express.Router();
const searchController = require('../controllers/searchController');


router.get('/country', searchController.searchByCountry);

router.get('/username', searchController.searchByUsername);

module.exports = router;
