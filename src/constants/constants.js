const actions = {
  HIT: 'HIT',
  STAND: 'STAND'
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