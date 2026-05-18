const express = require('express');
const { getDashboardData } = require('../Controllers/dashboardController');

const router = express.Router();

router.get('/data', getDashboardData);

module.exports = router;
