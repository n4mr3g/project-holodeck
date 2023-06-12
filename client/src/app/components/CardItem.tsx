import Card from "@/types/Card";
import "@/styles/cards.css";

export default function CardItem({ card }: { card: Card }) {
  return (
    <a href={card.link} target="_blank" rel="noopener noreferrer">
      <div className="card-container">
        <div className="card-item">
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          <div className="card-image">
            <img src={card.image} alt="card" />
          </div>
        </div>
      </div>
    </a>
  );
}
