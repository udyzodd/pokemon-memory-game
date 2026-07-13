# Pokémon Memory Game

A memory card game built with React where the goal is simple: click every Pokémon exactly once. After each successful click, the cards are shuffled. Clicking the same Pokémon twice ends the game.

## Live Demo

Play the game here:

https://udyzodd.github.io/pokemon-memory-game/

## How to Play

1. Choose between Normal Mode (12 Pokémon) and Hard Mode (24 Pokémon).
2. Click on a Pokémon you haven't selected before.
3. After every successful click, the cards are shuffled.
4. Clicking the same Pokémon twice ends the game.
5. Select every Pokémon exactly once to win.

## Features

- Normal mode with 12 Pokémon
- Hard mode with 24 Pokémon
- Random Pokémon selection for every game
- Cards shuffled after every successful click
- Current score and best score tracking
- Win and game-over states
- Responsive layout
- Data fetched from PokéAPI

## Built With

- React
- Vite
- JavaScript
- CSS
- PokéAPI

## What I Learned

This project was built while learning React and helped me practice:

- Managing component state with `useState`
- Handling side effects and API requests with `useEffect`
- Rendering dynamic lists in React
- Updating state based on user interactions
- Conditional rendering
- Working with asynchronous JavaScript
- Using `Promise.all()` for parallel API requests
- Creating responsive layouts with CSS Grid
- Deploying a Vite application with GitHub Pages

## Running Locally

Clone the repository:

    git clone git@github.com:udyzodd/pokemon-memory-game.git

Navigate into the project:

    cd pokemon-memory-game

Install dependencies:

    npm install

Start the development server:

    npm run dev

## Credits

Pokémon data and sprites are provided by PokéAPI.

This project is for educational purposes.
