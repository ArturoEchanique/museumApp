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
  const { collectionId } = req.params
  Collection
    .findOne()
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
      res.render("index", collectionData)
    })
    .catch(err => next(err))
  // ArtItem
  //   .find()
  //   .then(artItems)
  res.render("index")
})

module.exports = router;