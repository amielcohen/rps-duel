import type { Card } from "../types/Card";

export type BasicCardType = "rock" | "paper" | "scissors";
export type RoundResult = "playerOne" | "playerTwo" | "draw";

function isBasicCard(type: Card["type"]): type is BasicCardType {
  return type === "rock" || type === "paper" || type === "scissors";
}

export function determineRoundWinner(
  playerCard: Card,
  computerCard: Card
): RoundResult {
  if (!isBasicCard(playerCard.type) || !isBasicCard(computerCard.type)) {
    throw new Error("Version 1 supports only rock, paper, and scissors cards.");
  }

  if (playerCard.type === computerCard.type) {
    return "draw";
  }

  if (
    (playerCard.type === "rock" && computerCard.type === "scissors") ||
    (playerCard.type === "paper" && computerCard.type === "rock") ||
    (playerCard.type === "scissors" && computerCard.type === "paper")
  ) {
    return "playerOne";
  }

  return "playerTwo";
}