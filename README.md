[![code coverage](https://badgen.net/badge/coverage/88%25/green)](https://github.com/letsandeepio/battleship)

# Battleship

A Commandline game based on the popular board game written in Node.js

### GamePlay Demo

[![battleship](https://github.com/letsandeepio/battleship/blob/main/documentation/battleship_gameplay.gif?raw=true)](https://github.com/letsandeepio/battleship)

### Deployment

The game is currently published as npm package and can be run directly by typing below on commandline (node < v10 & npm < v6 is required to be installed)

`npx @letsandeepio/battleship`

### Salient Features

- Interactive user input allowing to select from list of options
- Improved validation of user input without using loops and faster feedback to the user of invalid input.
- Allow players to have names.
- Print gameboard at every round.
- Let user know if they already hit a spot before.
- Print victory message with final view of the battlefield with location of ships (boards of both player's)

### Technical Details

### Gameplay Features

- Two Player game
- Two boards (one for each player)
- 1 Ship (length of 3) - can be placed vertical or horizontally (fully extensible to allow for more ships of various sizes)
- Ask location for placement of Ship for each player.
- Fire a single shot per turn (Hit, Miss, or if ship has been Sunk (3 hits) then register a “you sunk enemy battleship”)
- game ends when one player sunk other player's ship
