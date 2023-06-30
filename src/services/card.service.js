const Game = require('../models/game');
const Player = require('../models/player');
const Hand = require('../models/hand');
const { status } = require('../constants/constants');

exports.drawCardFromDeck = async (gameId) =>{

    const card = await Game.findOne(
        { _id: gameId },
        { cards: { $elemMatch: { isUsed: false } } }
      ).lean();
     
      return card;
    
}