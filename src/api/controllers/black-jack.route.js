const { Router } = require('express');
const router = Router();
const blackJackController = require('./black-jack.controller');
const blackJackParams = require('./black-jack.params');
const validate = require('../../utils/validation');


router
    .route('/new-game')
    .post(validate(blackJackParams.paramsCreateNewGame),blackJackController.newGame);

module.exports = router;