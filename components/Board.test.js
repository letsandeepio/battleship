const Board = require('./Board');

describe('testing Board component ', () => {
  test('successfully initialize the board', () => {
    const board = new Board(8, 8);
    expect(board.grid.length).toBe(8);
  });
  test('successfully print the board', () => {
    //getPrintableGrid should return a string of length 171
    const board = new Board(8, 8);
    expect(board.getPrintableGrid().length).toBe(171);
  });
});
