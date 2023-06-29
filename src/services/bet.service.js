const Card = require('../models/card');
const Game = require('../models/game');
const Hand = require('../models/hand');
const Player = require('../models/player');

function shuffleCards(array) {
    return array.sort(() => Math.random() - 0.5);
}

const betService = {

    newGame: async (playerName, delay) => {

        let dealer = await Player.findOne({ "name": "dealer" }).exec();

        if (!dealer) 
        {
             dealer = new Player({
                name: "dealer"
            });
            await dealer.save();
        }

        let player = await Player.findOne({ "name": playerName }).exec();

        if (!player) 
        {
             player = new Player({
                name: playerName
            });
            await player.save();
        }



        const newGame = new Game({
            start_time: new Date(),
            end_time: null
        });

        const savedGame = await newGame.save();

        const cards = await Card.find().lean().exec();;
        const shuffledCards = shuffleCards(cards);
        const playerCards = shuffledCards.splice(0, 2);
        const dealerCards = shuffledCards.splice(0, 2);

        for (const card of playerCards) {
            const newHand = new Hand({
                game: savedGame._id,
                player: player._id,
                card: card._id
            });
            await newHand.save();
        }


        for (const card of dealerCards) {
            const newHand = new Hand({
                game: savedGame._id,
                player: dealer._id,
                card: card._id
            });
            await newHand.save();
        }
        const response = {
            gameId:savedGame._id,
            dealerCards:dealerCards,
            playerCards:playerCards
        }
        return response;
    },
    drawCard: async () => {
        return;
    },
    finishHand: async () => {
        return;
    }
};

module.exports = betService;
