const Ship = require('./Ship');

describe('testing Ship component ', () => {
  test('successfully initialize a ship', () => {
    const ship = new Ship({ x: 1, y: 1 }, 3, false);
    expect(ship.coords.length).toBe(3);
  });
});
