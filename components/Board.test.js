const Board = require('./Board');
const Ship = require('./Ship');
const { shotStatus, userMessages } = require('../helpers/constants');

describe('testing Board component ', () => {
  const board = new Board(8, 8);

  test('successfully initialize the board', () => {
    const board = new Board(8, 8);
    expect(board.grid.length).toBe(8);
  });

  test('successfully prints the board', () => {
    expect(typeof board.getPrintableGrid()).toBe('string');
  });
});

describe('isValidCoordinate ', () => {
  const board = new Board(8, 8);

  test('isValidCoordinate returns false if passed coordinates are invalid', () => {
    const result = board.isValidCoordinate({ x: 10, y: 10 });
    expect(result).toBe(false);
  });

  test('isValidCoordinate returns true if passed coordinates are valid', () => {
    const result = board.isValidCoordinate({ x: 1, y: 1 });
    expect(result).toBe(true);
  });
});

describe('registerShot ', () => {
  const board = new Board(8, 8);
  const ship = new Ship({ x: 0, y: 0 }, 3, false);

  board.placeShip(ship);

  test('a hit shot is successfully registered', () => {
    const { status } = board.registerShot({ x: 0, y: 0 });
    expect(status).toBe(shotStatus.HIT);
  });

  test('a missed shot is successfully registered', () => {
    const { status } = board.registerShot({ x: 5, y: 5 });
    expect(status).toBe(shotStatus.MISSED);
  });

  test('a double-hit shot is successfully registered', () => {
    const { status } = board.registerShot({ x: 0, y: 0 });
    expect(status).toBe(shotStatus.DOUBLE_HIT);
  });
});
