const EmailSequence = require('../models/EmailSequence.js');
const EmailJob = require('../models/EmailJob.js');

const createSequence = async (req, res) => {
  try {
    const sequence = new EmailSequence({
      user: req.user.userId,
      ...req.body
    });
    await sequence.save();
    res.status(201).json(sequence);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSequences = async (req, res) => {
  try {
    const sequences = await EmailSequence.find({ user: req.user.userId });
    res.json(sequences);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Export the functions using CommonJS syntax
module.exports = { createSequence, getSequences };
