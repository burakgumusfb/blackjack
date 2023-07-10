declare enum ActionsEnum {
    HIT = "HIT",
    STAND = "STAND"
}
declare enum ScoresEnum {
    BLACKJACK_SCORE = 21,
    THRESHOLD = 17
}
declare enum StatusEnum {
    WIN = "WIN",
    BUST = "BUST",
    PLAYING = "PLAYING",
    DRAW = "DRAW",
    CREATING = "CREATING"
}
declare enum MessageType {
    SUCCESS = "SUCCESS",
    WARNING = "WARNING",
    ERROR = "EERROR"
}
export { ActionsEnum, ScoresEnum, StatusEnum, MessageType };
