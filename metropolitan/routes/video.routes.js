const router = require("express").Router();

const Youtube = require('../services/YoutubeHandler')
const youtube = new Youtube()

router.get('/video', (req, res, next) => {

    youtube
        .getSearch('renoir')
        .then(({ data }) => {
            let videoId = data.items[0].id.videoId
            res.render('video/video', { videoId })
        })

    //res.render('video/video', data.items[0].id.videoId))

})


module.exports = router;