import { describe, expect, test } from "vitest";
import { starterDeck } from "../data/starterDeck";
import {isGameOver, getGameWinner, createInitialGame} from "./gameEngine";
import type { GameState } from "../types/Game";
import { HAND_SIZE , STARTING_SCORE, STARTING_ROUND} from "./constants";

describe("game over", () => {
    test("returns false when both players have cards left", () => {
        // Arrange
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One",
                type: "human",
                deck: starterDeck,
                hand: [],
                discardPile: [],
                score: 0,
            },
            playerTwo: {
                id: "player-two",
                name: "Player Two",
                type: "human",
                deck: starterDeck,
                hand: [],
                discardPile: [],
                score: 0,
            },
            round: 0
        };

        // Act
        const result = isGameOver(game);

        // Assert
        expect(result).toBe(false);
    });

    test("returns true when both players have no cards left", () => {
        // Arrange
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One", 
                type: "human",
                deck: [],
                hand: [],   
                discardPile: starterDeck,
                score: 0,
            },
            playerTwo: {
                id: "player-two",
                name: "Player Two",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 0,
            },
            round: 0
        }; 
        // Act
        const result = isGameOver(game);
        // Assert
        expect(result).toBe(true);
    });
    test("game is not over if one player has cards left", () => {
        // Arrange
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One",
                type: "human",
                deck: [ starterDeck[0]],
                hand: [],
                discardPile: [],
                score: 0,
            },
            playerTwo: {
                id: "player-two",
                name: "Player Two",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 0,
            },
            round: 0
        };
        // Act
        const result = isGameOver(game);
        // Assert
        expect(result).toBe(false);
    });
});

describe("getGameWinner", () => {
    test("returns null if the game is not over", () => {
        // Arrange
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One",
                type: "human",
                deck: [ starterDeck[0]],
                hand: [],
                discardPile: [],
                score: 0,
            },
            playerTwo: {
                id: "player-two",
                name: "Player Two",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 0,
            },
            round: 0
        };
        // Act
        const result = getGameWinner(game);
        // Assert
        expect(result).toBeNull();
    });
    test("returns the correct winner when the game is over", () => {
        // Arrange
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 5,
            },
            playerTwo: {
                id: "player-two",
                name: "Player Two",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 3,
            },
            round: 0
        };
        // Act
        const result = getGameWinner(game);
        // Assert
        expect(result).toBe("playerOne");
    });
    test("returns draw when both players have the same score", () => {
        // Arrange  
        const game: GameState = {
            playerOne: {
                id: "player-one",
                name: "Player One",
                type: "human",
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 5,
            },
            playerTwo: {    
                id: "player-two",
                name: "Player Two",
                type: "human",  
                deck: [],
                hand: [],
                discardPile: starterDeck,
                score: 5,
            },
            round: 0
        };
        // Act
        const result = getGameWinner(game);
        // Assert
        expect(result).toBe("draw");
    });
});

describe("createInitialGame", () => {
    test("creates a new game with shuffled decks and drawn hands", () => {
        // Arrange
        const playerDeck = [...starterDeck];
        const opponentDeck = [...starterDeck];
        // Act
        const game = createInitialGame(playerDeck, opponentDeck);
        
        // Assert
        expect(game).toBeDefined();
        expect(game.playerOne.hand).toHaveLength(HAND_SIZE);
        expect(game.playerTwo.hand).toHaveLength(HAND_SIZE);
        expect(game.playerOne.deck.length).toBe(starterDeck.length - HAND_SIZE);
        expect(game.playerTwo.deck.length).toBe(starterDeck.length - HAND_SIZE);
        expect(game.round).toBe(STARTING_ROUND);
        expect(game.playerOne.score).toBe(STARTING_SCORE);
        expect(game.playerTwo.score).toBe(STARTING_SCORE);


    });
});
