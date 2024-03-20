const mongoose = require('mongoose');

const objectSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
    },
    mobile: {
        type: String,
    },
    mail_sent: {
        type: Boolean,
        default: false // Default value indicating the email has not been sent initially
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Mission_life_Users', objectSchema);
