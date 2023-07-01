const Player = require('../models/player');

/**
 * Creates a new player with the specified name and delay.
 * If the player already exists, updates the delay value.
 * @param {string} playerName - The name of the player.
 * @param {number} delay - The delay value in seconds.
 * @returns {<Object>} - The created or updated player object.
 */
exports.createPlayer = async (playerName, delay) => {
    delay = delay * 1000;
    let player = await Player.findOne({ name: playerName }).lean().exec();
    if (!player) {
        player = new Player({ name: playerName, delay: delay });
        await player.save();
    }
    else{
       player =  await Player.findOneAndUpdate(
            { _id: player._id },
            { $set: { delay: delay } }
        ).exec();
    }
    return player;
};

/**
 * Creates a dealer player with the name "dealer" if it doesn't exist.
 * @returns {<Object>} - The created or existing dealer player object.
 */
exports.createDealer = async () => {
    let dealer = await Player.findOne({ name: "dealer" }).lean().exec();
    if (!dealer) {
        dealer = new Player({ name: "dealer" });
        await dealer.save();
    }
    return dealer;
};

/**
 * Retrieves the player with the specified name.
 * @param {string} playerName - The name of the player.
 * @returns {<Object>} - The player object.
 * @throws {Error} - If the player is not found.
 */
exports.getPlayer = async (playerName) => {
    const player = await Player.findOne({ name: playerName }).lean();
    if (!player) {
        throw new Error("The player was not found. Please create a player.");
    }
    return player;
};

/**
 * Retrieves the dealer player with the name "dealer".
 * @returns {<Object>} - The dealer player object.
 * @throws {Error} - If the dealer is not found.
 */
exports.getDealer = async () => {
    const dealer = await Player.findOne({ name: "dealer" }).lean();
    if (!dealer) {
        throw new Error("The dealer was not found. Please create a dealer.");
    }
    return dealer;
};
