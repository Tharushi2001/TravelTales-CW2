const axios = require('axios');

const getCountryDetails = async (req, res) => {
  const countryName = req.params.name;

  try {
    const response = await axios.get(`https://restcountries.com/v3.1/name/${countryName}`);
    const country = response.data[0];

    const countryDetails = {
      name: country.name.common,
      flag: country.flags && country.flags.png ? country.flags.png : 'Not available',
      capital: country.capital ? country.capital[0] : 'Not available',
      currency: country.currencies
        ? Object.values(country.currencies)[0].name
        : 'Not available',
    };

    res.json(countryDetails);
  } catch (error) {
    console.error('Error fetching country data:', error.message);
    res.status(500).json({ error: 'Failed to fetch country data' });
  }
};

module.exports = {
  getCountryDetails
};
