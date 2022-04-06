const { UserGroup, GroupAccess, UserAccess } = require('../../models/index');
const groupValidation = require('../../validation/admin/groupAccessValidation');
const moment = require('moment');
const { equal, array } = require('joi');
var exports = module.exports = {};
var { eq, isnt } = require('handlebars-helpers')();
const { Op } = require('sequelize');
const { createErrorMessage } = require('./../../helpers/validationHelper')
exports.get_showAllGroupAccess = async function (req, res) {
    let limit = (req.body.limit ? req.body.limit : 20);
    let offset = (req.body.offset ? req.body.offset : 0);
    let userAccess = await UserAccess.findAndCountAll({
        offset: offset,
        limit: limit,
        order: [
            ['id', 'ASC']
        ]
    });


    res.render('admin/groupAccess/index', { csrfToken: req.csrfToken(), userAccess: userAccess, error: req.session.error, success: req.session.success })
}

exports.get_createNewGroupAccess = async function (req, res) {
    console.log('get create');
    console.log(req.session.error)
    let groups = await UserGroup.findAll({ //optional filters
        where: {},
    });


    if (req.session.oldPassedData && req.session.oldPassedData.observer_group) {

        groups = groups.map((group) => {
            group.select = group.id == req.session.oldPassedData.observer_group ? 'selected' : '';
            return group;
        });
    }



    res.render('admin/groupAccess/create', {
        groups: groups,
        csrfToken: req.csrfToken(),
        errorValidation: req.session.error,
        oldPassedData: req.session.oldPassedData,

    });
}

exports.post_createNewGroupAccess = async function (req, res) {
    try {
        let value = await groupValidation.createGroupAccessValidationSchema().validateAsync({
            name: req.body.name,
            description: req.body.description,
            observer_group: req.body.observer_group,
            watching_group: req.body.watching_group
        });

        let array_watching_group = Array.from(value.watching_group);


        //create user access
        let result_userAccess = await UserAccess.create({
            name: value.name,
            description: value.description,
            createdAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            updatedAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
        });
        if (Object.keys(result_userAccess) == 0) {
            throw new Error('group access does not saved');
        }
        //insert group watching to group observer
        let groupAccessData = array_watching_group.map(watching => {
            return {
                observer_group_id: value.observer_group,
                watching_group_id: watching,
                user_group_access: result_userAccess.id,
                createdAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
                updatedAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
            }
        });

        const result_goupAccess = await GroupAccess.bulkCreate(groupAccessData);
        if (Object.keys(result_goupAccess) == 0 || result_goupAccess.length != groupAccessData.length) {
            throw new Error('group access does not saved');
        }

        req.session.success = 'group access saved successfully.';
        res.redirect('/admin/groupAccess');
    } catch (error) {

        req.session.error = createErrorMessage(error);
        req.session.oldPassedData = req.body;
        res.redirect('/admin/groupAccess/create');
    }



}

exports.delete_deleteOneGroup = async function (req, res) {
    console.log('delete')
    try {
        let value = await groupValidation.deleteGroupValidationSchema().validateAsync({
            id: req.params.id
        });


        let groupAccess = await GroupAccess.destroy({
            where:{
                user_group_access:req.params.id
            }
        })
        let userAccess = await UserAccess.destroy({
            where: {
                id: req.params.id
            }
        });

        req.session.success = 'group deleted successfully !!';

        res.redirect('/admin/groupAccess')
    } catch (error) {
        console.log(error)
        req.session.error = error;
        res.redirect('/admin/groupAccess')

    }
}

exports.get_showOneGroupAccess = async function (req, res) {
    console.log('show')
    try {

        let value = await groupValidation.showGroupValidationSchema().validateAsync({
            id: req.params.id
        });


        let usreGroupAccess = await UserAccess.findOne({
            where: {
                id: value.id
            },
            include: {
                model: GroupAccess,
                attributes:['id','observer_group_id','watching_group_id']
            }
        });

        

        
        
        
        let selected_observer_user_group = 0;
        if(usreGroupAccess.GroupAccesses.length){
            selected_observer_user_group = usreGroupAccess.GroupAccesses[0].observer_group_id;
        }



        let selected_waching_user_group= [];
        if(usreGroupAccess.GroupAccesses.length){
            selected_waching_user_group = usreGroupAccess.GroupAccesses.map(watchGroup=>{
                return watchGroup.watching_group_id;
            });
        }

        let allUserGroups =await UserGroup.findAll({});
        let watchingUserGroups = JSON.parse(JSON.stringify(allUserGroups));
        let observerUserGroups = JSON.parse(JSON.stringify(allUserGroups));
        
        //map array for select selected watching group
        watchingUserGroups = watchingUserGroups.map((watchingGroup)=>{
            watchingGroup.select = selected_waching_user_group.includes(watchingGroup.id) ? 'selected' : '';
            return watchingGroup;
        });
        
        // res.send(selected_waching_user_group);return;
        
        //map observer user groups for selected observer group
        observerUserGroups = observerUserGroups.map((observerGroup)=>{
            observerGroup.select = observerGroup.id == selected_observer_user_group ? 'selected' : '';
                        
            return observerGroup;
        })
        
        
        
        res.render('admin/groupAccess/show', { 
            observerGroups:observerUserGroups,
            watchingUserGroups: watchingUserGroups,
            errorValidation:req.session.error,
            usreGroupAccess:usreGroupAccess,
             csrfToken: req.csrfToken() 
        })
    } catch (error) {
        req.session.error = error;
        res.send(error);
        // res.render('admin/groupAccess/show', { id: req.params.id, csrfToken: req.csrfToken(), error: req.session.error });

    }



}

exports.putUpdateOneGroup = async function (req, res) {
    
    try {
        if(!Array.isArray(req.body.watching_group)){
            req.body.watching_group = [req.body.watching_group]
        }
        let value = await groupValidation.updateGroupAccessValidationSchema().validateAsync({
            name: req.body.name,
            description: req.body.description,
            observer_group: req.body.observer_group,
            watching_group: req.body.watching_group,
            id: req.params.id
        });


        let userAccess = await UserAccess.update({ name: req.body.name, description: req.body.description }, {
            where: {
                id: req.params.id
            }
        });

        let observerGroupAccess = await GroupAccess.update({ observer_group_id:value.observer_group }, {
            where: {
                user_group_access: req.params.id
            }
        });

        let groupAccess = await GroupAccess.findAll({
            where:{
                observer_group_id:value.observer_group,
                user_group_access: req.params.id
            },
            attributes:['watching_group_id']
        });
                

        let deleteWatchingGroupAccess =groupAccess.filter((group_id)=>{
            return value.watching_group.indexOf(group_id.watching_group_id)==-1;
        });

        
        
        let insertWatchingGroupAccess =value.watching_group.filter((group_id)=>{
            return groupAccess.map(d=>d.watching_group_id).indexOf(group_id)==-1;
        });

        
        
        if(deleteWatchingGroupAccess.length){
            
            let deleteResult =await GroupAccess.destroy({where:{ 
                user_group_access: req.params.id,
                watching_group_id:deleteWatchingGroupAccess.map(d=>d.watching_group_id)}
            });
            
        }

        let watchingGroupAccess = await GroupAccess.bulkCreate(  
            insertWatchingGroupAccess.map(w=>{
                return {
                    observer_group_id:value.observer_group,
                    watching_group_id:w,
                    user_group_access: req.params.id
                }
            }),
          {
            updateOnDuplicate: ["watching_group_id"],
          });

        
        
        res.redirect('/admin/groupAccess')
    } catch (error) {
        req.session.error = createErrorMessage(error);
        
        res.redirect('/admin/groupAccess/'+req.params.id)

    }

}