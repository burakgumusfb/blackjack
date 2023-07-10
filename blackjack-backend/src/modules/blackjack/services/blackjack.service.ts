/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { BadRequestException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Actions, Scores, Status } from 'src/common/enums/enums';
import { CardService } from 'src/modules/card/card.service';
import { GameService } from 'src/modules/game/game.service';
import { HandService } from 'src/modules/hand/hand.service';
import { PlayerService } from 'src/modules/player/player.service';
import { Card } from 'src/schemas/card.schema';
import { NewGameDto } from '../dto/new-game.dto';
import { DrawCardDto } from '../dto/draw-card.dto';

@Injectable()
export class BlackjackService {
    constructor(
        @InjectModel(Card.name) private readonly cardModel: Model<Card>,
        private gameService: GameService,
        private playerService: PlayerService,
        private handService: HandService,
        private cardService: CardService,
    ) { }

    shuffleCards(cards) {
        return cards.sort(() => Math.random() - 0.5);
    }

    async newGame(newGameDto: NewGameDto): Promise<any> {
        try {
            const activeGame = await this.gameService.getActiveGame(newGameDto.playerName);
            if (activeGame) {
                throw new InternalServerErrorException(
                    'You already have a game. Please continue with the draw-card endpoint.',
                );
            }

            const dealer = await this.playerService.createDealer();
            const player = await this.playerService.createPlayer(newGameDto.playerName, newGameDto.delay);
            await new Promise((resolve) => setTimeout(resolve, player.delay));

            const cards = await this.cardModel.find().lean().exec();
            const shuffledCards = this.shuffleCards(cards);
            const savedGame = await this.gameService.createNewGame(
                player._id,
                shuffledCards,
            );

            let playerCards = shuffledCards.splice(0, 2);
            let dealerCards = shuffledCards.splice(0, 2);

            await this.handService.createHand(savedGame._id, player._id, playerCards);
            await this.handService.createHand(savedGame._id, dealer._id, dealerCards);

            const usedCards = playerCards.concat(dealerCards);
            await this.gameService.usedGameCards(savedGame._id, usedCards);

            playerCards = await this.handService.getHand(player._id, savedGame._id);
            dealerCards = await this.handService.getHand(dealer._id, savedGame._id);

            const response = {
                gameId: savedGame._id,
                dealerCards,
                playerCards,
            };

            return response;
        }
        catch (err) {
            return err.message;
        }
    }
    async drawCard(drawCard: DrawCardDto): Promise<any> {
        let response = { gameId: undefined, info: 'Your game will be ready...', status: undefined }
        const player = await this.playerService.getPlayer(drawCard.playerName);
        if (!player) {
            throw new InternalServerErrorException('Please call first new-game endpoint.');
        }
        const playerDelay = player.delay / 1000;
        const game = await this.gameService.getActiveGame(drawCard.playerName);
        if (!game && !player.hasGame) {

            await this.playerService.setGameStatus(drawCard.playerName, true);
            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });

            response.info = 'Your game will be ready in your delay second/s.'
            return response;
        }

        if (player.hasGame == true && game) {

            let playerScore = await this.handService.calculateHandValue(
                game._id,
                player._id,
            );

            if(drawCard.action !== Actions.HIT && drawCard.action !== Actions.STAND )
            throw new InternalServerErrorException('Wrong action.');

            if (drawCard.action === Actions.HIT && playerScore < Scores.BLACKJACK_SCORE) {
                const deckCard = await this.cardService.drawCardFromDeck(game._id);
                if (!deckCard) {
                    throw new InternalServerErrorException('Card was not found in the deck.');
                }

                await this.handService.createHand(game._id, player._id, deckCard.cards);
                await this.gameService.usedGameCards(game._id, deckCard.cards);

                playerScore = await this.handService.calculateHandValue(
                    game._id,
                    player._id,
                );

                if (playerScore > Scores.BLACKJACK_SCORE) {
                    game.status = Status.BUST;
                }
            }

            if (game.status === Status.PLAYING) {
                const dealer = await this.playerService.getDealer();
                let dealerScore = await this.handService.calculateHandValue(
                    game._id,
                    dealer._id,
                    true,
                );
                while (dealerScore < Scores.THRESHOLD) {
                    const deckCard = await this.cardService.drawCardFromDeck(game._id);
                    await this.handService.createHand(game._id, dealer._id, deckCard.cards);
                    await this.gameService.usedGameCards(game._id, deckCard.cards);

                    dealerScore = await this.handService.calculateHandValue(
                        game._id,
                        dealer._id,
                        true,
                    );
                }

                if (dealerScore > Scores.BLACKJACK_SCORE) {
                    game.status = Status.WIN;
                } else if (dealerScore > playerScore) {
                    game.status = Status.BUST;
                } else if (dealerScore < playerScore) {
                    game.status = Status.WIN;
                } else {
                    game.status = Status.DRAW;
                }
            }

            await this.gameService.updateGameStatus(game._id, game.status);
            await this.playerService.setGameStatus(drawCard.playerName, false);

            response.gameId = game._id;
            response.status = game.status;
            response.info = `New game will be ready in ${playerDelay} sec`;
    
            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });
    
            await this.playerService.setGameStatus(drawCard.playerName, true);
        }

        return response;
    }
    async getHand(playerName): Promise<any> {
        const player = await this.playerService.getPlayer(playerName);
        const dealer = await this.playerService.getDealer();

        const game = await this.gameService.getActiveGame(playerName);
        if (!game) {
            throw new InternalServerErrorException('The game was not found. Please create a new game.');
        }

        const playerCards = await this.handService.getHand(player._id, game._id);
        const dealerCards = await this.handService.getHand(dealer._id, game._id);

        if (!playerCards) {
            throw new InternalServerErrorException('Player hand is empty.');
        }

        if (!dealerCards) {
            throw new InternalServerErrorException('Dealer hand is empty.');
        }

        const response = {
            gameId: game._id,
            dealerCards,
            playerCards,
        };

        return response;
    }
}
