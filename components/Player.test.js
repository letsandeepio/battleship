const Player = require('./Player');

describe('testing Player component ', () => {
  const player = new Player();

  test('successfully initialize a player', () => {
    expect(typeof player.board.grid).toBe('object');
  });
});

describe('shipPlacement ', () => {
  const player = new Player();

  test("validates the user input for shop to be placed on player's board", () => {
    const validation = player.shipPlacement('a1', true);
    expect(validation).toBe(true);
  });
});
