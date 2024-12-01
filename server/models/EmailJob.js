const mongoose = require('mongoose');

const emailJobSchema = new mongoose.Schema({
  sequence: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'EmailSequence',
    required: true
  },
  status: {
    type: String,
    enum: ['pending', 'completed', 'failed'],
    default: 'pending'
  },
  scheduledFor: Date,
  emailData: {
    to: String,
    subject: String,
    content: String
  },
  error: String
}, { timestamps: true });

// Export the model using CommonJS syntax
module.exports = mongoose.model('EmailJob', emailJobSchema);
