import { useEffect } from 'react';
import type { Player } from '../types/types';
import { useCart } from '../context/CartContext';
import Button from './Button';

interface PlayerModalProps {
  player: Player;
  teamName: string;
  onClose: () => void;
}

export default function PlayerModal({ player, teamName, onClose }: PlayerModalProps) {
  const { addToCart, isInCart, getItemQty } = useCart();
  const inCart = isInCart(player.id);
  const qty = getItemQty(player.id);

  // Close a popup window when pressing Escape
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  return (
    // Clicking it closes a popup window, but clicking inside the modal content won't close it
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(4px)' }} // blurs background
      onClick={onClose}
    >
      {/* Modal box - stop click propagation so it doesn't close when clicking inside */}
      <div
        className="relative w-full max-w-md rounded-2xl overflow-hidden animate-fade-in"
        style={{
          background: 'linear-gradient(160deg, #0f5c0f, #0a3d0a)',
          border: '1px solid rgba(255,255,255,0.12)',
          boxShadow: '0 24px 64px rgba(0,0,0,0.6)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 text-white/60 hover:text-white text-2xl font-light transition-colors"
        >
          ✕
        </button>

        {/* Top section with player photo */}
        <div className="relative p-6 pb-0 flex gap-6 items-end">
          <div
            className="rounded-xl overflow-hidden flex-shrink-0"
            style={{ width: 110, height: 110, background: 'rgba(255,255,255,0.07)' }}
          >
            <img
              src={player.image}
              alt={player.name}
              className="w-full h-full object-cover object-top"
              onError={(e) => {
                (e.target as HTMLImageElement).src = player.shirtImage;
              }}
            />
          </div>

          <div className="pb-2">
            <div className="text-white/50 text-sm font-semibold mb-1">{teamName}</div>
            <div
              className="font-bold leading-tight"
              style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.8rem', letterSpacing: '1px' }}
            >
              {player.countryFlag} {player.name}
            </div>
            <div className="text-sm text-white/60 mt-1">{player.country}</div>
          </div>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-2 gap-3 mb-5">
            {[
              { label: 'Position', value: player.position, color: '#93c5fd' },
              { label: 'Age', value: player.age, color: '#d8b4fe' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-xl p-3 text-center"
                style={{ background: 'rgba(255,255,255,0.07)' }}
              >
                <div className="text-xs text-white/50 font-semibold uppercase tracking-wider mb-1">
                  {stat.label}
                </div>
                <div className="font-bold text-lg" style={{ color: stat.color }}>
                  {stat.value}
                </div>
              </div>
            ))}
          </div>

          {/* Shirt preview */}
          <div
            className="flex items-center gap-4 rounded-xl p-4 mb-5"
            style={{ background: 'rgba(255,255,255,0.05)' }}
          >
            <img
              src={player.shirtImage}
              alt="shirt"
              className="h-20 object-contain"
              style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
            />
            <div>
              <div className="text-white/50 text-xs font-semibold uppercase tracking-wider">Official Shirt</div>
              <div
                className="text-yellow-400 mt-1"
                style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.8rem' }}
              >
                ${player.price.toFixed(2)}
              </div>
              {inCart && (
                <div className="text-xs text-green-400 font-semibold mt-0.5">
                  {qty}* in your cart
                </div>
              )}
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <Button
              variant="gold"
              size="lg"
              className="flex-1"
              onClick={() => addToCart(player)}
            >
              {inCart ? `+ Add Another` : '🛒 Add to Cart'}
            </Button>
            <Button variant="secondary" onClick={onClose}>
              Close
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}