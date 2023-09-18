import Card from '@/types/Card';
import styles from '@/styles/Cards.module.css';

export default function CardItem({ card }: { card: Card }) {
  return (
    <a href={card.link}>
      {/* <div className="card-container"> */}
      <div className={styles.cardContainer}>
        {/* <div className="card-item" style={{ backgroundImage: `url(${card.image})` }}> */}
        <div
          className={styles.cardItem}
          style={{ backgroundImage: `url(${card.image})` }}
        >
          <h2>{card.title}</h2>
          <p>{card.description}</p>
          {/* <div className="card-image">
            <img src={card.image} alt="card" />
          </div> */}
        </div>
      </div>
    </a>
  );
}
