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

artwuro


ArtItem
.find()
.then(artItems)
router.get("/", (req, res, next) => {
  res.render("index")
})

module.exports = router;