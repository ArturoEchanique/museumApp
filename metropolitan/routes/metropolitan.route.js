const router = require("express").Router();
const User = require('../models/User.model')
const APIHandler = require('../public/js/APIHandler')
const Collection = require('../models/collection.model')

const artworkAPI = new APIHandler();

router.get('/collections', (req, res, next) => {

    res.render('collections/create-collection')
})

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
        .catch(err => console.log(err))


})



router.get('/art/:artId', (req, res, next) => {
    const { id } = req.params
    artworkAPI.getOneArtwork(id)
        .then(({ data }) => {

            res.render('collections/artwork', data)
        })

})

module.exports = router