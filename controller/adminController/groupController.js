const { UserGroup } = require('./../../models/index');
const groupValidation = require('./../../validation/groupValidation');
const moment = require('moment')
var exports = module.exports = {}

exports.get_showAllGroups = function(req, res) {
    res.render('admin/group/index', {})
}

exports.get_createNewGroup = function(req, res) {
    res.render('admin/group/create', { csrfToken: req.csrfToken() });
}
exports.post_createNewGroup = async function(req, res) {
    try {

        let value = await groupValidation.createGroupValidationSchema().validateAsync({
            name: req.body.name,
            description: req.body.description
        });
        let result = await UserGroup.create({
            name: req.body.name,
            description: req.body.description,
            createdAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            updatedAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
        });
        res.send(result)
    } catch (error) {

        res.send(error)
    }



}

exports.delete_deleteOneGroup = function(req, res) {
    res.send('delete login')
}

exports.get_showOneGroup = function(req, res) {
    res.send('show one group')
}

exports.putUpdateOneGroup = function(req, res) {
    res.send('update one group')
}