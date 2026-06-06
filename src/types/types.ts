// Types and Interfaces 

export interface Player {
  id: string;
  name: string;
  countryFlag: string; 
  country: string;
  position: string;
  age: number;
  image: string;
  shirtImage: string;
  price: number;
  teamId: string;
}

export interface Team {
  id: string;
  name: string;
  leagueId: string;
  players: Player[];
}

export interface League {
  id: string;
  name: string;
  logo: string;
  country: string;
  teams: Team[];
}

export interface CartItem {
  player: Player;
  quantity: number;
}

export interface Review {
  id: string;
  playerName: string;
  userName: string;
  email: string;
  position: string;
  comment: string;
  createdAt: string;
}

// Cart actions
export type CartAction =
  | { type: 'ADD_TO_CART'; payload: Player }
  | { type: 'REMOVE_FROM_CART'; payload: string }
  | { type: 'INCREASE_QTY'; payload: string }
  | { type: 'DECREASE_QTY'; payload: string }
  | { type: 'CLEAR_CART' };

export interface CartState {
  items: CartItem[];
}
