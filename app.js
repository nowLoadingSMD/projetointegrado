var express = require("express")
var path = require('path');
var fileUpload = require("express-fileupload")
var bodyParser = require("body-parser")

var port = process.env.PORT || 3000;

var app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(fileUpload())

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public/img/videoImg')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//Require Routes
require("./routes/index.js")(app)

//Require Controllers
require("./controllers/authController")(app)
require("./controllers/videoController")(app)
require("./controllers/userController")(app)
require("./controllers/tagController")(app)
require("./controllers/genreController")(app)
require("./controllers/productionInfoController")(app)
require("./controllers/commentController")(app)

app.listen(port)

//HUEEEE

console.log("Server Running on port 3000....")