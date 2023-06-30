const actions = {
  HIT: 1,
  STAND: 2
};

const scores = {
  BLACKJACK_SCORE: 21,
  THRESHOLD:17
}

const status = {
  WIN: 'WIN',
  BUST: 'BUST',
  PLAYING: 'PLAYING',
  DRAW:'DRAW'
}

module.exports = { actions, scores, status };