var express = require('express');
var router = express.Router();
var indexController = require('./../../controller/apiController/indexController');
/* GET home page. */
router.get('/', function(req, res, next) {
    // res.render('index', { title: 'Express' });
    indexController.index(req, res)
});

module.exports = router;