var express = require('express');
var router = express.Router();
var csrf = require('csurf');
const bodyParser = require('body-parser');
const { adminAuthenticated } = require('./../../helpers/adminAuthHelper');
var passport = require('passport');
router.use(passport.session());
var LocalStrategy = require('passport-local');
    // setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


var passport = require('passport'),
    OpenIDStrategy = require('passport-openid').Strategy;
var groupController = require('../../controller/adminController/groupController');


//show all groups
router.get('/',adminAuthenticated, csrfProtection, groupController.get_showAllGroups);

// // show form for create new group
router.get('/create',adminAuthenticated, csrfProtection, groupController.get_createNewGroup);

// //post create new grup
router.post('/',adminAuthenticated, parseForm, csrfProtection, groupController.post_createNewGroup);

// //show one group
router.get('/:id',adminAuthenticated, csrfProtection, groupController.get_showOneGroup);


// // put- update one group

router.put('/:id',adminAuthenticated, parseForm, csrfProtection, groupController.putUpdateOneGroup);

// //delete - delete one group
router.delete('/:id',adminAuthenticated, parseForm, csrfProtection, groupController.delete_deleteOneGroup);



module.exports = router;