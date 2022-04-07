var exports = module.exports = {}
const { process_params } = require("express/lib/router");
const userValidation = require("../../validation/api/userValidation");
const { makeModelName } = require('./../../helpers/modelHelpers.js');
let model = require('../../models/index');
const moment = require('moment');
const crypto = require('crypto');

exports.post_makeProvinceUserLogin = async function(req, res, next) {
    try {
        // 1. validation posted params
        const value = await userValidation.loginUserValidationSchema().validateAsync(req.body);

        // 2. validate is province table name exist
        let provinceTable = await model.UserProvinceTable.findOne({
            where: {
                privateToken: value.province_token,
                province_name: value.province_name
            },
            attributes: ['id', 'userTableName']
        });


        if (provinceTable == null) {
            res.sendStatus(403);
            return;
        }

        // 3. get user infos
        let provinceUserModelName = 'User' + makeModelName(provinceTable.userTableName);

        let provinceUser = await model[provinceUserModelName].findOne({
            where: {
                username: value.username
            },
            attributes: ['id', 'group_id']
        });




        if (provinceUser == null) {
            res.sendStatus(403);
            return;
        }



        // 5. insert province user into user/session table
        const [row, created] = await model.User.findOrCreate({
            where: {
                username: value.username,
                province_table_id: provinceTable.id
            },
            defaults: {
                username: value.username,
                password: value.password,
                province_table_id: provinceTable.id,
                province_user_id: provinceUser.id,
                group_id: provinceUser.group_id,
                openId: crypto.randomBytes(20).toString('hex'),
                createdAt: moment(new Date()).format('yyyy-MM-D H:m:s'),
                updatedAt: moment(new Date()).format('yyyy-MM-D H:m:s')
            },
        });
        // 6. let request to next middleware
        next();

    } catch (error) {
        console.log(error)
        res.send(error)
    }
}

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

        //province info validation
        const provinceTable = await model.UserProvinceTable.findOne({
            where: {
                privateToken: value.province_token,
                userTableName: value.province_name
            },
            attributes: ['userTableName']
        });


        if (provinceTable == null) {
            res.sendStatus(403);
            return;
        }

        //group name validation
        const userGroup = await model.UserGroup.findOne({
            where: {
                name: value.group_name
            },
            attributes: ['id']
        });
        if (userGroup == null) {
            res.sendStatus(403);
            return;
        }


        //register user in province table
        // let province_user = model[provinceTable.userTableName];
        let provinceModelName = 'User' + makeModelName(provinceTable.userTableName);
        let provinceUser = await model[provinceModelName].create({
            username: value.username,
            password: value.password,
            group_id: userGroup.id
        });

        res.send(provinceUser);


    } catch (error) {

        res.sendStatus(500)
    }
}

// get show one user
exports.get_showOneUser = async function(req, res) {
    try {

        const value = await userValidation.createUserValidationSchema().validateAsync(req.body);
        model.User.create({
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