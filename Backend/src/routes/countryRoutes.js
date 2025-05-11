
const express = require('express');
const { getCountryDetails } = require('../controllers/countryController');

const router = express.Router();


router.get('/:name', getCountryDetails);

module.exports = router;
