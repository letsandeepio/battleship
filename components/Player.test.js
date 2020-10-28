const Player = require('./Player');

const mockPlayerDetails = { name: 'Sandeep', isShipHorizontal: true };

describe('testing Player component ', () => {
  const player = new Player(mockPlayerDetails);

  test('successfully initialize a player', () => {
    expect(typeof player.board.grid).toBe('object');
  });
});
