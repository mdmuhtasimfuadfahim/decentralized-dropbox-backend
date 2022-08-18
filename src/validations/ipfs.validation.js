const Joi = require('joi');

const uploadIpfsFile = {
  schema: Joi.object({
    name: Joi.string().alphanum().min(3).max(30).required(),
    email: Joi.string().email().trim(true).required(),
    description: Joi.string().required(),
    file: Joi.object().keys({
      data: Joi.binary().required(),
      contentType: Joi.string().required(),
    }),
  }),
};

module.exports = {
  uploadIpfsFile,
};
