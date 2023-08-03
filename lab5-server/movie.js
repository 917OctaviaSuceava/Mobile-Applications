const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema(
    {
        id: {
            type: String,
            unique: true,
            required: true

        },
        title: {
            type: String,
            required: true
        },
        description: {
            type: String,
            required: true
        },
        duration: {
            type: String,
            required: true
        },
        datetime: {
            type: String,
            required: true
        }, 
        actors: {
            type: String,
            required: true
        }
    }
)

mongoose.model('Movie', movieSchema);