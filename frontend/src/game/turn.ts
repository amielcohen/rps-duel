import type { Card } from "../types/Card";
import type { GameState, PlayerState } from "../types/Game";

import { HAND_SIZE } from "./constants";
import { chooseRandomCard } from "./ai";
import { drawUpToHandLimit } from "./deck";
import { determineRoundWinner, type RoundResult } from "./rules";

export type PlayerSlot = "playerOne" | "playerTwo";

export interface RoundSummary {
  playerCard: Card;
  opponentCard: Card;
  winner: RoundResult;
}

export interface PlayTurnResult {
  game: GameState;
  round: RoundSummary;
  pointsAwardedTo: PlayerSlot | null;
  isGameOver: boolean;
}

function removeCardFromHand(player: PlayerState, cardId: string): PlayerState {
  return {
    ...player,
    hand: player.hand.filter((card) => card.id !== cardId),
  };
}

function addCardToDiscardPile(player: PlayerState, card: Card): PlayerState {
  return {
    ...player,
    discardPile: [...player.discardPile, card],
  };
}

function addPoint(player: PlayerState): PlayerState {
  return {
    ...player,
    score: player.score + 1,
  };
}

function hasNoCardsLeft(player: PlayerState): boolean {
  return player.deck.length === 0 && player.hand.length === 0;
}

export function playTurn(
  game: GameState,
  playerCardId: string
): PlayTurnResult {
  const playerCard = game.playerOne.hand.find(
    (card) => card.id === playerCardId
  );

  if (!playerCard) {
    throw new Error("Selected card was not found in player hand.");
  }

  if (game.playerTwo.hand.length === 0) {
    throw new Error("Opponent has no cards to play.");
  }

  const opponentCard = chooseRandomCard(game.playerTwo.hand);
  const winner = determineRoundWinner(playerCard, opponentCard);

  let playerOne = removeCardFromHand(game.playerOne, playerCard.id);
  let playerTwo = removeCardFromHand(game.playerTwo, opponentCard.id);

  playerOne = addCardToDiscardPile(playerOne, playerCard);
  playerTwo = addCardToDiscardPile(playerTwo, opponentCard);

  let pointsAwardedTo: PlayerSlot | null = null;

  if (winner === "playerOne") {
    playerOne = addPoint(playerOne);
    pointsAwardedTo = "playerOne";
  }

  if (winner === "playerTwo") {
    playerTwo = addPoint(playerTwo);
    pointsAwardedTo = "playerTwo";
  }

  playerOne = drawUpToHandLimit(playerOne, HAND_SIZE);
  playerTwo = drawUpToHandLimit(playerTwo, HAND_SIZE);

  const nextGame: GameState = {
    ...game,
    playerOne,
    playerTwo,
    round: game.round + 1,
  };

  const gameOver =
    hasNoCardsLeft(nextGame.playerOne) && hasNoCardsLeft(nextGame.playerTwo);

  return {
    game: nextGame,
    round: {
      playerCard,
      opponentCard,
      winner,
    },
    pointsAwardedTo,
    isGameOver: gameOver,
  };
}