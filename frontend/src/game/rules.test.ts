import { describe, expect, test } from "vitest";
import type { Card } from "../types/Card";
import { determineRoundWinner } from "./rules";

function createCard(type: Card["type"]): Card {
  return {
    id: `${type}-test`,
    name: type,
    type,
    cost: 0,
    rarity: "common",
    effects: [],
  };
}

describe("determineRoundWinner", () => {
  test("rock beats scissors", () => {
    const playerCard = createCard("rock");
    const computerCard = createCard("scissors");

    const result = determineRoundWinner(playerCard, computerCard);

    expect(result).toBe("playerOne");
  });

  test("paper beats rock", () => {
    const playerCard = createCard("paper");
    const computerCard = createCard("rock");

    const result = determineRoundWinner(playerCard, computerCard);

    expect(result).toBe("playerOne");
  });

  test("scissors beats paper", () => {
    const playerCard = createCard("scissors");
    const computerCard = createCard("paper");

    const result = determineRoundWinner(playerCard, computerCard);

    expect(result).toBe("playerOne");
  });

  test("same card type results in draw", () => {
    const playerCard = createCard("rock");
    const computerCard = createCard("rock");

    const result = determineRoundWinner(playerCard, computerCard);

    expect(result).toBe("draw");
  });

    test("computer wins when player loses", () => {
    const playerCard = createCard("scissors");
    const computerCard = createCard("rock");

    const result = determineRoundWinner(playerCard, computerCard);

    expect(result).toBe("playerTwo");
  });

   

  
});