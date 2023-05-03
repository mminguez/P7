const { Schema, model } = require('mongoose')

const BooksSchema = new Schema({
    title: {
        type: String,
    },
    imageUrl: {
        type: String,
    },
    author: {
        type: String,
    },
    userId: {
        type: String,
    },
    genre: {
        type: String,
    },
    averageRating: {
        type: Number,
    },
    year: {
        type: Number,
    },
    ratings: [
        {
            userId: {
                type: String,
            },
            grade: {
                type: Number,
            }
        }
    ]
})

const Books = model('Books', BooksSchema)

module.exports = Books