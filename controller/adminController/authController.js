var exports = module.exports = {}
const { equal } = require('joi');
const authValidation = require('../../validation/admin/authValidation');
const { AdminUser } = require('./../../models/index');
const { createErrorMessage } = require('./../../helpers/validationHelper')
const moment = require('moment');

exports.get_login = function (req, res) {
    res.render('admin/auth/login', {
        errorValidation:req.session.error,
        csrfToken: req.csrfToken(),
        oldPassedData:req.session.oldPassedData
    });
}

exports.post_login = async function (req, res) {
    try {
        
        let privateRegiserToken = 'F0EJ233j';
        let value = await authValidation.loginAdminValidationSchema().validateAsync({
            username: req.body.username,
            password: req.body.password
        }); 
        
        //login user

        res.redirect('/admin/auth');

    } catch (error) {
        if(error instanceof Error){
            req.session.error = error.message;   
        }else{
            req.session.error = createErrorMessage(error);
        }
        
        req.session.oldPassedData = req.body;
        res.redirect('/admin/auth/');
    } 
}


exports.get_register = function (req, res) {
    res.render('admin/auth/register', { 
        errorValidation:req.session.error,
        csrfToken: req.csrfToken(),
        oldPassedData:req.session.oldPassedData
    })
}

exports.post_register = async function (req, res) {

    try {

        let privateRegiserToken = 'F0EJ233j';
        let value = await authValidation.createAdminValidationSchema().validateAsync({
            username: req.body.username,
            password: req.body.password,
            repeat_password: req.body.repeat_password,
            token: req.body.privateCode,
        });
        
        if(privateRegiserToken!==value.token){
            throw  new Error('error validation admin');
        }
        

        let result = await AdminUser.create({
            username:value.username,
            password:value.password,
            createdAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss'),
            updatedAt: moment(new Date()).format('yyyy-MM-DD HH:mm:ss')
        });

        res.redirect('/admin/auth')
    } catch (error) {
        if(error instanceof Error){
            req.session.error = error.message;   
        }else{
            req.session.error = createErrorMessage(error);
        }
        
        req.session.oldPassedData = req.body;
        res.redirect('/admin/auth/register');
    }
}