const router = require("express").Router();
const User = require('../models/User.model')

router.get('/users', (req, res, next) => {
    const roleCheck = req.session.currentUser.role === 'ADMIN' || 'MODERATOR'

    User
        .find()
        .then(user => {
            console.log(user)
            res.render('user/users', { user, roleCheck })
        })
        .catch(error => next(error))
})
router.get('/users/:userID', (req, res, next) => {
    const { userID } = req.params
    User
        .findById(userID)
        .then(user => res.render('user/user-detail', user))
        .catch(error => next(error))

})

router.get('/users/:userID/edit', (req, res, next) => {
    const { userID } = req.params

    User
        .findById(userID)
        .then(user => res.render('user/user-edit', user))
        .catch(error => next(error))

})


router.post('/users/:userID/edit', (req, res, next) => {
    const { username, password, email, profileImg } = req.body
    const { userID } = req.params

    User
        .findByIdAndUpdate(userID, { username, password, email, profileImg })
        .then(() => res.redirect('/users'))
        .catch(error => next(error))
})

router.post('/users/:userID/delete', (req, res, next) => {
    const { userID } = req.params

    User
        .findByIdAndRemove(userID)
        .then(() => res.redirect('/users'))
        .catch(error => next(error))
})


module.exports = router;