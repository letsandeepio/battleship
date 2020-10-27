const Board = require('./components/Board');
const Ship = require('./components/Ship');

let board = new Board(8, 8);

console.log(board.isValidCoordinate({ x: 10, y: 10 }));
console.log(board.isValidCoordinate({ x: 2, y: 2 }));

let ship = new Ship(7, 1, 3, true);

board.placeShip(ship);

console.log(board.getPrintableGrid());
