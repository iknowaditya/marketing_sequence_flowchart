const express = require('express');
const { login, register, getUserById, getAllUsers} = require('../controllers/authController.js');
const { validateAuth } = require('../middleware/validationMiddleware.js');
const { authenticateToken } = require('../middleware/authMiddleware.js');

const router = express.Router();

router.post('/login', validateAuth, login);
router.post('/register', validateAuth, register);
router.get('/:id', authenticateToken, getUserById);
router.get('/', authenticateToken, getAllUsers);

module.exports = router; 
