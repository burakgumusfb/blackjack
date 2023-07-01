const fs = require('fs');
const { Card } = require('../models/card');

exports.migrationData = async () => {
  const data = fs.readFileSync('./src/data/db.json', 'utf8');
  const cards = JSON.parse(data);

  const cardCount = await Card.countDocuments({}).lean();
  if (cardCount === 312) {
    return;
  }

  await Card.deleteMany({});

  for (const card of cards) {
    for (let j = 1; j <= 6; j++) {
      const checkCard = await Card.findOne({ name: card.name, type: card.type, deck: j }).lean();
      if (!checkCard) {
        const newCard = new Card({
          name: card.name,
          value: card.value,
          type: card.type,
          isAce: card.isAce,
          deck: j
        });
        await newCard.save();
      }
    }
  }
};
