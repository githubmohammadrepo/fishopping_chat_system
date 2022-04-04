var express = require('express');
var router = express.Router();
var csrf = require('csurf')
const bodyParser = require('body-parser')
    // setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })

const { adminAuthenticated } = require('./../../helpers/adminAuthHelper');
var passport = require('passport');
router.use(passport.session());
var LocalStrategy = require('passport-local');


var groupAccessController = require('../../controller/adminController/groupAccessController');


//show all groups
router.get('/',adminAuthenticated, csrfProtection, groupAccessController.get_showAllGroupAccess);

// // show form for create new group
router.get('/create',adminAuthenticated, csrfProtection, groupAccessController.get_createNewGroupAccess);

// //post create new grup
router.post('/',adminAuthenticated, parseForm, csrfProtection, groupAccessController.post_createNewGroupAccess);

// //show one group
router.get('/:id',adminAuthenticated, csrfProtection, groupAccessController.get_showOneGroupAccess);


// // put- update one group

router.put('/:id',adminAuthenticated, parseForm, csrfProtection, groupAccessController.putUpdateOneGroup);

// //delete - delete one group
router.delete('/:id',adminAuthenticated, parseForm, csrfProtection, groupAccessController.delete_deleteOneGroup);



module.exports = router;