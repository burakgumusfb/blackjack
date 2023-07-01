const Player = require('../models/player');

exports.createPlayer = async (playerName) => {
  let player = await Player.findOne({ name: playerName }).lean().exec();
  if (!player) {
    player = new Player({ name: playerName });
    await player.save();
  }
  return player;
};

exports.createDealer = async () => {
  let dealer = await Player.findOne({ name: "dealer" }).lean().exec();
  if (!dealer) {
    dealer = new Player({ name: "dealer" });
    await dealer.save();
  }
  return dealer;
};

exports.getPlayer = async (playerName) => {
  const player = await Player.findOne({ name: playerName }).lean();
  if (!player) {
    throw new Error("The player was not found. Please create a player.");
  }
  return player;
};

exports.getDealer = async () => {
  const dealer = await Player.findOne({ name: "dealer" }).lean();
  if (!dealer) {
    throw new Error("The dealer was not found. Please create a dealer.");
  }
  return dealer;
};
