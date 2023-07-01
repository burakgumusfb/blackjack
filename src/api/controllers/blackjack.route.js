const { Router } = require('express');
const router = Router();
const blackJackController = require('./blackjack.controller');
const blackJackParams = require('./blackjack.params');
const validate = require('../../utils/validation');


router
    .route('/new-game')
    .post(validate(blackJackParams.paramsCreateNewGame),blackJackController.newGame);

router
    .route('/draw-card')
    .post(validate(blackJackParams.paramsDrawCard),blackJackController.drawCard);

router
    .route('/get-hand')
    .get(blackJackController.getHand);

module.exports = router;