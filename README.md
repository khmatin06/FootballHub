# ⚽ FootballHub

A football shirt shop built with React + TypeScript + Tailwind CSS for my university final project.

## Description

FootballHub lets you browse and "buy" official shirts from players across 8 major leagues including the Premier League, La Liga, Bundesliga, Serie A, Ligue 1, UEFA Euro, Copa América, and the FIFA World Cup. There are 40 teams and over 120 players total.

## Technologies Used

- **React** – UI components
- **TypeScript** – type safety throughout
- **Tailwind CSS v4** – utility-first styling
- **Sass (SCSS)** – custom component styles (navbar.scss, playerCard.scss)
- **React Router** – client-side routing
- **Context API + useReducer** – global cart state management
- **Vite** – build tool

## Setup

```bash
npm install
npm run dev
```

Then open http://localhost:5173 in your browser.

## Pages

| Route | Page |
|---|---|
| `/` | Home – hero section with floating balls, league overview |
| `/leagues` | All 8 leagues listed |
| `/leagues/:id` | League detail – teams tabs + player cards |
| `/shop` | Full shop with search, filter, and sort |
| `/cart` | Cart with quantity controls and total |
| `/reviews` | Review list + validated form |

## Main Features

- 🏆 **8 Leagues** – EPL, La Liga, Bundesliga, Serie A, Ligue 1, Euro, Copa América, World Cup
- 👕 **120 players** across 40 teams, each with real shirt + player photos
- 🔍 **Search + Filter by position/league + Sort** on the shop page
- 🛒 **Cart** – add, remove, increase/decrease quantity, clear, total price
- 📝 **Reviews form** with validation (empty fields, min length, email format)
- ⚽ **Floating animated balls** and pitch-green background
- 📱 **Fully responsive** – works on mobile and desktop
- 🇸🇳 **Country flag emojis** next to every player's name
