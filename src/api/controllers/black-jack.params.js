const Joi = require('joi');

const schemas = {
    paramsCreateNewGame: {
        body: Joi.object().keys({
            playerName: Joi.string().required().empty(),
            delay: Joi.number().required()
        }),
    },
};
module.exports = schemas;
