const mongoose = require('mongoose');

const objectSchema =  new mongoose.Schema({
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    mobile: {
      type: String,
      required: true,
    },
    
  });
module.exports = mongoose.model('Users', objectSchema);