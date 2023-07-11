import { MessageType } from 'src/common/enums/enums';

export class DrawCardResultDto {
  messageType: MessageType;
  message: string;
  data: DrawCardDataDto;
}

export class DrawCardDataDto {
  gameId: string;
  status: string;
  dealerScore:number;
  playerScore:number;
}
