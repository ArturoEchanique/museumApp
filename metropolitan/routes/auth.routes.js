const router = require("express").Router();
const User = require('../models/User.model')

const bcrypt = require('bcryptjs')
const saltRounds = 10

router.get('/Register', (req, res, next) => res.render('auth/sing-up'))

router.post('/Register', (req, res, next) => {

    const { username, password, email, profileImg } = req.body

    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({...req.body, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/Login', (req, res, next) => res.render('auth/login'))
router.post('/Login', (req, res, next) => {

    const { username, email, password } = req.body

    User
        .findOne({ email })
        .then(user => {
            if (!user) {
                res.render('auth/login', { errorMessage: 'Email no registrado' })
                return
            } else if (bcrypt.compareSync(password, user.password) === false) {
                res.render('auth/login', { errorMessage: 'La contraseña es incorrecta' })
                return
            } else {
                req.session.currentUser = user
                res.redirect('/')
            }
        })
        .catch(error => next(error))
})

router.post('/LogOUT', (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
})



module.exports = router;