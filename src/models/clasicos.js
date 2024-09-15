const mongoose = require('mongoose');
const { options } = require('../app/router');

const clasicosSchema = new mongoose.Schema({
  name: { String, required: true },
  description: { Array, required: true },
  options: {
    proteina: { Array, required: true },
    sazon: { Array, required: true },
  },
  price: { Number, required: true },
});
