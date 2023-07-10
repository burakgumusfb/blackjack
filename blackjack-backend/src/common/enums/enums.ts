enum Actions {
    HIT = 'HIT',
    STAND = 'STAND',
}

enum Scores {
    BLACKJACK_SCORE = 21,
    THRESHOLD = 17,
}

enum Status {
    WIN = 'WIN',
    BUST = 'BUST',
    PLAYING = 'PLAYING',
    DRAW = 'DRAW',
    CREATING = 'CREATING',
}

export { Actions, Scores, Status };
