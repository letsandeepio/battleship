const Board = require('./components/Board');
const Ship = require('./components/Ship');

let board = new Board(8, 8);

console.log(board.getPrintableGrid());

console.log(board.isValidCoordinate({ x: 10, y: 10 }));
console.log(board.isValidCoordinate({ x: 2, y: 2 }));

let ship = new Ship(1, 1, 3, false);

console.log(ship.coords);
