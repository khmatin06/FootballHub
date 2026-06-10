import React, { createContext, useContext, useReducer } from 'react';
import type { CartState, CartAction, Player } from '../types/types';

// Empty cart
const initialState: CartState = {
  items: [],
};


function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case 'ADD_TO_CART': {
      // Check if player shirt is already in cart
      const existing = state.items.find(item => item.player.id === action.data.id);
      if (existing) {
        // Increase the quantity
        return {
          ...state,
          items: state.items.map(item =>
            item.player.id === action.data.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }
      // New item with quantity 1
      return {
        ...state,
        items: [...state.items, { player: action.data, quantity: 1 }],
      };
    }

    case 'REMOVE_FROM_CART':
      return {
        ...state,
        items: state.items.filter(item => item.player.id !== action.data),
      };

    case 'INCREASE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.player.id === action.data
            ? { ...item, quantity: item.quantity + 1 }
            : item
        ),
      };

    case 'DECREASE_QTY':
      return {
        ...state,
        items: state.items.map(item =>
          item.player.id === action.data
            ? { ...item, quantity: Math.max(1, item.quantity - 1) }
            : item
        ),
      };

    case 'CLEAR_CART':
      return { ...state, items: [] };

    default:
      return state;
  }
}

interface CartContextType {
  state: CartState;
  dispatch: React.Dispatch<CartAction>;
  addToCart: (player: Player) => void;
  removeFromCart: (playerId: string) => void;
  getTotalItems: () => number;
  getTotalPrice: () => number;
  isInCart: (playerId: string) => boolean;
  getItemQty: (playerId: string) => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);


export function CartProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  // Functions to simplify the work (pages don't have to dispatch manually)
  const addToCart = (player: Player) => dispatch({ type: 'ADD_TO_CART', data: player });

  const removeFromCart = (playerId: string) => dispatch({ type: 'REMOVE_FROM_CART', data: playerId });

  const getTotalItems = () => state.items.reduce((sum, item) => sum + item.quantity, 0); 

  const getTotalPrice = () => state.items.reduce((sum, item) => sum + item.player.price * item.quantity, 0);

  const isInCart = (playerId: string) => state.items.some(item => item.player.id === playerId);

  const getItemQty = (playerId: string) => state.items.find(item => item.player.id === playerId)?.quantity ?? 0;

  return (
    <CartContext.Provider
      value={{ state, dispatch, addToCart, removeFromCart, getTotalItems, getTotalPrice, isInCart, getItemQty }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used inside CartProvider');
  return context;
}




