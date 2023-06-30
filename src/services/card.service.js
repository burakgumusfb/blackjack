const Game = require('../models/game');

exports.drawCardFromDeck = async (gameId) =>{

    const card = await Game.findOne(
        { _id: gameId },
        { cards: { $elemMatch: { isUsed: false } } }
      ).lean();
     
      return card;
    
}