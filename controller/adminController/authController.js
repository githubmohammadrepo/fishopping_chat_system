var exports = module.exports = {}

exports.get_login = function(req, res) {
    res.render('admin/auth/login', {})
}

exports.post_login = function(req, res) {
    res.send('post login')
}


exports.get_register = function(req, res) {
    res.render('admin/auth/register', { csrfToken: req.csrfToken() })
}

exports.post_register = function(req, res) {

    //user body validation with joi


    //get admin role

    //register user with insert role
}