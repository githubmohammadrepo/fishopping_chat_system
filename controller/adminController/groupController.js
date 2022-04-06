const { UserGroup } = require('./../../models/index');
const groupValidation = require('./../../validation/admin/groupValidation');
const moment = require('moment');
const { equal } = require('joi');
var exports = module.exports = {}

exports.get_showAllGroups = async function(req, res) {
    let limit = (req.body.limit ? req.body.limit : 20);
    let offset = (req.body.offset ? req.body.offset : 0);
    let userGroups = await UserGroup.findAndCountAll({offset: offset,
        limit: limit,
        order: [
          ['id', 'ASC']
        ]});

        
    res.render('admin/group/index', {csrfToken: req.csrfToken(),groups:userGroups,error:req.session.error,success:req.session.success})
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
        res.redirect('/admin/group')
    } catch (error) {
        req.session.error = error;
        
        res.render('admin/group/create', { csrfToken: req.csrfToken() ,error:req.session.error});

    }



}

exports.delete_deleteOneGroup =async function(req, res) {
    try {
        let value = await groupValidation.deleteGroupValidationSchema().validateAsync({
           id:req.params.id
        });

       
        let group = await UserGroup.destroy({
            where: {
              id: req.params.id
            }
          });
        req.session.success ='group deleted successfully !!';

        res.redirect('/admin/group')
    } catch (error) {
        
        req.session.error = error;
        res.redirect('/admin/group')

    }
}

exports.get_showOneGroup = async function(req, res) {
    try {
        
        let value = await groupValidation.showGroupValidationSchema().validateAsync({
           id:req.params.id
        });

        
        let group = await UserGroup.findOne({id:req.body.id});
        res.render('admin/group/show',{group:group,csrfToken: req.csrfToken()})
    } catch (error) {
        req.session.error = error;
        res.render('admin/group/show', { id:req.params.id,csrfToken: req.csrfToken() ,error:req.session.error});

    }


  
}

exports.putUpdateOneGroup = async function(req, res) {
    try {
        let value = await groupValidation.updateGroupValidationSchema().validateAsync({
           name:req.body.name,
           description:req.body.description,
           id:req.params.id
        });

       
        let group = await UserGroup.update({ name:req.body.name,description:req.body.description }, {
            where: {
              id: req.params.id
            }
        });
        res.redirect('/admin/group')
    } catch (error) {
        req.session.error = error;
        let group = await UserGroup.findOne({id:req.body.id});
        res.render('admin/group/show', { group:group,csrfToken: req.csrfToken() ,error:req.session.error});

    }

}