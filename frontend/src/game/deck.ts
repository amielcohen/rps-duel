import type { Card } from "../types/Card";
import type { PlayerState } from "../types/Game";

export function shuffleDeck(deck: Card[]): Card[] {
  const shuffledDeck = [...deck];

  for (let i = shuffledDeck.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));

    const temp = shuffledDeck[i];
    shuffledDeck[i] = shuffledDeck[randomIndex];
    shuffledDeck[randomIndex] = temp;
  }

  return shuffledDeck;
}

export function drawUpToHandLimit(
  player: PlayerState,
  handLimit: number
): PlayerState {
  const cardsNeeded = handLimit - player.hand.length;

  if (cardsNeeded <= 0) {
    return player;
  }

  const drawnCards = player.deck.slice(0, cardsNeeded);
  const remainingDeck = player.deck.slice(cardsNeeded);

  return {
    ...player,
    hand: [...player.hand, ...drawnCards],
    deck: remainingDeck,
  };
}