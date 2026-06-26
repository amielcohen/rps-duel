export type CardType = "rock" | "paper" | "scissors" | "other";

export type Rarity = "common" | "rare" | "epic" | "legendary";

export type EffectTrigger = "onWin" | "onLose" | "onDraw" | "onPlay";

export interface CardEffectRef {
  effectId: string;
  trigger: EffectTrigger;
}

export interface Card {
  id: string;
  name: string;
  type: CardType;
  cost: number;
  rarity: Rarity;
  effects: CardEffectRef[];
}