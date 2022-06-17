const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is must!']
    },
    password: {
        type: String,
        required: [true, 'Password is must!']
    }

})

module.exports = mongoose.model('User', userSchema)