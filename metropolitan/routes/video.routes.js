const router = require("express").Router();

const Youtube = require('../services/YoutubeHandler')
const youtube = new Youtube()

router.get('/video', (req, res, next) => {

    res.render('video/video')
    // youtube
    //     .getSearch('renoir')
    //     .then(({ data }) => {
    //         let videoId = data.items[0].id.videoId
    //         res.render('video/video', { videoId })
    //     })
})

router.get("/api/videos", (req, res) => {

    youtube
        .getSearch('renoir')
        .then(({ data }) => {
            let dataItems = data.items.slice(0, 2)
            let videoIds = []
            dataItems.forEach(dataItem =>{
                 videoIds.push(dataItem.id.videoId)
             })
            res.json(videoIds)
            
        })
})


module.exports = router;