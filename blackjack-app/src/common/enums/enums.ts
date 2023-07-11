enum ActionsEnum {
  HIT = 'HIT',
  STAND = 'STAND',
}

enum ScoresEnum {
  BLACKJACK_SCORE = 21,
  THRESHOLD = 17,
}

enum StatusEnum {
  WIN = 'WIN',
  BUST = 'BUST',
  PLAYING = 'PLAYING',
  DRAW = 'DRAW',
  CREATING = 'CREATING',
}

enum MessageType {
  SUCCESS = 'SUCCESS',
  WARNING = 'WARNING',
  ERROR = 'EERROR',
}
export { ActionsEnum, ScoresEnum, StatusEnum, MessageType };
