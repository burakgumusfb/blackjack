# Blackjack API

This API provides endpoints for playing the game of Blackjack. It allows users to create a new game, draw cards from the deck, and retrieve the player's and dealer's current hand.

## Endpoints

### Create a New Game

Creates a new game of Blackjack.

- **URL:** `/new-game`
- **Method:** POST
- **Request Body:** JSON object containing the player's name and optional delay value.
- **Response:** JSON object containing the game ID, dealer's cards, and player's cards.

### Draw a Card

Draws a card from the deck in an active game.

- **URL:** `/draw-card`
- **Method:** POST
- **Request Body:** JSON object containing the player's name and action (HIT or STAND).
- **Response:** JSON object containing the game ID, game status, and information about the next game.

### Get Hand

Retrieves the player's and dealer's current hand in the active game.

- **URL:** `/get-hand`
- **Method:** GET
- **Query Parameters:** player name
- **Response:** JSON object containing the game ID, dealer's cards, and player's cards.

## Validation

The API uses validation middleware to validate the request parameters and body. The validation schemas for each endpoint can be found in the `blackJackParams` module.

## Error Handling

If an error occurs during the API requests, appropriate error messages will be returned with the corresponding HTTP status codes.

