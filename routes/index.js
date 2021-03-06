var express = require('express');
var router = express.Router();

const GenreEnum = require("../config/genreEnum")

const Tag = require("../models/Tag")
const User = require("../models/User")
const Video = require("../models/Video")
const ProductionInfo = require("../models/ProductionInfo")

/* GET home page. */
router.get('/pages/home.html', async function(req, res, next) {

  let d = new Date()

  d.setDate(d.getDate() - 30)

  await Video
    .find({ "created_on": d.getDate })
    .where({ "private": { $ne : true } })
    .limit(6)
    .exec ( async (err, result) => {

      let resultReleases = result

      await Video
        .find({ "quantityOfViewLastWeek": 0 })
        .where({ "private": { $ne : true } })
        .limit(6)
        .exec( (err, result) => {

          if (err) res.send({err: "Problema ao renderizar página"})

          Video.find({ "private" : true })
          .limit(3)
          .exec( (err, onExibition) => {

            if (err) res.send({err: "Problema ao renderizar página"})

            res.render('pages/home', {
              onExibitionList: onExibition,
              releasesList: resultReleases,
              recommendedList: result
            });

          })
        })
    })

});

router.get("/pages/about.html", function(req,res, next) {
  res.render('pages/about');
})

router.get("/pages/authors.html", function(req,res, next) {
  res.render('pages/authors');
})

router.get("/pages/browse.html", function(req,res, next) {
  res.render('pages/browse');
})

router.get("/pages/editProfile.html", function(req,res, next) {
  res.render('pages/editProfile');
})

router.get("/pages/editPortfolio.html", function(req,res, next) {
  res.render('pages/editPortfolio');
})

router.get("/pages/favorites.html", function(req,res, next) {
  res.render('pages/favorites');
})

router.get("/pages/genre.html", function(req,res, next) {
  const genreName = req.query.genre

  const id = GenreEnum[genreName]

  ProductionInfo.find({"genre": id })
    .populate("videoID")
    .populate("genre")
    .exec( (err, productionInfo) => {

      const videos = productionInfo.map( item => item.videoID)
      console.log(videos)
      res.render('pages/genre', {
        genre: genreName,
        videos: videos
      });

    })
})

router.get("/pages/login.html", function(req, res, next) {
  res.render('pages/login');
})

router.get("/pages/player.html", function(req,res, next) {

  var id = req.query.id

  if (!id) {

    res.send({err: "Identificador de vídeo não fornecido"})
    
  } else {

    Video.findById(id, (err, video) => {

      ProductionInfo
        .find({"videoID": video._id})
        .populate("genre")
        .exec( (err, productionInfo) => {
          console.log(productionInfo)
          res.render('pages/player', {
                                      video: video,
                                      productionInfo: productionInfo[0]
                                      });
        })
    })

  }

})

router.get("/pages/portfolio.html", function(req,res, next) {
  res.render('pages/portfolio');
})

router.get("/pages/profile.html", function(req,res, next) {
  const userID = req.query.id
  
  if (!userID) {
    res.send({err: "Identificador de usuário não fornecido"})
  } else {
    User
    .findById(userID)
    .populate("watchList")
    .exec( (err, user) => {
      user.password = null

      console.log(user)
      
      Video
        .find({producerID: userID})
        .limit(6)
        .exec( (err, videos) => {
          res.render('pages/profile', {user: user, videosPosted: videos});
        })
    })
  }
})

router.get("/pages/profileGeneral.html", function(req,res, next) {
  const userID = req.query.id
  
  if (!userID) {
    res.send({err: "Identificador de usuário não fornecido"})
  } else {
    User
    .findById(userID)
    .populate("favorites")
    .exec( (err, user) => {
      user.password = null

      console.log(user)
      
      Video
        .find({producerID: userID})
        .limit(6)
        .exec( (err, videos) => {
          res.render('pages/profileGeneral', {user: user, videosPosted: videos});
        })
    })
  }
})


router.get("/pages/recommended.html", function(req,res, next) {
  
  let d = new Date()
  Video
    .find({"created_on": d.getDate })
    .where({ "private": { $ne : true } })
    .exec( (err, result) => {
      res.render('pages/recommended', {recommendedList: result});
    })

})

router.get("/pages/releases.html", function(req,res, next) {

  let d = new Date()
  Video
    .find({"created_on": d.getDate })
    .where({ "private": { $ne : true } })
    .exec( (err, result) => {
      res.render('pages/releases', {releasesList: result});
    })

}) 

router.get("/pages/signUp.html", function(req, res, next) {
  res.render('pages/signUp')
})

router.get("/pages/search.html", function(req, res, next) {
  const term = req.query.term

  Video.find(
    { "name": { "$regex": term, "$options": "i" } },
    function(err, videos) {
          res.render('pages/search', { term: term, result: videos })      
    }
  )
  
})

router.get("/pages/tag.html", function(req,res, next) {

  let tags = []

  if (req.query.tags.split(",").length >= 1) {
    tags = req.query.tags.split(",")
    tags.pop(tags[tags.length - 1])
  } else {
    tags.push(req.query.tags)
  }

  Tag.find({'name': { $in: tags } }, function(err, data){

    const tagsID = data.map((item) => item._id)

    ProductionInfo.find({ 'tags': { $all: tagsID } }).populate("videoID").exec((err, prodInfo) => {

      const moviesArr = prodInfo.map((item) => item.videoID)

      res.render('pages/tag', { movies: moviesArr, tags: tags });
    })

  })

})

router.get("/pages/uploadedFilms.html", function(req,res, next) {

  Video
    .find({producerID: req.query.id})
    .exec( (err, videos) => {
      res.render("pages/uploadedFilms", {uploadedFilms: videos})
    })
})

router.get("/pages/watchList.html", function(req,res, next) {
  
  User.findById(req.query.id)
      .populate("watchList")
      .exec( (err, user) => {
        
        if (err) {
          console.log(err)
          res.send(500).json({Error: "Erro Interno"})
        } else {
          res.render('pages/watchList', { watchList: user.watchList });
        }
      }) 
  
})

router.get("/pages/upload.html", function(req,res, next) {
  res.render('pages/upload');
})

module.exports = (app) => app.use("/", router) 
