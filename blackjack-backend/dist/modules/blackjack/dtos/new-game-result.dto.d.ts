import { MessageType } from 'src/common/enums/enums';
export declare class NewGameResultDto {
    messageType: MessageType;
    message: string;
    data: GameDataDto;
}
export declare class CardFields {
    _id: string;
    value: number[];
    name: string;
}
export declare class CardDto {
    card: CardFields;
}
export declare class GameDataDto {
    gameId: string;
    dealerCards: CardDto[];
    playerCards: CardDto[];
}
