const router = require("express").Router();

const User = require('../models/User.model')
const Collection = require('../models/Collection.model')
const Artist = require('../models/Artist.model')
const ArtItem = require('../models/ArtItem.model')
const MetApiHandler = require('../services/MetApiHandler')
const metAPI = new MetApiHandler();

const { isLoggedIn, checkRole } = require('../middelware/auth')

let artApiIds = []

router.get('/control-panel', (req, res, next) => {

    res.render("control-panel/control-panel")
})

router.get('/create-artist', (req, res, next) => {

    res.render('control-panel/create-artist')
})

router.post('/create-artist', (req, res, next) => {

    const { name, searchParams } = req.body

    Artist
        .create({ name, searchParams })
        .then(artist => {
            res.redirect('/list-artist')
        })
        .catch(error => next(error))

})
router.get('/list-artist/', (req, res, next) => {

    Artist
        .find()
        .then(artists => {
            res.render('control-panel/list-artist', { artists })
        })
        .catch(err => next(error))

})
router.post('/artist/:artistId/delete', (req, res, next) => {

    const { artistId } = req.params

    Artist
        .findByIdAndDelete(artistId)
        .then(() => {
            res.redirect('/list-artist')
        })
        .catch(err => next(error))
})

router.get('/artist/:artistId/edit', (req, res, next) => {

    const { artistId } = req.params

    Artist
        .findById(artistId)
        .then(artist => {
            res.render('control-panel/edit-artist', artist)
        })
        .catch(err => next(error))
})

router.post('/artist/:artistId/edit', (req, res, next) => {

    const { artistId } = req.params
    const { name, searchParams } = req.body

    Artist
        .findByIdAndUpdate(artistId, { name, searchParams }, { new: true })
        .then(() => {
            res.redirect('/list-artist')
        })
        .catch(err => next(error))
})


router.get('/create-collection', (req, res, next) => {

    res.render('control-panel/create-collection')
})

router.post('/generate-collection', (req, res, next) => {
    const { searchParams } = req.body

    metAPI
        .getOneCollection(searchParams)
        .then(({ data }) => {
            artApiIds = data.objectIDs.slice(0, 6)
            const promisesArr = artApiIds.map(id => metAPI.getOneArtwork(id))
            return Promise.all(promisesArr)
        })
        .then(responses => responses.map(elm => elm.data))
        .then(artItemDataArr => {
            console.log("los searchParams son...:", searchParams)
            res.render('control-panel/generate-collection', { artItemDataArr, artApiIds, searchParams })
        })
        .catch(error => next(error))
})

router.post('/create-collection', (req, res, next) => {
    const { title, description, searchParams, bgImage } = req.body
    let artItemsList = []

    Collection
        .create({ title, description, bgImage, searchParams, artItemsList })
        .then(collection => {
            artApiIds.forEach(artApiId => {
                ArtItem.findOne({ 'apiId': artApiId })
                    .then(item => {
                        return item === null ? ArtItem.create({ apiId: artApiId, likes: 0, artGallery: null, comments: [] }) : item
                    })
                    .then(newArtItem => {
                        return Collection.findByIdAndUpdate(collection.id, { $push: { artItemsList: newArtItem.id } })
                    })
                    .catch(err => console.log(err))
            })
            return collection

        })
        .then((collection) => {
            res.redirect(`/collections`)
        })
        .catch(err => console.log(err))
})

module.exports = router

