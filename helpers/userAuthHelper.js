var exports = module.exports = {}

exports.userAuthenticated = function(req, res, next) {
    try {
        if (req.user) {
            //user is authenticated
            next();
        } else {
            res.redirect('/users/auth/login')
        }
    } catch (error) {

        res.redirect('/users/auth/login')

    }
}