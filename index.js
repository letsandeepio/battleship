const Board = require('./components/Board');

let board = new Board(8, 8);

console.log(board.getPrintableGrid());

console.log(board.isValidCoordinate({ x: 10, y: 10 }));
console.log(board.isValidCoordinate({ x: 2, y: 2 }));
