/* eslint-disable prefer-const */
/* eslint-disable prettier/prettier */
import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ActionsEnum, MessageType, ScoresEnum, StatusEnum } from 'src/common/enums/enums';
import { CardService } from 'src/modules/card/card.service';
import { GameService } from 'src/modules/game/game.service';
import { HandService } from 'src/modules/hand/hand.service';
import { PlayerService } from 'src/modules/player/player.service';
import { Card } from 'src/schemas/card.schema';
import { NewGameDto } from '../dtos/new-game.dto';
import { DrawCardDto } from '../dtos/draw-card.dto';
import { GameDataDto, NewGameResultDto } from '../dtos/new-game-result.dto';
import { DrawCardDataDto, DrawCardResultDto } from '../dtos/draw-card-result.dto';

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

    async newGame(newGameDto: NewGameDto): Promise<NewGameResultDto> {
        let result = new NewGameResultDto();
        result.data = new GameDataDto();
        try {
            const activeGame = await this.gameService.getActiveGame(newGameDto.playerName);
            if (activeGame) {
                result.message = 'You already have a game. Please choose different name...',
                    result.messageType = MessageType.WARNING;
                return result;
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

            result.data.gameId = savedGame._id;
            result.data.dealerCards = dealerCards;
            result.data.playerCards = playerCards;
            result.messageType = MessageType.SUCCESS;
        }
        catch (err) {
            result.message = MessageType.ERROR;
            result.message = err;
        }
        return result;
    }
    async drawCard(drawCard: DrawCardDto): Promise<DrawCardResultDto> {
        let result = new DrawCardResultDto();
        result.data = new DrawCardDataDto();

        result.message = 'Your game will be ready...';
        const player = await this.playerService.getPlayer(drawCard.playerName);
        if (!player) {
            result.message = 'Please call first new-game endpoint.';
            result.messageType = MessageType.WARNING;
            return result;
        }
        const playerDelay = player.delay / 1000;
        const game = await this.gameService.getActiveGame(drawCard.playerName);
        if (!game && !player.hasGame) {

            await this.playerService.setGameStatus(drawCard.playerName, true);
            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });
            
            result.message = 'Your game will be ready in your delay second/s.'
            result.messageType = MessageType.SUCCESS;
            return result;
        }

        if (player.hasGame == true && game) {

            let playerScore = await this.handService.calculateHandValue(
                game._id,
                player._id,
            );

            if (drawCard.action !== ActionsEnum.HIT && drawCard.action !== ActionsEnum.STAND) {
                result.message = 'Wrong action.';
                result.messageType = MessageType.WARNING;
                return result;
            }

            if (drawCard.action === ActionsEnum.HIT && playerScore < ScoresEnum.BLACKJACK_SCORE) {
                const deckCard = await this.cardService.drawCardFromDeck(game._id);
                if (!deckCard) {
                    result.message = 'Card was not found in the deck.';
                    result.messageType = MessageType.WARNING;
                    return result;
                }

                await this.handService.createHand(game._id, player._id, deckCard.cards);
                await this.gameService.usedGameCards(game._id, deckCard.cards);

                playerScore = await this.handService.calculateHandValue(
                    game._id,
                    player._id,
                );

                if (playerScore > ScoresEnum.BLACKJACK_SCORE) {
                    game.status = StatusEnum.BUST;
                }
            }

            if (game.status === StatusEnum.PLAYING) {
                const dealer = await this.playerService.getDealer();
                let dealerScore = await this.handService.calculateHandValue(
                    game._id,
                    dealer._id,
                    true,
                );
                while (dealerScore < ScoresEnum.THRESHOLD) {
                    const deckCard = await this.cardService.drawCardFromDeck(game._id);
                    await this.handService.createHand(game._id, dealer._id, deckCard.cards);
                    await this.gameService.usedGameCards(game._id, deckCard.cards);

                    dealerScore = await this.handService.calculateHandValue(
                        game._id,
                        dealer._id,
                        true,
                    );
                }

                if (dealerScore > ScoresEnum.BLACKJACK_SCORE) {
                    game.status = StatusEnum.WIN;
                } else if (dealerScore > playerScore) {
                    game.status = StatusEnum.BUST;
                } else if (dealerScore < playerScore) {
                    game.status = StatusEnum.WIN;
                } else {
                    game.status = StatusEnum.DRAW;
                }
            }

            await this.gameService.updateGameStatus(game._id, game.status);
            await this.playerService.setGameStatus(drawCard.playerName, false);

            result.data.gameId = game._id;
            result.data.status = game.status;
            result.message = `New game will be ready in ${playerDelay} sec`;


            this.newGame({ playerName: drawCard.playerName, delay: playerDelay });

            await this.playerService.setGameStatus(drawCard.playerName, true);
        }

        return result;
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
