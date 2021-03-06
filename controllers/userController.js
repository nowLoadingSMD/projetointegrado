const express = require("express")
const router = express.Router()

const User = require("../models/User")

router.post("/addToFavorite", (req, res) => {
    
    User.findById(req.body.userID, (err, user) => {
        if (err) throw err

        console.log(user)

        const found = user.favorites.indexOf(req.body.videoID)

        if (found != -1) {
            User.update(
                { _id: req.body.userID},
                { $pull: { favorites: req.body.videoID} },
                (err, sucess) => {
                    if (err) {
                        res.json({err: "Problema ao adicionar aos favoritos"})
                    }
                    
                    res.json({favorited: false})
                }
            )
        } else {
            User.update(
                { _id: req.body.userID},
                { $addToSet: { favorites: req.body.videoID} },
                (err, sucess) => {
                    if (err) {
                        res.send({err: "Problema ao adicionar aos favoritos"})
                    }
                    
                    res.json({favorited: true})
                }
            )
        }
    })
})

router.post("/addToWatchlist", (req, res) => {

    User.findById(req.body.userID, (err, user) => {
        if (err) throw err

        console.log(user)

        const found = user.watchList.indexOf(req.body.videoID)

        if (found != -1) {
            User.update(
                { _id: req.body.userID},
                { $pull: { watchList: req.body.videoID} },
                (err, sucess) => {
                    if (err) {
                        res.json({err: "Problema ao adicionar a watchlist"})
                    }
                    
                    res.json({addedToWatchList: false})
                }
            )
        } else {
            User.update(
                { _id: req.body.userID},
                { $addToSet: { watchList: req.body.videoID} },
                (err, sucess) => {
                    if (err) {
                        res.send({err: "Problema ao adicionar a watchlist"})
                    }
                    
                    res.json({addedToWatchList: true})
                }
            )
        }
    })

})

router.get("/getWatchList", (req, res) => {

    const userID = req.query.id

    console.log(userID);

    User.findById(userID, (err, user) => {
        res.json({ watchList: user.watchList})
    })

}) 

router.get("/setIsProducer", (req, res) => {
    
    const id = req.query.id

    User.findByIdAndUpdate(id, { isProducer: true }, {new: true}, (err, user) => {
        if (err) return res.status(500).send(err)

        return res.json({err: null}) 
    })
})

module.exports = (app) => app.use("/api/user", router) 