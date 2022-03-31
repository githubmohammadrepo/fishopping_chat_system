const moment = require('moment');

var express = require('express');
var router = express.Router();
const userController = require('./../../controller/apiController/userController');
const model = require('./../../models/index');
const modelHelper = require('../../helpers/modelHelpers');

/* GET users listing. */
router.get('/', async function(req, res, next) {

    let table_name = 'user';

    model_name = modelHelper.makeModelName(table_name);

    let result = model[model_name];
    result = await result.create({
        username: "mohammad",
        province_table_id: 20,
        openId: "mohammad"
    });
    res.send(result)
});


router.get('/date', function(req, res, next) {
    res.send(moment(new Date()).format('yyyy-MM-DD HH:mm:ss'));
});
module.exports = router;