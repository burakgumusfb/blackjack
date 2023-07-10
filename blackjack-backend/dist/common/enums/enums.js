"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Status = exports.Scores = exports.Actions = void 0;
var Actions;
(function (Actions) {
    Actions["HIT"] = "HIT";
    Actions["STAND"] = "STAND";
})(Actions || (exports.Actions = Actions = {}));
var Scores;
(function (Scores) {
    Scores[Scores["BLACKJACK_SCORE"] = 21] = "BLACKJACK_SCORE";
    Scores[Scores["THRESHOLD"] = 17] = "THRESHOLD";
})(Scores || (exports.Scores = Scores = {}));
var Status;
(function (Status) {
    Status["WIN"] = "WIN";
    Status["BUST"] = "BUST";
    Status["PLAYING"] = "PLAYING";
    Status["DRAW"] = "DRAW";
    Status["CREATING"] = "CREATING";
})(Status || (exports.Status = Status = {}));
//# sourceMappingURL=enums.js.map