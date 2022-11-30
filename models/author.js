// Usually this is the 'singular' version of the router. (our router is named as 'authors.js')

const mongoose = require('mongoose')

const authorSchema = new mongoose.Schema({

    // 1st Column (name), it is a JSON Object and we can set tons of functionalities like, type, required, etc.
    name: {
        type: String,
        required: true
    }

})

// Below 'Author' refers to the table name in the DB.
module.exports = mongoose.model('Author', authorSchema)