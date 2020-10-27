const chalk = require('chalk');

const Ship = require('./components/Ship');
const Game = require('./components/Game');
const Board = require('./components/Board');

const prinTitle = require('./helpers/printTitle');

async function main() {
  console.log(await prinTitle());
  console.log(chalk.black.bgGreen.bold('https://github.com/letsandeepio/'));
  const game = new Game();
  await game.start();

  /*   let board = new Board(8, 8);
   */
  /*  console.log(board.isValidCoordinate({ x: 10, y: 10 }));
  console.log(board.isValidCoordinate({ x: 2, y: 2 }));

  let ship = new Ship({ x: 1, y: 1 }, 3, true);

  board.placeShip(ship);

  console.log('printing');
  console.log(board.getPrintableGrid());

  let { status, message } = board.fireShot({ x: 0, y: 0 });

  console.log('status:' + status);
  console.log('message:' + message);

  console.log(board.getPrintableGrid()); */
}

main();
