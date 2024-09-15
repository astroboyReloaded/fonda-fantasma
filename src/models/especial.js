const mongoose = require('mongoose');

const especialSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: [String],
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  availability: {
    type: Number,
    required: true,
  },
  showAvailability: {
    type: Boolean,
    required: true,
  },
});

module.exports = mongoose.model('Especial', especialSchema);
