const router = require("express").Router();

const User = require('../models/User.model')
const Collection = require('../models/collection.model')
const ArtItem = require('../models/ArtItem.model')
const MetApiHandler = require('../apiHandlers/MetApiHandler')
const metAPI = new MetApiHandler();

const { isLoggedIn, checkRole } = require('../middelware/auth')

let artApiIds = []

router.get('/control-panel', (req, res, next) => {

    res.render("control-panel/control-panel")
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

    artApiIds.forEach(artApiId => {
        ArtItem.findOne({ 'apiId': artApiId })
            .then(item => {
                return item === null ? ArtItem.create({ apiId: artApiId, likes: 0, artGallery: null }) : item
            })
            .then(newArtItem => artItemsList.push(newArtItem.id))
            .catch(err => console.log(err))
    })
    //Magicamente si no harcodeo esto no entran los object id, puede ser porque el array se este 
    //pusheando por referencia o algo asi? Ademas pese a sobreescribirlo, al hacer console log
    //salen los elementos añadidos anteriormente junto con estos nuevos
    artItemsList = ["62684d7f9b533643bb3863d3", "62684d7f9b533643bb3863d5"]
    Collection
        .create({ title, description, bgImage, searchParams, artItemsList })
        .then(() => {
            console.log("los ids que acabamos de meter: ", artItemsList)
            res.redirect(`/collections`)
        })
        .catch(err => console.log(err))
})

module.exports = router