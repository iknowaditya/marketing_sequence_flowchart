const express = require('express');
const { createSequence, getSequences } = require('../controllers/sequenceController.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');
const { validateSequence } = require('../middleware/validationMiddleware.js');

const router = express.Router();

// Define routes
router.post('/', authenticateToken, validateSequence, createSequence);
router.get('/', authenticateToken, getSequences);

// Export the router using CommonJS syntax
module.exports = router;
