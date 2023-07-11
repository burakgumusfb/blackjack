import { MessageType } from 'src/common/enums/enums';

export class NewGameResultDto {
  messageType: MessageType;
  message: string;
  data: GameDataDto;
}

export class CardFields {
  _id: string;
  value: number[];
  name: string;
}

export class CardDto {
  card: CardFields;
}

export class GameDataDto {
  gameId: string;
  dealerCards: CardDto[];
  playerCards: CardDto[];
}
