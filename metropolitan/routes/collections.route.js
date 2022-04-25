const router = require("express").Router();
const User = require('../models/User.model')
//const axios = require('axios')


router.get('/collections', (req, res, next) => {

    res.render('collections/create-collection')
})

router.post('/collections', (req, res, next) => {

    const { searchParam } = req.body


})











module.exports = router