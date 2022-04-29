const router = require("express").Router();

const Collection = require('../models/Collection.model');
const ArtItem = require('../models/ArtItem.model')
const Comment = require('../models/Comment.model')
const User = require('../models/User.model')
const Artist = require('../models/Artist.model')

const CommentFilter = require('../services/CommentFilter.js')
const commentFilter = new CommentFilter();
const MetApiHandler = require('../services/MetApiHandler')
const metAPI = new MetApiHandler();
const APIHandler = require('../services/MetApiHandler')
const artworkAPI = new APIHandler();
const WikipediaHandler = require('../services/WikiApiHandler')
const wikipediaAPI = new WikipediaHandler();

const { isLoggedIn, checkRole } = require('../middelware/auth')

router.get('/discover', (req, res, next) => {
    let nameArr = []
    const artistData = {}

    //necesitamos una forma de obtener uno de forma aleatoria
    Artist.find()
        .then(artists => {
            const artist = artists[Math.floor(Math.random() * artists.length)]
            artistData.name = artist.name
            nameArr = artist.searchParams.split("-")
            return wikipediaAPI
                .getOneArtist(nameArr)
        })
        .then(({ data }) => {
            const keyID = Object.keys(data.query.pages)
            let textPresentation = data.query.pages[keyID].extract
            textPresentation = textPresentation.replace(/ *\([^)]*\) */g, "")
            artistData.text = textPresentation
            return wikipediaAPI.getArtistImage(nameArr)
        })
        .then(({ artistImage }) => {
            return Collection.findOne({ title: artistData.name }).populate("artItemsList")
        })

        .then(collection => {
            const artApiIds = collection.artItemsList.map(artItem => artItem.apiId)
            const promisesArr = artApiIds.map(id => metAPI.getOneArtwork(id))
            return Promise.all(promisesArr)
        })
        .then(responses => responses.map(elm => elm.data))
        .then(artItems => {
            artistData.artItems = artItems
            res.render('discover', artistData)
        })
        .catch(err => console.log(err))
})

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
    let userId
    req.session.currentUser ? userId = req.session.currentUser._id : userId = undefined
    artItemData.collectionId = collectionId
    artItemData.inCollection = true
    artItemData.toxic = req.query.toxic
    artItemData.message = req.query.message

    ArtItem
        .findOne({ 'apiId': artApiId })
        .populate("comments")
        .then(artItem => {
            artItemData.artItem = artItem
            artItemData.artItem.comments.forEach(comment => {
                if (comment.state == "APPROVED") comment.isApproved = true

            })
            return User.findById(userId)
        })
        .then(user => {
            if (user?.favoriteItems.includes(artItemData.artItem.id)) artItemData.alreadyLiked = true
            else artItemData.alreadyLiked = false
            return artworkAPI.getOneArtwork(artApiId)
        })
        .then(({ data }) => {
            artItemData.apiData = data
            res.render('collections/artwork', artItemData)
        })
        .catch(err => next(err))
})

router.post('/art/:artId/favorite', isLoggedIn, (req, res, next) => {
    const { artId } = req.params
    const { artApiId } = req.body
    const userId = req.session.currentUser._id

    User.findById(userId)
        .then(user => {
            if (!user.favoriteItems.includes(artId)) {
                ArtItem
                    .findByIdAndUpdate(artId, { $inc: { likes: 1 } })
                    .then(artItem => {
                        return User.findByIdAndUpdate(userId, { $push: { favoriteItems: artId } })
                    })
                    .then(user => {
                        res.redirect(`/art/${artApiId}`)
                    })
                    .catch(err => console.log(err))
            } else {
                ArtItem
                    .findByIdAndUpdate(artId, { $inc: { likes: -1 } })
                    .then(artItem => {
                        return User.findByIdAndUpdate(userId, { $pull: { favoriteItems: artId } })
                    })
                    .then(user => {
                        console.log("el usuario actualizado es: ", user)
                        res.redirect(`/art/${artApiId}`)
                    })
                    .catch(err => console.log(err))
            }
        })
})

router.post('/art/:artId/comment', isLoggedIn, (req, res, next) => {
    const { artId } = req.params
    const { comment, collectionId, artApiId } = req.body
    const user = req.session.currentUser
    let toxicComment = false
    let commentState = "PENDANT"
    let modMessage = ""

    commentFilter.filterComment("hello")
        .then((model) => {
            const sentences = [comment];
            return model.classify(sentences)
        })
        .then(predictions => {
            console.log("predictions are ready", predictions)
            predictions.forEach((prediction) => {
                console.log(prediction.results[0].match)
                if (prediction.results[0].match) {
                    modMessage += "Your comment has " + prediction.label
                    console.log("Your comment has ", prediction.label)
                    toxicComment = true
                }
            })
            if (toxicComment) commentState = "REJECTED"
            else {
                commentState = "APPROVED"
                modMessage = "Your comment was approved"
            }
            return Comment.create({ text: comment, owner: user, state: commentState })
        })
        .then(comment => {
            return ArtItem.findByIdAndUpdate(artId, { $push: { comments: comment.id } })
        })
        .then((artItem) => {
            res.redirect(`/collections/${collectionId}/art/${artApiId}?toxic=${toxicComment}&message=${modMessage}`)
        })
})

module.exports = router