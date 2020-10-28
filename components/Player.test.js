const Player = require('./Player');

const mockPlayerDetails = { name: 'Sandeep', isShipHorizontal: true };

describe('testing Player component ', () => {
  const player = new Player(mockPlayerDetails);

  test('successfully initialize a player', () => {
    expect(typeof player.board.grid).toBe('object');
  });
});

describe('shipPlacement ', () => {
  const player = new Player(mockPlayerDetails);

  test("validates the user input for shop to be placed on player's board", () => {
    const validation = player.shipPlacement('a1', true);
    expect(validation).toBe(true);
  });
});
