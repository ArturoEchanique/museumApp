const router = require("express").Router();

const Collection = require('../models/Collection.model');
const ArtItem = require('../models/ArtItem.model')
const User = require('../models/User.model')

const MetApiHandler = require('../services/MetApiHandler')
const metAPI = new MetApiHandler();
const APIHandler = require('../services/MetApiHandler')
const artworkAPI = new APIHandler();

router.get('/collections', (req, res, next) => {

    Collection
        .find()
        .then(collections => {
            res.render('collections/collections', { collections })
        })
        .catch(err => console.log(err))

})

router.get('/collections/:collectionId', (req, res, next) => {
    const collectionData = {}
    const { collectionId } = req.params

    Collection
        .findById(collectionId)
        .populate("artItemsList")
        .then(collection => {
            collectionData.collection = collection
            const artApiIds = collection.artItemsList.map(artItem => artItem.apiId)
            const promisesArr = artApiIds.map(id => metAPI.getOneArtwork(id))
            return Promise.all(promisesArr)
        })
        .then(responses => responses.map(elm => elm.data))
        .then(artItems => {
            collectionData.artItems = artItems
            res.render('collections/collection', collectionData)
        })
        .catch(err => console.log(err))
})

router.get('/collections/:collectionId/art/:artApiId', (req, res, next) => {
    const { artApiId, collectionId } = req.params
    const artItemData = {}
    artItemData.collectionId = collectionId
    artItemData.inCollection = true

    ArtItem
        .findOne({ 'apiId': artApiId })
        .then(artItem => {
            artItemData.artItem = artItem
            return artworkAPI.getOneArtwork(artApiId)
        })
        .then(({ data }) => {
            artItemData.apiData = data
            console.log(artItemData)
            res.render('collections/artwork', artItemData)
        })
        .catch(err => console.log(err))
})

router.get('/art/:artApiId', (req, res, next) => {
    const { artApiId, collectionId } = req.params
    const artItemData = {}
    artItemData.inCollection = false

    ArtItem
        .findOne({ 'apiId': artApiId })
        .then(artItem => {
            artItemData.artItem = artItem
            return artworkAPI.getOneArtwork(artApiId)
        })
        .then(({ data }) => {
            artItemData.apiData = data
            console.log(artItemData)
            res.render('collections/artwork', artItemData)
        })
        .catch(err => console.log(err))
})


router.post('/art/:artId/favorite', (req, res, next) => {
    const { artId } = req.params
    const { artApiId } = req.body

    ArtItem
        .findByIdAndUpdate(artId, { $inc: { likes: 1 } })
        .then(artItem => {
            res.redirect(`/art/${artApiId}`)
        })
        .catch(err => console.log(err))
})

module.exports = router