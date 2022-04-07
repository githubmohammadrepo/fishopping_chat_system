var express = require('express');
var router = express.Router();
const { User } = require('./../../models/index');
var passport = require('passport');
router.use(passport.session());
var LocalStrategy = require('passport-local');
const { userAuthenticated } = require('./../../helpers/userAuthHelper');
const userController = require('./../../controller/apiController/userController');

passport.serializeUser(function(user, done) {
    console.log('serialize')
    user = (JSON.parse(JSON.stringify(user)))
    user = JSON.stringify(user)
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    console.log('deserialize');
    user = JSON.parse(user);
    console.log('user object')
    console.log(user)
    done(null, user)
        // User.findOne({ where: { id: user.id } })
        //     .then(function(user) {
        //         done(null, user);
        //     }).catch(function(error) {
        //         done(error, null);
        //     })

});

function v(req, res, next) {
    passport.use(new LocalStrategy(
        function(username, password, done) {
            console.log('username')
            console.log(username)
            User.findOne({ where: { username: username } })
                .then(function(user) {

                    if (!user) { return done(null, false); }
                    if (!user.verifyPassword(password)) { console.log('verity error'); return done(null, false); }
                    return done(null, user);
                })
                .catch(function(error) {
                    console.log('error')
                    console.log(error)
                    return done(error)

                })
        }
    ));
    next()
}



router.post('/login/password',
    v,
    userController.post_makeProvinceUserLogin,

    passport.authenticate('local', { failureRedirect: '/users/auth/login' }),
    function(req, res) {
        res.redirect('/users/');
    });


// api user rotues


// show all users
router.get('/', userAuthenticated, userController.get_showAllUsers);

// show register user
router.get('/create', userController.get_createUser);

// post register user
router.post('/', userController.post_registerUser);

// show one user
router.get('/:id', userController.get_showOneUser);

// update user infos
router.put('/:id', userController.put_updateOneUser);

// delete user
router.delete('/:id', userController.delete_deleteOneUser);


router.get('/auth/login', function(req, res, next) {
    res.render('api/user/login')
})
module.exports = router;