import Card from '@/types/Card';

export default function CardItem({ card }: { card: Card}) {
  return (
    <div className="card-container">
      <div className="card">
        <div className="card-image">
          <img
            src="https://images.unsplash.com/photo-1548445929-4f60a497f851?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
            alt="card"
          />
        </div>
      </div>
    </div>
  );
}
