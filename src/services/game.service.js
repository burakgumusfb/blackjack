const Game = require('../models/game');
const Player = require('../models/player');
const Hand = require('../models/hand');
const { status } = require('../constants/constants');

exports.createNewGame = async (playerId, cards) => {
  const newGame = new Game({
    start_time: new Date(),
    player: playerId,
    status: status.PLAYING,
    cards
  });
  const savedGame = await newGame.save();
  return savedGame;
};

exports.usedGameCards = async (gameId, cards) => {
  for (const card of cards) {
    await Game.updateOne(
      { _id: gameId, 'cards._id': card._id },
      { $set: { 'cards.$.isUsed': true } }
    ).exec();
  }
};

exports.DeleteBeforeGames = async (playerName) => {
  const player = await Player.findOne({ name: playerName }).lean();
  if (player) {
    const game = await Game.findOneAndDelete({ player: player._id }).exec();
    if (game) {
      await Hand.deleteMany({ game: game._id }).exec();
    }
  }
};

exports.updateGameStatus = async (gameId, gameStatus) => {
  await Game.updateOne(
    { _id: gameId },
    { $set: { status: gameStatus } }
  ).exec();
};

exports.getActiveGame = async (playerName) => {
  const player = await Player.findOne({ name: playerName }).lean();
  if (player) {
    const game = await Game.findOne({ player: player._id }).lean();
    return game;
  }
};
