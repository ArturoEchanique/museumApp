const router = require("express").Router();
const ArtGallery = require('../models/ArtGallery')

router.get('/create-places', (req, res, next) => {

    res.render('places/create-places')
})

router.post('/create-places', (req, res, next) => {
    const { name, lat, long, description } = req.body

    ArtGallery
        .create({ name, lat, long, description })
        .then(() => res.redirect('/places'))
        .catch(error => next(error))
})

router.get('/places', (req, res, next) => {

    res.render('places/places')
})


router.get('/API/places', (req, res) => {

    ArtGallery
        .find()
        .then(place => res.json(place))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }))
})

module.exports = router;