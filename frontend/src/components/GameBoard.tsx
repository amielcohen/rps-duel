import { useState } from "react";
import type { GameState } from "../types/Game";
import type { PlayTurnResult } from "../game/turn";
import type { GameWinner } from "../game/gameEngine";
import type { Card } from "../types/Card";
import { CardView } from "./CardView";
import "./GameBoard.css";

interface GameBoardProps {
  game: GameState | null;
  lastTurn: PlayTurnResult | null;
  winner: GameWinner;
  onStartGame: () => void;
  onPlayCard: (cardId: string) => void;
}

function formatWinner(winner: GameWinner) {
  if (winner === "draw") return "It's a Draw!";
  if (winner === "playerOne") return "You Win the Duel!";
  if (winner === "playerTwo") return "Computer Wins!";
  return null;
}

export function GameBoard({
  game,
  lastTurn,
  winner,
  onStartGame,
  onPlayCard,
}: GameBoardProps) {
  // סטייט לפתיחת ה-Discard Pile
  const [activeDiscardPile, setActiveDiscardPile] = useState<{
    title: string;
    cards: Card[];
  } | null>(null);

  const getRoundStatusClass = (player: "player" | "computer") => {
    if (!lastTurn) return "";
    const roundWinner = lastTurn.round.winner;
    if (roundWinner === "draw") return "arena-card--draw";
    if (player === "player") {
      return roundWinner === "playerOne" ? "arena-card--winner" : "arena-card--loser";
    } else {
      return roundWinner === "playerTwo" ? "arena-card--winner" : "arena-card--loser";
    }
  };

  const isGameOver = !!winner;

  return (
    <main className={`game-board ${isGameOver ? "game-board--over" : ""}`}>
      
      {/* מסך סיום משחק */}
      {isGameOver && (
        <div className="game-board__overlay-winner">
          <div className="winner-modal">
            <div className="winner-modal__icon">🏆</div>
            <h2>DUEL OVER</h2>
            <h1 className={`winner-modal__title ${winner}`}>{formatWinner(winner)}</h1>
            <button className="winner-modal__restart-button" onClick={onStartGame}>
              Play Again ⚔️
            </button>
          </div>
        </div>
      )}

      {/* חלונית צפייה משודרגת ב-Discard Pile - מציגה קלפים קטנים */}
      {activeDiscardPile && (
        <div className="discard-modal-overlay" onClick={() => setActiveDiscardPile(null)}>
          <div className="discard-modal" onClick={(e) => e.stopPropagation()}>
            <header className="discard-modal__header">
              <h3>{activeDiscardPile.title} ({activeDiscardPile.cards.length})</h3>
              <button className="discard-modal__close" onClick={() => setActiveDiscardPile(null)}>✕</button>
            </header>
            <div className="discard-modal__content">
              {activeDiscardPile.cards.length === 0 ? (
                <p className="discard-empty-text">No cards played yet.</p>
              ) : (
                /* שינוי כאן: גריד שמציג את הקלפים האמיתיים מוקטנים */
                <div className="discard-cards-grid">
                  {activeDiscardPile.cards.map((card, i) => (
                    <div key={`${card.id}-${i}`} className="discard-card-item">
                      <CardView card={card} size="small" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      <header className="game-board__header">
        <div className="game-board__title-zone">
          <h1>RPS Duel</h1>
          <p>Rock • Paper • Scissors</p>
        </div>

        <button className="game-board__start-button" onClick={onStartGame}>
          {game ? "Restart Duel" : "Start Battle"}
        </button>
      </header>

      {!game && (
        <section className="game-board__empty">
          <div className="game-board__empty-icon">⚔️</div>
          <h2>Ready for battle?</h2>
          <p>Start a new duel, draw your cosmic hand, and defeat the system.</p>
        </section>
      )}

      {game && (
        <>
          {/* פאנל נקודות משולב עם לחצני Discard Pile */}
          <section className="game-board__score-panel">
            <button 
              className="discard-trigger-btn"
              onClick={() => setActiveDiscardPile({ title: "Your Discard Pile", cards: game.playerOne.discardPile || [] })}
            >
              🗑️ Played ({game.playerOne.discardPile?.length || 0})
            </button>

            <div className="game-board__score-wrapper">
              <div className="game-board__score-card game-board__score-card--player">
                <span className="player-badge">You</span>
                <strong>{game.playerOne.score}</strong>
              </div>

              <div className="game-board__round">
                <span>Round</span>
                <strong>{game.round}</strong>
              </div>

              <div className="game-board__score-card game-board__score-card--computer">
                <span className="player-badge">CPU</span>
                <strong>{game.playerTwo.score}</strong>
              </div>
            </div>

            <button 
              className="discard-trigger-btn"
              onClick={() => setActiveDiscardPile({ title: "CPU Discard Pile", cards: game.playerTwo.discardPile || [] })}
            >
              🗑️ Played ({game.playerTwo.discardPile?.length || 0})
            </button>
          </section>

          {/* זירת הקרב המרכזית */}
          <section className="game-board__arena">
            <div className={`game-board__side ${getRoundStatusClass("player")}`}>
              <h3 className="side-label">Your Move</h3>
              <div className="arena-card-wrapper">
                {lastTurn ? (
                  <CardView card={lastTurn.round.playerCard} size="board" />
                ) : (
                  <div className="game-board__card-placeholder">
                    <span>Choose a card</span>
                  </div>
                )}
                <div className="battle-status-overlay status-win">VICTORY</div>
                <div className="battle-status-overlay status-lose">DEFEATED</div>
                <div className="battle-status-overlay status-draw">DRAW</div>
              </div>
            </div>

            <div className="game-board__versus">
              <div className="versus-circle">VS</div>
              {lastTurn && !isGameOver && (
                <div className={`game-board__result-banner ${lastTurn.round.winner}`}>
                  {lastTurn.round.winner === "draw" ? "💥 DRAW 💥" : 
                   lastTurn.round.winner === "playerOne" ? "🏆 WIN 🏆" : "💀 LOSE 💀"}
                </div>
              )}
            </div>

            <div className={`game-board__side ${getRoundStatusClass("computer")}`}>
              <h3 className="side-label">Computer Move</h3>
              <div className="arena-card-wrapper">
                {lastTurn ? (
                  <CardView card={lastTurn.round.opponentCard} size="board" />
                ) : (
                  <div className="game-board__card-placeholder">
                    <span>Waiting...</span>
                  </div>
                )}
                <div className="battle-status-overlay status-win">VICTORY</div>
                <div className="battle-status-overlay status-lose">DEFEATED</div>
                <div className="battle-status-overlay status-draw">DRAW</div>
              </div>
            </div>
          </section>

          {/* היד של השחקן */}
          <section className="game-board__hand">
            <div className="game-board__hand-cards">
              {game.playerOne.hand.map((card) => (
                <div key={card.id} className="hand-card-slot">
                  <CardView
                    card={card}
                    size="hand"
                    selectable={!lastTurn?.isGameOver}
                    disabled={lastTurn?.isGameOver}
                    onClick={() => onPlayCard(card.id)}
                  />
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </main>
  );
}