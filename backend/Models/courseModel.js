const mongoose = require('mongoose')

const Schema = mongoose.Schema

const CourseSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    instructor: {
        type: String,
        required: true
    },
    lessons: [
        {
            title: String,
            content: String
        },
    ],
})

module.exports= mongoose.model('Course', CourseSchema)