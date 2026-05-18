const express = require('express');
const { loginVulnerable, loginSecure } = require('../Controllers/authController');

const router = express.Router();

router.post('/login-vulnerable', loginVulnerable);
router.post('/login-secure', loginSecure);

module.exports = router;
