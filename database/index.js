const mongoose = require("mongoose")

// mongoose.connect("mongodb://paulocardosob:12345678987654321@ds235840.mlab.com:35840/cineflixsmd")
mongoose.connect("mongodb://localhost:27017/cineFlix");
mongoose.Promise = global.Promise

module.exports = mongoose