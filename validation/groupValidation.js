var exports = module.exports = {}
const Joi = require('joi');
exports.createGroupValidationSchema = (req) => {

    const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(40)
                .required(),
            description: Joi.string()
                .trim(true)
                .pattern(/^[a-z0-9 ]+$/i)
                .min(10)
                .max(260)
                .required()
        })
        .with('name', 'description');


    return schema;

}