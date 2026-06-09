import { useState } from 'react';
import { NavLink, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navbar.scss';

export default function Navbar() {
  const { getTotalItems } = useCart();
  const totalItems = getTotalItems();

  const [menuOpen, setMenuOpen] = useState(false);

  const closeMenu = () => {
    setMenuOpen(false);
  };

  const activeLink = ({ isActive }: { isActive: boolean }) =>
    isActive ? 'active' : '';

  return (
    <nav className="navbar">
      <div className="navbar-inner">
        <Link to="/" className="navbar-logo" onClick={closeMenu}>
          <img
            src="/footballBalls/football-ball-1.jpg"
            alt="ball"
            className="logo-ball"
          />
          <div className="logo-text">
            Football<span>Hub</span>
          </div>
        </Link>

        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={activeLink}>
              Home
            </NavLink>
          </li>
          <li>
            <NavLink to="/leagues" className={activeLink}>
              Leagues
            </NavLink>
          </li>
          <li>
            <NavLink to="/shop" className={activeLink}>
              Shop
            </NavLink>
          </li>
          <li>
            <NavLink to="/reviews" className={activeLink}>
              Reviews
            </NavLink>
          </li>
        </ul>

        <Link to="/cart" className="cart-btn">
          🛒 Cart
          {totalItems > 0 && (
            <span className="cart-count">{totalItems}</span>
          )}
        </Link>


        // Hamburger menu for mobile phones
         <button
          className="hamburger"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Open menu" // For screen readers
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      // Dropdown menu for mobile phones
      {menuOpen && (
        <div className="mobile-menu">
          <NavLink to="/" end className={activeLink} onClick={closeMenu}>
            🏠 Home
          </NavLink>

          <NavLink to="/leagues" className={activeLink} onClick={closeMenu}>
            🏆 Leagues
          </NavLink>

          <NavLink to="/shop" className={activeLink} onClick={closeMenu}>
            👕 Shop
          </NavLink>

          <NavLink to="/reviews" className={activeLink} onClick={closeMenu}>
            ✍️ Reviews
          </NavLink>

          <NavLink to="/cart" className={activeLink} onClick={closeMenu}>
            🛒 Cart ({totalItems})
          </NavLink>
        </div>
      )}
    </nav>
  );
}