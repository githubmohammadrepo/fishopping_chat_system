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

            province_id: [
                Joi.number()
            ],

        })
        .with('username', 'province_id')
        .with('password', 'repeat_password');


    return schema;

}