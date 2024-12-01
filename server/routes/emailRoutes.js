const express = require('express');
const { scheduleEmail } = require('../controllers/emailController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

// Define routes
router.post('/schedule', authenticateToken, scheduleEmail);

// Export router
module.exports = router;
