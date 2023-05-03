const { Schema, model } = require('mongoose')

const UserSchema = new Schema({
    email: {
        type: String,
    },
    password: {
        type: String,
    }
})

const User = model('User', UserSchema)

module.exports = User