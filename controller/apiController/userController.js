var exports = module.exports = {}
const { process_params } = require("express/lib/router");
const userValidation = require("../../validation/api/userValidation");
const { User } = require('../../models/index');


//get show all users
exports.get_showAllUsers = async function(req, res) {
    try {
        res.send('show all users')
    } catch (error) {
        res.send(error)
    }
}

//get show form register user
exports.get_createUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        User.create({
            username: value.username,

        }).then((res) => {
            res.send(res)
        }).catch((error) => {
            res.send(error)
        })
    } catch (error) {
        

        res.send(error)
    }
}

// post register user
exports.post_registerUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        User.create({
            username: value.username,
            password: value.password,
            province_id:value.province_id

        }).then((res) => {
            res.send(res)
        }).catch((error) => {
            res.send(error)
        })
    } catch (error) {
        

        res.send(error)
    }
}

// get show one user
exports.get_showOneUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        User.create({
            username: value.username,

        }).then((res) => {
            res.send(res)
        }).catch((error) => {
            res.send(error)
        })
    } catch (error) {
        

        res.send(error)
    }
}

// put update one user
exports.put_updateOneUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        User.create({
            username: value.username,

        }).then((res) => {
            res.send(res)
        }).catch((error) => {
            res.send(error)
        })
    } catch (error) {
        

        res.send(error)
    }
}

// delete one user
exports.delete_deleteOneUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        User.create({
            username: value.username,

        }).then((res) => {
            res.send(res)
        }).catch((error) => {
            res.send(error)
        })
    } catch (error) {
        

        res.send(error)
    }
}