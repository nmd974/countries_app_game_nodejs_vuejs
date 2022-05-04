const express = require('express');
const router = express.Router();
const countries = require('./controller/index');

router.get('/', countries.getAllCountries);
router.get('/country/:code', countries.getCountry);
router.get('/game', countries.getCountriesGame);

module.exports = router;