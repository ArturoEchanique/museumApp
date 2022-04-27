const isLoggedIn = (req, res, next) => {
    !req.session.currentUser ? res.render('auth/login', { errorMessage: 'No has inicado sesion' }) : next()
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('auth/login', { errorMessage: 'No tienes permisos' })
    }
}


module.exports = { isLoggedIn, checkRole }