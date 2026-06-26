import type { Card } from "../types/Card";

export function chooseRandomCard(hand: Card[]): Card {
  const randomIndex = Math.floor(Math.random() * hand.length);
  return hand[randomIndex];
}