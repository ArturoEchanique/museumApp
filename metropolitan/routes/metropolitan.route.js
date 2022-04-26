const router = require("express").Router();
const User = require('../models/User.model')
const APIHandler = require('../public/js/APIHandler')
const Collection = require('../models/collection.model')
const ArtItem = require('../models/ArtItem.model')

const artworkAPI = new APIHandler();

router.get('/collections', (req, res, next) => res.render('collections/create-collection'))

router.post('/collections', (req, res, next) => {

    const { searchParam } = req.body
    let result = []
    artworkAPI
        .getOneCollection(searchParam)
        .then(({ data }) => {

            const selected = data.objectIDs.slice(0, 2)
            const promisesArr = selected.map(id => artworkAPI.getOneArtwork(id))

            return Promise.all(promisesArr)
        })
        .then(responses => responses.map(elm => elm.data))
        //.then(dataArray => console.log('ARRAY CON SOLO LOS DATOS DE LA PROMESA', dataArray))
        .then(dataArray => res.render('collections/item-collection', { dataArray }))

    .catch(err => console.log('NUESTRO ERROR', err))
})

router.post('/create-collection', (req, res, next) => {

    const { title, description, dataArray } = req.body

    Collection
        .create({ title, description, rating, author })
        .then(newBook => {
            res.redirect(`/libros/detalles/${newBook._id}`)
        })
        .catch(err => next(err))


})

router.get('/art/:artID', (req, res, next) => {

    const { artID } = req.params
    let artItemData = {}
    ArtItem.findById(artID)
        //     .then(Item => {
        //         artItemData.dbData = Item
        //         return artworkAPI.getOneArtwork(Item.apiId)
        //     })
        //     .then(({ apiData }) => {
        //         artItemData.apiData = apiData
        //         res.render('collections/artwork', artItemData)
        //     })
        // res.send("hola")

})

router.get('/createItem', (req, res, next) => {
    res.render('collections/create-art')
})

router.post('/createItem', (req, res, next) => {
    const { apiId, likes } = req.body
    ArtItem
        .create({ apiId, likes })
        .then(() => res.redirect('/art'))
        .catch(err => next(err))

})


router.get('/art', (req, res, next) => {
    ArtItem
        .find()
        .then(item => {
            item.forEach(elm => {
                const promisesArr = artworkAPI.getOneArtwork(elm.apiId)
                console.log(promisesArr)

                // return Promise.all(promisesArr)
            })
        })

    //.then(responses => responses.map(elm => elm.item))
    // console.log(item.apiId)


})

module.exports = router