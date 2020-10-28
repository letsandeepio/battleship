[![code coverage](https://badgen.net/badge/coverage/88%25/green)](https://github.com/letsandeepio/battleship)

# Battleship

A Commandline game based on the popular board game written in Node.js

### GamePlay Demo

[![battleship](https://github.com/letsandeepio/battleship/blob/main/documentation/battleship_gameplay.gif?raw=true)](https://github.com/letsandeepio/battleship)

### Deployment

The game is currently published as Command Line Interface (CLI) Utility as an npm package and can be run directly by typing below on the command line (node < v10 & npm < v6 is required to be installed)

`npx @letsandeepio/battleship`

### Technical Details

The app is built using Node.js. Individual components are implemented using classes, an efficient algorithm is used to check if the ship is placeable on the board or not. Also, the app makes use of the following NPM packages for a great UX experience:

1. `figlet` for the retro game font at the beginning of the game
2. `chalk` for colourful fonts
3. `prompts` for interactive user input

The app is linted using `eslint` and uses `jest` for comprehensive mock game-play testing (current test coverage is 88%).

### Salient Features

- Interactive user input allowing to select from the list of options
- Improved validation of user input without using loops and faster feedback to the user of invalid input.
- Allow players to have names.
- Print gameboard at every round.
- Let the user know if they already hit a spot before.
- Print victory message with a final view of the battlefield with the location of ships (boards of both player's)

### Gameplay Features

- Two Player game
- Two boards (one for each player)
- 1 Ship (length of 3) - can be placed vertical or horizontally (fully extensible to allow for more ships of various sizes)
- Ask the location for placement of Ship for each player.
- Fire a single shot per turn (Hit, Miss, or if the ship has been Sunk (3 hits) then register a “you sunk enemy battleship”)
- game ends when one player sunk other player's ship

### Installation

See the above “deployment” for running the game without needing to install it. In order to install a local version follow the below commands at the command line:

1. `git clone git@github.com:letsandeepio/battleship.git`
2. `cd battleship`
3. `npm install`
4. `node index.js`

### Testing

- to start Jest in watch mode type `npm test`
- to collect test coverage type `npm test:coverage`

## Copyright

MIT License 2020, Sandeep Kumar Chopra
