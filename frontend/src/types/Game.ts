import type { Card } from "./Card";

export type PlayerType = "human" | "computer";

export interface PlayerState {
  id: string;
  name: string;
  type: PlayerType;
  deck: Card[];
  hand: Card[];
  discardPile: Card[];
  score: number;
}

export interface GameState {
  playerOne: PlayerState;
  playerTwo: PlayerState;
  round: number;
}