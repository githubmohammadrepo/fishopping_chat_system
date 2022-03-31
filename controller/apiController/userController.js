var exports = module.exports = {}
const { process_params } = require("express/lib/router");
const userValidation = require("../../validation/userValidation");
const { User } = require('../../models/index');
console.log(User)
exports.postUser = async function(req, res) {
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
        console.log(error)

        res.send(error)
    }
}