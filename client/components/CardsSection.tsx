import CardItem from './CardItem';
import Card from '@/types/Card';
// import '@/styles/cards.css';

export default function CardsSection({ cards }: { cards: Card[] }) {
  return (
    <div className='cards-section'>
      {cards.map(card => <CardItem card={card}/> )}
    </div>
  );
}
