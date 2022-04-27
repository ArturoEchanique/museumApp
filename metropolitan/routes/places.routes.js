const router = require("express").Router();
const Places = require('../models/Places.model')

router.get('/createplaces', (req, res, next) => {

    res.render('places/create-places')
})

router.post('/createplaces', (req, res, next) => {
    const { name, lat, long } = req.body

    Places
        .create({ name, lat, long })
        .then(() => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/places', (req, res, next) => {

    res.render('places/places')
})


router.get('/API/places', (req, res) => {

    Places
        .find()
        .then(place => res.json(place))
        .catch(err => res.status(500).json({ message: 'Server error', error: err }))
})

module.exports = router;