// require the library
const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost/Todo_app', { useNewUrlParser: true, useUnifiedTopology: true });

// aquire the connection (to check if it is successful)
const db = mongoose.connection;

// error
db.on('error', function (err) {

    console.log(err.message);

});
// up and running then print the message
db.once('open', function () {
    console.log('Connected to Database');
});

// exporting the database
// module.exports = db;