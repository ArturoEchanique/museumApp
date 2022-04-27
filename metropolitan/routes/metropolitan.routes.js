const router = require("express").Router();

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

const { isLoggedIn, checkRole } = require('../middelware/auth')

router.get('/discover', (req, res, next) => {
    let nameArr = []
    const artistData = {}

    //necesitamos una forma de obtener uno de forma aleatoria
    Artist.findOne()
        .then(artist => {
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
        .then(({ data }) => {
            // artistData.image = data.query.pages.thumbnail.source
            console.log("la data es...:", data)
            res.render('discover', artistData)
        })
    
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
    const userId = req.session.currentUser._id
    artItemData.collectionId = collectionId
    artItemData.inCollection = true

    ArtItem
        .findOne({ 'apiId': artApiId })
        .populate("comments")
        .then(artItem => {
            artItemData.artItem = artItem
            return User.findById(userId)
        })
        .then(user => {
            if (user.favoriteItems.includes(artItemData.artItem.id)) artItemData.alreadyLiked = true
            else artItemData.alreadyLiked = false
            return artworkAPI.getOneArtwork(artApiId)
        })
        .then(({ data }) => {
            artItemData.apiData = data
            res.render('collections/artwork', artItemData)
        })
        .catch(err => console.log(err))
})

// router.get('/art/:artApiId', (req, res, next) => {
//     const { artApiId, collectionId } = req.params
//     const artItemData = {}
//     const userId = req.session.currentUser._id
//     artItemData.inCollection = false

//     ArtItem
//         .findOne({ 'apiId': artApiId })
//         .then(artItem => {
//             artItemData.artItem = artItem
//             return User.findById(userId)
//         })
//         .then(user => {
//             if (user.favoriteItems.includes(artItemData.artItem.id)) artItemData.alreadyLiked = true
//             else artItemData.alreadyLiked = false
//             return artworkAPI.getOneArtwork(artApiId)
//         })
//         .then(({ data }) => {
//             artItemData.apiData = data
//             res.render('collections/artwork', artItemData)
//         })
//         .catch(err => console.log(err))
// })

router.post('/art/:artId/favorite', isLoggedIn, (req, res, next) => {
    const { artId } = req.params
    const { artApiId } = req.body
    const userId = req.session.currentUser._id

    User.findById(userId)
        .then(user => {
            if (!user.favoriteItems.includes(artId)) {
                ArtItem
                    .findByIdAndUpdate(artId, { $inc: { likes: 1 } })
                    // .then(art => console.log("el art item es", art))
                    .then(artItem => {
                        return User.findByIdAndUpdate(userId, { $push: { favoriteItems: artId } })
                    })
                    .then(user => {
                        res.redirect(`/art/${artApiId}`)
                    })
                    .catch(err => console.log(err))
            }
            else {
                ArtItem
                    .findByIdAndUpdate(artId, { $inc: { likes: -1 } })
                    // .then(art => console.log("el art item es", art))
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
    console.log("commenting ", req.body.comment)
    Comment
        .create({ text: comment, owner: user, state: "PENDANT" })
        .then(comment => {
            return ArtItem.findByIdAndUpdate(artId, { $push: { comments: comment.id } })
        })
        .then((artItem) => {
            res.redirect(`/collections/${collectionId}/art/${artApiId}`)
        })
})

module.exports = router