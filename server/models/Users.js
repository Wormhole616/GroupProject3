const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    ID: true,
  },

  email: {
    type: String,
    required: true,
    unique: true,
    match: [/.+@.+\..+/, 'Must match an email address!'],

  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    superSecure: true,

  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  transactions: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Transactions',
    }
  ],
  pickups: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Pickups',
    }
  ],

  prices: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Prices',
    }
  ],
  


  documents: [
    {
      documentText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: 280,
      },

    },
  ],

  createdAt: {
    type: Date,
    default: Date.now,
    get: (timestamp) => dateFormat(timestamp),
  },

});

const Users = model('Users', userSchema);



module.exports = Users;
