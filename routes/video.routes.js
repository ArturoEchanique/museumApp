const router = require("express").Router();
const Artist = require('../models/Artist.model')

const Youtube = require('../services/YoutubeHandler')
const youtube = new Youtube()

// router.get('/video', (req, res, next) => {

//     res.render('video/video')
//     youtube
//         .getSearch('renoir')
//         .then(({ data }) => {
//             let videoId = data.items[0].id.videoId
//             res.render('video/video', { videoId })
//         })
// })

router.get("/api/videos", (req, res, next) => {

    Artist
        .find()
        .then(artists => {
            return artists[Math.floor(Math.random() * artists.length)]
        })
        .then(artist => {
            console.log("el artista es..", artist)
            return youtube.getSearch(artist.name)
        })
        .then(({ data }) => {
            let dataItems = data.items.slice(0, 2)
            let videoIds = []
            dataItems.forEach(dataItem => {
                videoIds.push(dataItem.id.videoId)
            })
            res.json(videoIds)
        })
        .catch(error => next(error))
})


module.exports = router;