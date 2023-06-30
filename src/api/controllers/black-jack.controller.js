const blackJackService = require('../../services/black-jack.service');

exports.newGame = async (req, res, next) => {
    try {
        var result = await blackJackService.newGame(req.body.playerName, req.body.delay);
        res.json(result);
    } catch (err) {
        next(err);
    }
};