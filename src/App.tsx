import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import LeaguesPage from './pages/LeaguesPage';
import LeagueDetailPage from './pages/LeagueDetailPage';
import ShopPage from './pages/ShopPage';
import CartPage from './pages/CartPage';
import ReviewsPage from './pages/ReviewsPage';
import './index.css';

export default function App() {
  return (
    <BrowserRouter>
      <CartProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/leagues" element={<LeaguesPage />} />
            <Route path="/leagues/:leagueId" element={<LeagueDetailPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/reviews" element={<ReviewsPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </Layout>
      </CartProvider>
    </BrowserRouter>
  );
}
