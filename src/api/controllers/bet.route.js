const { Router } = require('express');
const router = Router();
const betController = require('../controllers/bet.controller');


router
    .route('/new-game')
    .post(betController.newGame);

module.exports = router;