import { useState } from 'react';
import type { Player } from '../types/types';
import { useCart } from '../context/CartContext';
import '../styles/playerCard.scss';

interface PlayerCardProps {
  player: Player;
  onClick?: () => void; // player details -- optional 
}

export default function PlayerCard({ player, onClick }: PlayerCardProps) {
  const { addToCart, isInCart } = useCart();
  const alreadyInCart = isInCart(player.id);

  // quick feedback when adding to cart
  const [justAdded, setJustAdded] = useState(false);

  function handleAdd(e: React.MouseEvent) {
    // Don't trigger the card click when clicking the button
    e.stopPropagation();
    addToCart(player);
    setJustAdded(true);
    setTimeout(() => setJustAdded(false), 1300);
  }

  return (
    <div className="player-card" onClick={onClick}>
      {/* Shirt image section */}
      <div className="shirt-section">
        <img
          src={player.shirtImage}
          alt={`${player.name} shirt`}
          className="shirt-img"
        />
      </div>

      {/*Card Information section */}
      <div className="card-info">
        <div className="player-name">
          <span className="flag">{player.countryFlag}</span>
          {player.name}
        </div>

        <div className="player-info">
          <span className="player position">{player.position}</span>
          <span className="meta-tag">Age {player.age}</span>
        </div>

        {/* Price and add to cart */}
        <div className="card-bottom">
          <span className="price">${player.price}</span>
          <button
            className={`add-btn ${alreadyInCart ? 'in-cart' : ''}`}
            onClick={handleAdd}
          >
            {justAdded ? 'Added!' : alreadyInCart ? 'In Cart' : '+ Add'}
          </button>
        </div>
      </div>
    </div>
  );
}