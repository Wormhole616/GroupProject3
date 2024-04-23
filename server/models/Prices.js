const { Schema, model } = require('mongoose');
const dateFormat = require('../utils/dateFormat');


const pricesSchema = new Schema({
    serialNumber: {
        type: String,
        required: true,
        // default: Date.now,
        // get: (timestamp) => dateFormat(timestamp),
    },
   makeAndModel: {
        type: String,
        required: true,
        trim: true,
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

const Prices = model('Prices', pricesSchema);

module.exports = Prices;
