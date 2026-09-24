# Tic-Tac-Toe

A React tic-tac-toe game based on the official React tutorial, with some personal additions.

## Setup

1. Clone this repo
2. Run `npm install`
3. Run `npm start`
4. Open `http://localhost:3000` in your browser

## My Modifications

- **Reset button**: clears the board and starts a new game
- **Win highlighting**: the three winning squares turn green when someone wins
- **Draw message**: displays "It's a draw!" if the board fills up with no winner
- **Scoreboard**: tracks and displays how many games X and O have each won across multiple rounds (persists through resets)

## What I Learned

One challenge I ran into was getting the CSS styling to actually apply correctly, my board looked unstyled and cramped even after adding the CSS rules. I learned this was a browser caching issue and fixed it with a hard refresh (Ctrl+Shift+R). I also learned how to lift state up from individual components into a parent component so multiple children can share and update the same data.

## References

This project follows the official React Tic-Tac-Toe tutorial: https://react.dev/learn/tutorial-tic-tac-toe

---