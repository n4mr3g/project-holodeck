import CardsSection from "@/app/components/CardsSection";

export default function Home() {
  return (
    <>
      <main className="home">
        <div className="header-section">
          <h1>Project Holodeck</h1>
          <div className="wrapper">
            <p className="typing-demo">
              Let me create a virtual world for you.
            </p>
          </div>
          <CardsSection />
        </div>
      </main>
      <footer>
        <p>
          Created by <a
          target="_blank"
          href="https://github.com/n4mr3g/"
          >Germán Piccioni</a>
        </p>
      </footer>
    </>
    //TODO: Add cards with links to play and custom
  );
}
