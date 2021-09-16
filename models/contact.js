const mongoose = require('mongoose');


const ContactSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: Number,
        required: true,
    },
}, {
    timestamp: true,
});

const Contact = mongoose.model('Contact', ContactSchema);

module.exports = Contact;