const Collection = require('../models/Collection.model');
const ArtItem = require('../models/ArtItem.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Artist = require('../models/Artist.model')

const MetApiHandler = require('../services/MetApiHandler')
const metAPI = new MetApiHandler();
const APIHandler = require('../services/MetApiHandler')
const artworkAPI = new APIHandler();
const WikipediaHandler = require('../services/WikiApiHandler')
const wikipediaAPI = new WikipediaHandler();

const router = require("express").Router();

router.get("/", (req, res, next) => {
    const collectionData = {}
    collectionData.artItems = []
    const { collectionId } = req.params
    Collection
        .findOne()
        .populate("artItemsList")
        .then(collection => {
            collectionData.collection = collection
            let artApiIds = collection.artItemsList.map(artItem => artItem.apiId)
            let maxItemsToSlice = artApiIds.length
            if (maxItemsToSlice % 2 == 1) maxItemsToSlice -= 1
            artApiIds = artApiIds.slice(0, maxItemsToSlice)
            const promisesArr = artApiIds.map(id => metAPI.getOneArtwork(id))
            return Promise.all(promisesArr)
        })
        .then(responses => responses.map(elm => elm.data))
        .then(artApiItems => {
            collectionData.artApiItems = artApiItems
            const promisesArr = artApiItems.map(artApiItem => ArtItem.findOne({ apiId: artApiItem.objectID }).populate("comments"))
            return Promise.all(promisesArr)
        })
        .then(artItems => {
            console.log("el objeto es..", artItems)
            collectionData.artItems = artItems
                // console.log("ESTO---------------------", collectionData.artItems[0].apiId)
            res.render("index", collectionData)
        })
        .catch(err => next(err))
})

module.exports = router;