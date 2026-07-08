import type { Card } from "../types/Card";
import "./CardView.css";

export type CardSize = "small" | "hand" | "board" | "preview";

interface CardViewProps {
  card: Card;
  size?: CardSize;
  selectable?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

function getCardIcon(type: Card["type"]) {
  switch (type) {
    case "rock":
      return "🪨";
    case "paper":
      return "📄";
    case "scissors":
      return "✂️";
    default:
      return "✨";
  }
}

function formatCardType(type: Card["type"]) {
  return type.charAt(0).toUpperCase() + type.slice(1);
}

export function CardView({
  card,
  size = "hand",
  selectable = false,
  disabled = false,
  onClick,
}: CardViewProps) {
  const cardIcon = getCardIcon(card.type);

  return (
    <button
      className={[
        "card-view",
        `card-view--${size}`,
        `card-view--${card.rarity}`,
        selectable ? "card-view--selectable" : "",
        disabled ? "card-view--disabled" : "",
      ].join(" ")}
      onClick={onClick}
      disabled={disabled}
      type="button"
    >
      {/* פינה שמאלית עליונה: עלות הקלף */}
      <div className="card-view__cost">{card.cost}</div>

      {/* פינה ימנית עליונה: סוג הקלף (Attribute כמו ביוגי-הו) */}
      <div className={`card-view__attribute card-view__attribute--${card.type}`}>
        {cardIcon}
      </div>

      <header className="card-view__header">
        <span className="card-view__name">{card.name}</span>
      </header>

      <section className="card-view__image-container">
        <div className="card-view__image">
          <span className="card-view__placeholder">{cardIcon}</span>
        </div>
      </section>

      {/* שורת הטיפוס הקטנה מתחת לתמונה */}
      <div className="card-view__sub-type">
        [{formatCardType(card.type)}]
      </div>

      <section className="card-view__text">
        {card.effects.length === 0 ? (
          <span className="card-view__no-effect">No effect</span>
        ) : (
          card.effects.map((effect) => (
            <p key={`${effect.effectId}-${effect.trigger}`} className="card-view__effect-line">
              <strong className="card-view__trigger">{effect.trigger}</strong>
              <span className="card-view__effect-id">{effect.effectId}</span>
            </p>
          ))
        )}
      </section>

      <footer className="card-view__footer">
        <span className="card-view__rarity-tag">{card.rarity}</span>
      </footer>
    </button>
  );
}