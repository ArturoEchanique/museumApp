const router = require("express").Router();
const User = require('../models/User.model')
const bcrypt = require('bcryptjs')
const saltRounds = 10

router.get('/register', (req, res, next) => {
    res.render('auth/sing-up')
})

router.post('/register', (req, res, next) => {
    let newUser = { username, password, email, profileImg } = req.body

    if (profileImg == "") profileImg = "https://painting-planet.com/images2/autorretrato-en-sombrero-de-fieltro-vincent-van_1.jpg"
    bcrypt
        .genSalt(saltRounds)
        .then(salt => bcrypt.hash(password, salt))
        .then(hashedPassword => User.create({ username, password, email, profileImg, password: hashedPassword }))
        .then(createdUser => res.redirect('/'))
        .catch(error => next(error))
})

router.get('/login', (req, res, next) => {
    res.render('auth/login')
})

router.post('/login', (req, res, next) => {
    const { email, password } = req.body

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

router.post('/logout', (req, res, next) => {
    req.session.destroy(() => res.redirect('/login'))
})

module.exports = router;