const chalk = require('chalk');

const Board = require('./components/Board');
const Ship = require('./components/Ship');
const prinTitle = require('./helpers/printTitle');

async function main() {
  console.log(await prinTitle());
  console.log(chalk.black.bgGreen.bold('https://github.com/letsandeepio/'));

  console.log('Welcome to the batlleship game! This is a two player game');

  let board = new Board(8, 8);

  console.log(board.isValidCoordinate({ x: 10, y: 10 }));
  console.log(board.isValidCoordinate({ x: 2, y: 2 }));

  let ship = new Ship(1, 1, 3, true);

  board.placeShip(ship);

  console.log('printing');
  console.log(board.getPrintableGrid());

  let { status, message } = board.fireShot({ x: 0, y: 0 });

  console.log('status:' + status);
  console.log('message:' + message);

  console.log(board.getPrintableGrid());
}

main();
