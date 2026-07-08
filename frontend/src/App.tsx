import { useState } from "react";

import type { GameState } from "./types/Game";
import type { PlayTurnResult } from "./game/turn";

import { starterDeck } from "./data/starterDeck";
import { createInitialGame, playTurn, getGameWinner } from "./game/gameEngine";
import { GameBoard } from "./components/GameBoard";

function App() {
  const [game, setGame] = useState<GameState | null>(null);
  const [lastTurn, setLastTurn] = useState<PlayTurnResult | null>(null);

  function startGame() {
    const newGame = createInitialGame(starterDeck, starterDeck);
    setGame(newGame);
    setLastTurn(null);
  }

  function handlePlayCard(cardId: string) {
    if (!game) return;

    const result = playTurn(game, cardId);
    setGame(result.game);
    setLastTurn(result);
  }

  const winner = game ? getGameWinner(game) : null;

  return (
    <GameBoard
      game={game}
      lastTurn={lastTurn}
      winner={winner}
      onStartGame={startGame}
      onPlayCard={handlePlayCard}
    />
  );
}

export default App;