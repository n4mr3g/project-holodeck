import CardsSection from '../components/CardsSection';
import { cards } from '@/content';
import Balancer from 'react-wrap-balancer';

export default function Home() {
  return (
    <>
      <main className="home">
        <div className="header-section">
          <h1>Project Holodeck</h1>
          <div className="wrapper">
            <Balancer>
              <span className="typing-demo">
                Let me create a virtual world for you.
              </span>
            </Balancer>
          </div>
          <CardsSection cards={cards} />
        </div>
      </main>
      <footer>
        <p>
          Created by{' '}
          <a target="_blank" href="https://github.com/n4mr3g/">
            Germán Piccioni
          </a>
        </p>
      </footer>
    </>
  );
}
