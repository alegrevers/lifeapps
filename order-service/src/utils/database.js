require('dotenv').config()
const mongoose = require('mongoose');

const database = mongoose.connect(process.env.DATABASE_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports = database