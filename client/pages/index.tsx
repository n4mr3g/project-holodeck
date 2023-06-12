import CardsSection from "@/app/components/CardsSection";

export default function Home() {
  return (
    <div className="header-section">
      <h1>Project Holodeck</h1>
      <div className="wrapper">
      <p className="typing-demo">Let me create a virtual world for you.</p>
      </div>
      <CardsSection />
    </div>
  //TODO: Add cards with links to play and custom
  );
}
