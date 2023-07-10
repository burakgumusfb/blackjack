const Joi = require('joi');

const schemas = {
    paramsCreateNewGame: {
        body: Joi.object().keys({
            playerName: Joi.string().required().empty(),
            delay: Joi.number().required()
        }),
    },
    paramsDrawCard: {
        body: Joi.object().keys({
            playerName: Joi.string().required().empty(),
            action: Joi.string().required().empty()
        }),
    },
};
module.exports = schemas;
