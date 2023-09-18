import CardItem from './CardItem';
import Card from '@/types/Card';
import styles from '@/styles/Cards.module.css';

export default function CardsSection({ cards }: { cards: Card[] }) {
  return (
    <div className={styles.cardsSection}>
      {cards.map(card => (
        <CardItem key={card.title} card={card} />
      ))}
    </div>
  );
}
