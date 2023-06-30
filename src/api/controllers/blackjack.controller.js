const blackJackService = require('../../services/blackjack.service');

exports.newGame = async (req, res, next) => {
    try {
        var result = await blackJackService.newGame(req.body.playerName, req.body.delay);
        res.json(result);
    } catch (err) {
        next(err);
    }
};

exports.drawCard = async (req, res, next) => {
    try {
        var result = await blackJackService.drawCard(req.body.playerName, req.body.action);
        res.json(result);
    } catch (err) {
        next(err);
    }
};