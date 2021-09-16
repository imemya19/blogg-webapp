const mongoose = require('mongoose');


mongoose.connect('mongodb://localhost/fileupload');
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('were connected! to DB');
});

module.exports = db;