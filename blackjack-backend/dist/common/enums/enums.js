"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MessageType = exports.StatusEnum = exports.ScoresEnum = exports.ActionsEnum = void 0;
var ActionsEnum;
(function (ActionsEnum) {
    ActionsEnum["HIT"] = "HIT";
    ActionsEnum["STAND"] = "STAND";
})(ActionsEnum || (exports.ActionsEnum = ActionsEnum = {}));
var ScoresEnum;
(function (ScoresEnum) {
    ScoresEnum[ScoresEnum["BLACKJACK_SCORE"] = 21] = "BLACKJACK_SCORE";
    ScoresEnum[ScoresEnum["THRESHOLD"] = 17] = "THRESHOLD";
})(ScoresEnum || (exports.ScoresEnum = ScoresEnum = {}));
var StatusEnum;
(function (StatusEnum) {
    StatusEnum["WIN"] = "WIN";
    StatusEnum["BUST"] = "BUST";
    StatusEnum["PLAYING"] = "PLAYING";
    StatusEnum["DRAW"] = "DRAW";
    StatusEnum["CREATING"] = "CREATING";
})(StatusEnum || (exports.StatusEnum = StatusEnum = {}));
var MessageType;
(function (MessageType) {
    MessageType["SUCCESS"] = "SUCCESS";
    MessageType["WARNING"] = "WARNING";
    MessageType["ERROR"] = "EERROR";
})(MessageType || (exports.MessageType = MessageType = {}));
//# sourceMappingURL=enums.js.map