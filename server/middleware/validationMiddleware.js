const { check, validationResult } = require('express-validator');

const validateAuth = [
  check('email').isEmail().normalizeEmail(),
  check('password').isLength({ min: 6 }),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

const validateSequence = [
  check('nodes').isArray(),
  check('edges').isArray(),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  }
];

// Export the validation middleware
module.exports = { validateAuth, validateSequence };
