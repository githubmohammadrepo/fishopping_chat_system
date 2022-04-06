var exports = module.exports = {}
const Joi = require('joi');
exports.createAdminValidationSchema = (req) => {

    const schema = Joi.object({
            username: Joi.string()
                .email()
                .min(3)
                .max(40)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),

            repeat_password: Joi.ref('password'),

            token: [
                Joi.string()
                .alphanum()
                .min(8)
                .max(8)
                .required()
            ],

        })
        .with('username', 'token')
        .with('password', 'repeat_password');


    return schema;

}
exports.loginAdminValidationSchema = (req) => {

    const schema = Joi.object({
            username: Joi.string()
                .min(3)
                .max(40)
                .required(),

            password: Joi.string()
                .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),



        })
        .with('username', 'password');


    return schema;

}