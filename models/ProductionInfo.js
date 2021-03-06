const mongoose = require("mongoose")
const Schema = mongoose.Schema

const ProductionInfoSchema = mongoose.Schema({
    videoID: {
        type: Schema.Types.ObjectId, ref: 'Video',
        required: true
    },
    description: {
        type: String,
        required: true
    },
    classification: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    colaborative: {
        type: Boolean,
        required: true
    },
    colaborativeList: {
        type: String
    },
    tags: [
        {
            type: Schema.Types.ObjectId, ref: 'Tag'
        }
    ],
    genre: {
           type: Schema.Types.ObjectId, ref: 'Genre' 
    },
    directors: [ 
        {
            type: String
        }
    ],
    script: [
        {
            type: String
        }
    ],
    photograph: [
        {
            type: String
        }
    ],
    artDirection: [
        {
            type: String
        }
    ],
    production: [
        {
            type: String
        }
    ],
    sound: [
        {
            type: String
        }
    ],
    editing: [
        {
            type: String
        }
    ],
    cast: [
        {
            type: String
        }
    ]
})

const ProductionInfo = mongoose.model("ProductionInfo", ProductionInfoSchema)

module.exports = ProductionInfo