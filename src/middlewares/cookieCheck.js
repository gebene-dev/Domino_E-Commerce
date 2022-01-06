module.exports = (req, res, next) => {
    if (req.cookies.dominoCookie){
        req.session.userLogin = req.cookies.dominoCookie
    }
    next();
}
