import { MessageType } from 'src/common/enums/enums';

export class NewGameResultDto {
  messageType: MessageType;
  message: string;
  data: GameDataDto;
}

export class CardDto {
  _id: string;
  value: number[];
  name: string;
}

export class GameDataDto {
  gameId: string;
  dealerCards: CardDto[];
  playerCards: CardDto[];
}
