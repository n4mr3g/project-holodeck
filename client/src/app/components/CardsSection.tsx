import CardItem from "./CardItem";
import Card from "@/types/Card";

export default function CardsSection() {
  const cards: Card[] = [
    {
      title: "Card 1",
      description: "This is card 1",
      image:
        "https://images.unsplash.com/photo-1548445929-4f60a497f851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "/play",
    },
    {
      title: "Card 2",
      description: "This is card 2",
      image:
        "https://images.unsplash.com/photo-1662072628041-49ceb95e47e9?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80",
      link: "/play",
    },
    {
      title: "Card 3",
      description: "This is card 3",
      image:
        "https://cdn.pixabay.com/photo/2023/01/30/09/39/cyberpunk-7755208_1280.jpg",
      link: "/play",
    },
  ];

  return (
    <div className="cards-section">
      {cards.map((card: Card) => {
        <CardItem card={card} />;
      })}
    </div>
  );
}
