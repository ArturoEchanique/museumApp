const router = require("express").Router();
const User = require('../models/User.model')
const APIHandler = require('../apiHandlers/MetApiHandler')
const Collection = require('../models/collection.model');
const { collection } = require("../models/User.model");

const MetApiHandler = require('../apiHandlers/MetApiHandler')
const metAPI = new MetApiHandler();

const ArtItem = require('../models/ArtItem.model')

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

//uso artApiId porque al abrir la coleccion se vuelve a llamar a la Api, y no se envia el documento
//artItem a la vista. Ahora con el apiId si obtengo el id del artItem de mongoose
router.get('/art/:artApiId', (req, res, next) => {
    const { artApiId } = req.params

    const artItemData = {}
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

module.exports = router