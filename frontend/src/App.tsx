import { useState } from "react";

import type { GameState } from "./types/Game";
import type { PlayTurnResult } from "./game/turn";

import { starterDeck } from "./data/starterDeck";
import { createInitialGame, playTurn, getGameWinner } from "./game/gameEngine";

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
    <div>
      <h1>RPS Duel</h1>

      <button onClick={startGame}>Start Game</button>

      {game && (
        <>
          <h2>Round: {game.round}</h2>

          <p>Player score: {game.playerOne.score}</p>
          <p>Computer score: {game.playerTwo.score}</p>

          <h3>Your Hand</h3>

          {game.playerOne.hand.map((card) => (
            <button
              key={card.id}
              onClick={() => handlePlayCard(card.id)}
              disabled={lastTurn?.isGameOver}
            >
              {card.name}
            </button>
          ))}

          {lastTurn && (
            <div>
              <h3>Last Turn</h3>
              <p>You played: {lastTurn.round.playerCard.name}</p>
              <p>Computer played: {lastTurn.round.opponentCard.name}</p>
              <p>Winner: {lastTurn.round.winner}</p>
            </div>
          )}

          {winner && (
            <h2>
              Game Winner:{" "}
              {winner === "draw"
                ? "Draw"
                : winner === "playerOne"
                ? "Player"
                : "Computer"}
            </h2>
          )}
        </>
      )}
    </div>
  );
}

export default App;