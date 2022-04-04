const moment = require('moment');

var express = require('express');
var router = express.Router();
const userController = require('./../../controller/apiController/userController');
const model = require('./../../models/index');
const modelHelper = require('../../helpers/modelHelpers');
var {eq,isnt} = require('handlebars-helpers')();
/* GET users listing. */
router.get('/', async function(req, res, next) {
 
    res.render('test/helper',{name:"mohammad",find:"mohammad1",eq:eq,isnt:isnt})
});


router.get('/date', function(req, res, next) {
    res.send(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
});
module.exports = router;