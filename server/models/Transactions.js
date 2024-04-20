const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const transactionSchema = new Schema({
  transaction: {
    type: String,
    required: true,
    id: true,
  },
  quantitySold: {
    // whole number
    type: Number,
    integer: true,
    required: true,

  },
  transactionTotal: {
    type: Number,
    required: true,
    _id: true,
  },

  paymentType: {
    type: String,
    required: true,
    trim: true,
    _id: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'Users',
  },
  Notes: {
    type: String,
    required: true,
    minlength: 1,
    maxlength: 280,
  },

});

const Transactions = model('Transactions', transactionSchema);

module.exports = Transactions;
