const router = require("express").Router();

router.get('/', (req, res, next) => {
    const roleCheck = req.session.currentUser.role === 'ADMIN' || 'MODERATOR'

    res.render("testView")
    // User
    //     .find()
    //     .then(user => {
    //         console.log(user)
    //         res.render('user/users', { user, roleCheck })
    //     })
    //     .catch(error => next(error))
})

module.exports = router;