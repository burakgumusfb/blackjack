const betService = require('../../services/bet.service');

exports.newGame = async (req, res, next) => {
    try {
        var result = await betService.newGame(req.body.playerName, req.body.delay);
        res.json(result);
    } catch (err) {
        next(err);
    }
};