const express = require('express');
const router = express.Router();
const CompanyController = require('../controllers/company');

router.get('/', CompanyController.getCompanies);

module.exports = router;