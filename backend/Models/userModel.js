const mongoose = require('mongoose')

const Schema = mongoose.Schema

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    enrolledCourses: [
        {
            title: mongoose.Schema.Types.ObjectId,
            ref: 'Course'
        }
    ]
})

module.exports = mongoose.model('User', UserSchema)