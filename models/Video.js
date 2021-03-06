const mongoose = require("../database")
const Schema = mongoose.Schema

const VideoSchema = mongoose.Schema({
    name: {
      type: String,
      required: true  
    },
    thumbnailHorizontalPath: {
        type: String,
        required: true,
        lowercase: true
    },
    thumbnailVerticalPath: {
        type: String,
        required: true,
        lowercase: true
    },
    path: {
        type: String,
        required: true,
        lowercase: true
    },
    producerID: {
        type: Schema.Types.ObjectId, ref: 'User',
        required: true
    },
    quantityOfApplauses: {
        type: Number,
        required: true
    },
    // productionInfoID: {
    //     type: Schema.Types.ObjectId, ref: 'ProdutionInfo',
    //     required: true
    // },
    onExposition: {
        type: Boolean,
        required: true
    },
    quantityOfView: {
        type: Number, 
        required: true
    },
    quantityOfViewLastWeek: {
        type: Number,
        required: true
    },
    private: {
        type: Boolean,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const Video = mongoose.model("Video", VideoSchema)

Video.addVideo = (video, callback) => {
    Video.create(video, callback)
}

Video.getVideos = (callback, limit) => {
    Video.find(callback).limit(limit)
}

Video.getRecommendations = () => {

}

Video.getRecents = () => {

}

Video.getVideoByID = () => {
    
}

Video.getVideosByTagID = () => {

}

Video.getVideosByGenreID = () => {

}

Video.getVideosByProducerID = () => {

}

Video.setApplauses = (videoID, quantityOfApplauses) => {

}

module.exports = Video