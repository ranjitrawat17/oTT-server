const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    admin: Boolean,
    createdAt: Date,
    updatedAt: Date,
    premium: Boolean
}, { timestamps: true })

module.exports = mongoose.model('Users', userSchema)