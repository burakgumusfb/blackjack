const blackJackService = require('../../services/blackjack.service');

exports.newGame = async (req, res, next) => {
  try {
    const result = await blackJackService.newGame(req.body.playerName, req.body.delay);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};

exports.drawCard = async (req, res, next) => {
  try {
    const result = await blackJackService.drawCard(req.body.playerName, req.body.action);
    res.json(result);
  } catch (err) {
    res.json(err);
  }
};
