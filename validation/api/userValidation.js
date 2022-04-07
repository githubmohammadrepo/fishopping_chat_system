var exports = module.exports = {}
const Joi = require('joi');

exports.createUserValidationSchema = (req) => {

    const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(40)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            repeat_password: Joi.ref('password'),

            province_name: Joi.string().required(),

            group_name: Joi.string().required(),

            province_token: Joi.string().required()

        })
        .with('username', 'province_name')
        .with('password', 'repeat_password');


    return schema;

};

exports.loginUserValidationSchema = (req) => {

    const schema = Joi.object({
            username: Joi.string()
                .alphanum()
                .min(3)
                .max(40)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            province_name: Joi.string().required(),

            province_token: Joi.string().required()

        })
        .with('username', 'province_name')
        .with('password', 'province_token');


    return schema;

};