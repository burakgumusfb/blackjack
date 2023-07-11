import { MessageType } from 'src/common/enums/enums';

export class GetHandResultDto {
  messageType: MessageType;
  message: string;
  data: HandDataDto;
}

export class CardFields {
  _id: string;
  value: number[];
  name: string;
}

export class CardDto {
  card: CardFields;
}

export class HandDataDto {
  gameId: string;
  dealerCards: CardDto[];
  playerCards: CardDto[];
}
