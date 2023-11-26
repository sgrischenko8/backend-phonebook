const Joi = require("joi");

exports.createContactValidator = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email(),
  phone: Joi.string().required(),
  favorite: Joi.boolean(),
  avatar: Joi.string(),
}).options({ abortEarly: false, convert: false });

exports.updateContactStatusValidator = Joi.object({
  favorite: Joi.boolean().required(),
}).options({ abortEarly: false, convert: false });
