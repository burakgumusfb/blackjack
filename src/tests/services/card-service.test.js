const app = require('../app-test');
const cardService = require('../../services/card-service');

beforeAll(async () => {
  await app.mongoDbConnect();
});

afterAll(async () => {
  await app.mongoDbClose();
});

describe('Card Service Tests', () => {
  test('get card count', async () => {
    const cardCount = await cardService.getCardsCount();
    expect(cardCount).toBe(312);
  });
});