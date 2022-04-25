const isLoggedIn = (req, res, next) => {
    !req.session.currentUser ? res.render('user/login', { errorMessage: 'Desautorizado' }) : next()
}

const checkRole = (...rolesToCheck) => (req, res, next) => {
    if (rolesToCheck.includes(req.session.currentUser.role)) {
        next()
    } else {
        res.render('user/login', { errorMessage: 'No tienes permisos' })
    }
}

module.exports = { isLoggedIn, checkRole }