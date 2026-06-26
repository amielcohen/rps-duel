import type { Card } from "../types/Card";
import type { GameState, PlayerState } from "../types/Game";

import {
  HAND_SIZE,
  STARTING_ROUND,
  STARTING_SCORE,
} from "./constants";

import { shuffleDeck, drawUpToHandLimit } from "./deck";

export type GameWinner = "playerOne" | "playerTwo" | "draw" | null;

export { playTurn } from "./turn";

export function createInitialGame(
  playerDeck: Card[],
  opponentDeck: Card[]
): GameState {
  let playerOne: PlayerState = {
    id: "player-one",
    name: "Player",
    type: "human",
    deck: shuffleDeck(playerDeck),
    hand: [],
    discardPile: [],
    score: STARTING_SCORE,
  };

  let playerTwo: PlayerState = {
    id: "player-two",
    name: "Computer",
    type: "computer",
    deck: shuffleDeck(opponentDeck),
    hand: [],
    discardPile: [],
    score: STARTING_SCORE,
  };

  playerOne = drawUpToHandLimit(playerOne, HAND_SIZE);
  playerTwo = drawUpToHandLimit(playerTwo, HAND_SIZE);

  return {
    playerOne,
    playerTwo,
    round: STARTING_ROUND,
  };
}

export function isGameOver(game: GameState): boolean {
  const playerOneFinished =
    game.playerOne.deck.length === 0 && game.playerOne.hand.length === 0;

  const playerTwoFinished =
    game.playerTwo.deck.length === 0 && game.playerTwo.hand.length === 0;

  return playerOneFinished && playerTwoFinished;
}

export function getGameWinner(game: GameState): GameWinner {
  if (!isGameOver(game)) {
    return null;
  }

  if (game.playerOne.score > game.playerTwo.score) {
    return "playerOne";
  }

  if (game.playerTwo.score > game.playerOne.score) {
    return "playerTwo";
  }

  return "draw";
}