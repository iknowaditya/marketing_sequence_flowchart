const mongoose = require('mongoose');

const emailSequenceSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  nodes: [{
    id: String,
    type: String,
    position: {
      x: Number,
      y: Number
    },
    data: mongoose.Schema.Types.Mixed
  }],
  edges: [{
    id: String,
    source: String,
    target: String
  }]
}, { timestamps: true });

// Export the model using CommonJS syntax
module.exports = mongoose.model('EmailSequence', emailSequenceSchema);
