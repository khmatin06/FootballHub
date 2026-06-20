import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import Button from '../components/Button';

export default function CartPage() {
  const { state, dispatch, getTotalPrice, getTotalItems } = useCart();
  const items = state.items;

  // Empty cart 
  if (items.length === 0) {
    return (
      <div className="max-w-2xl mx-auto px-6 py-20">
        <div className="empty-state">
          <div className="text-7xl mb-5">🛒</div>
          <h2
            className="text-white mb-3"
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '2rem', letterSpacing: '2px' }}
          >
            Your Cart is Empty
          </h2>
          <p className="mb-8" style={{ color: 'rgba(255,255,255,0.45)' }}>
            Head to the shop and add some shirts!
          </p>
          <Link to="/shop">
            <Button variant="gold" size="lg">👕 Go to Shop</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <h1
        className="text-white mb-8"
        style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '3rem', letterSpacing: '3px' }}
      >
        Your <span style={{ color: '#f5c518' }}>Cart</span>
        <span
          className="ml-3 text-lg"
          style={{ fontFamily: 'Nunito, sans-serif', color: 'rgba(255,255,255,0.4)', letterSpacing: 'normal' }}
        >
          {getTotalItems()} items
        </span>
      </h1>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Cart items list */}
        <div className="flex-1 flex flex-col gap-4">
          {items.map((item) => (
            <div
              key={item.player.id}
              className="flex items-center gap-4 rounded-xl p-4"
              style={{
                background: 'rgba(255,255,255,0.06)',
                border: '1px solid rgba(255,255,255,0.09)',
              }}
            >
              {/* Shirt image */}
              <div
                className="flex-shrink-0 flex items-center justify-center rounded-lg"
                style={{ width: 80, height: 80, background: 'rgba(255,255,255,0.05)' }}
              >
                <img
                  src={item.player.shirtImage}
                  alt={item.player.name}
                  className="h-16 object-contain"
                  style={{ filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.4))' }}
                />
              </div>

              {/* Player info */}
              <div className="flex-1 min-w-0">
                <div
                  className="font-bold text-white truncate"
                  style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', letterSpacing: '0.5px' }}
                >
                  {item.player.countryFlag} {item.player.name}
                </div>
                <div className="text-xs font-semibold mt-0.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                  {item.player.position}
                </div>
                <div
                  className="mt-1"
                  style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.2rem', color: '#f5c518' }}
                >
                  ${item.player.price}
                </div>
              </div>

              {/* Quantity buttons */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => dispatch({ type: 'DECREASE_QTY', data: item.player.id })}
                  className="w-8 h-8 rounded-lg font-bold text-white transition-colors hover:bg-white/20 flex items-center justify-center text-lg"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  −
                </button>
                <span className="w-6 text-center font-bold text-white">{item.quantity}</span>
                <button
                  onClick={() => dispatch({ type: 'INCREASE_QTY', data: item.player.id })}
                  className="w-8 h-8 rounded-lg font-bold text-white transition-colors hover:bg-white/20 flex items-center justify-center text-lg"
                  style={{ background: 'rgba(255,255,255,0.1)' }}
                >
                  +
                </button>
              </div>

              {/* Total Price */}
              <div
                className="text-right min-w-16 hidden sm:block"
                style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.1rem', color: '#86efac' }}
              >
                ${(item.player.price * item.quantity)}
              </div>

              {/* Remove button */}
              <button
                onClick={() => dispatch({ type: 'REMOVE_FROM_CART', data: item.player.id })}
                className="text-white/30 hover:text-red-400 transition-colors text-xl font-light ml-2"
                title="Remove item"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        {/* Summary */}
        <div
          className="lg:w-72 rounded-2xl p-6 self-start sticky top-20"
          style={{
            background: 'rgba(255,255,255,0.06)',
            border: '1px solid rgba(255,255,255,0.1)',
          }}
        >
          <h2
            className="text-white mb-5"
            style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.5rem', letterSpacing: '1.5px' }}
          >
            Order Summary
          </h2>

          {/* Line items */}
          <div className="flex flex-col gap-2 mb-5">
            {items.map((item) => (
              <div key={item.player.id} className="flex justify-between text-sm font-semibold">
                <span className="truncate mr-2" style={{ color: 'rgba(255,255,255,0.6)' }}>
                  {item.player.name} ×{item.quantity}
                </span>
                <span className="text-white flex-shrink-0">
                  ${(item.player.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>

          <div
            className="border-t pt-4 mb-6"
            style={{ borderColor: 'rgba(255,255,255,0.1)' }}
          >
            <div className="flex justify-between items-center">
              <span className="font-bold text-white">Total</span>
              <span
                style={{ fontFamily: 'Bebas Neue, cursive', fontSize: '1.8rem', color: '#f5c518' }}
              >
                ${getTotalPrice()}
              </span>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col gap-3">
            <Button variant="gold" size="lg" className="w-full">
              Buy
            </Button>
            <Button
              variant="danger"
              size="sm"
              className="w-full"
              onClick={() => dispatch({ type: 'CLEAR_CART' })}
            >
              🗑 Clear Cart
            </Button>
          </div>

          <p className="text-xs text-center mt-4" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Free delivery on orders over $100
          </p>
        </div>
      </div>
    </div>
  );
}
