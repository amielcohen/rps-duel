import { describe, expect, test } from "vitest";

import { starterDeck } from "../data/starterDeck";
import { drawUpToHandLimit, shuffleDeck } from "./deck";
import type { PlayerState } from "../types/Game";

describe("drawUpToHandLimit", () => {
  test("draws 3 cards into an empty hand", () => {
    // Arrange
    const player: PlayerState = {
      id: "player-one",
      name: "Player One",
      type: "human",
      deck: [...starterDeck],
      hand: [],
      discardPile: [],
      score: 0,
    };

    // Act
    const updatedPlayer = drawUpToHandLimit(player, 3);

    // Assert
    expect(updatedPlayer.hand).toHaveLength(3);
    expect(updatedPlayer.deck).toHaveLength(7);
  });

  test("does not draw cards when the deck is empty", () => {
    // Arrange
    const player: PlayerState = {
      id: "player-one",
      name: "Player One",
      type: "human",
      deck: [],
      hand: [],
      discardPile: [],
      score: 0,
    };

    // Act
    const updatedPlayer = drawUpToHandLimit(player, 3);

    // Assert
    expect(updatedPlayer.hand).toHaveLength(0);
    expect(updatedPlayer.deck).toHaveLength(0);
    expect(updatedPlayer.score).toBe(0);
  });

  test("draws only enough cards to reach the hand limit", () => {
    // Arrange
    const player: PlayerState = {
      id: "player-one",
      name: "Player One",
      type: "human",
      deck: [...starterDeck.slice(0, 8)],
      hand: [starterDeck[0], starterDeck[1]],
      discardPile: [],
      score: 0,
    };

    // Act
    const updatedPlayer = drawUpToHandLimit(player, 3);

    // Assert
    expect(updatedPlayer.hand).toHaveLength(3);
    expect(updatedPlayer.deck).toHaveLength(7);
  });

  test("does not draw cards when hand is already full", () => {
    // Arrange
    const player: PlayerState = {
      id: "player-one",
      name: "Player One",
      type: "human",
      deck: [...starterDeck],
      hand: [starterDeck[0], starterDeck[1], starterDeck[2]],
      discardPile: [],
      score: 0,
    };

    // Act
    const updatedPlayer = drawUpToHandLimit(player, 3);

    // Assert
    expect(updatedPlayer.hand).toHaveLength(3);
    expect(updatedPlayer.deck).toHaveLength(10);
  });

  test("draws all remaining cards when deck has fewer cards than needed", () => {
    // Arrange
    const player: PlayerState = {
      id: "player-one",
      name: "Player One",
      type: "human",
      deck: [starterDeck[0], starterDeck[1]],
      hand: [],
      discardPile: [],
      score: 0,
    };

    // Act
    const updatedPlayer = drawUpToHandLimit(player, 3);

    // Assert
    expect(updatedPlayer.hand).toHaveLength(2);
    expect(updatedPlayer.deck).toHaveLength(0);
  });
});

describe("shuffleDeck", () => {
  test("returns a deck with the same cards and length", () => {
    // Arrange
    const originalDeck = [...starterDeck];

    // Act
    const shuffledDeck = shuffleDeck(originalDeck);

    // Assert
    expect(shuffledDeck).toHaveLength(originalDeck.length);
    expect(shuffledDeck).toEqual(expect.arrayContaining(originalDeck));
  });

  test("does not modify the original deck", () => {
    // Arrange
    const originalDeck = [...starterDeck];

    // Act
    shuffleDeck(originalDeck);

    // Assert
    expect(originalDeck).toEqual(starterDeck);
  });
});