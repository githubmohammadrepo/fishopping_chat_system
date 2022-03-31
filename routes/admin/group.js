var express = require('express');
var router = express.Router();
var csrf = require('csurf')
const bodyParser = require('body-parser')
    // setup route middlewares
var csrfProtection = csrf({ cookie: true })
var parseForm = bodyParser.urlencoded({ extended: false })


var passport = require('passport'),
    OpenIDStrategy = require('passport-openid').Strategy;
var groupController = require('../../controller/adminController/groupController');


//show all groups
router.get('/', csrfProtection, groupController.get_showAllGroups);

// // show form for create new group
router.get('/create', csrfProtection, groupController.get_createNewGroup);

// //post create new grup
router.post('/', parseForm, csrfProtection, groupController.post_createNewGroup);

// //show one group
router.get('/:id', csrfProtection, groupController.get_showOneGroup);


// // put- update one group
router.put('/:id', parseForm, csrfProtection, groupController.putUpdateOneGroup);

// //delete - delete one group
router.delete('/:id', parseForm, csrfProtection, groupController.delete_deleteOneGroup);


module.exports = router;