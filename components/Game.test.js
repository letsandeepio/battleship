const Game = require('./Game');

describe('testing Game component ', () => {
  const mockPrint = jest.fn();
  const mockAsk = jest.fn();

  test('successfully start a game', () => {
    const game = new Game({ print: mockPrint, ask: mockAsk });
    game.start();
    expect(mockPrint.mock.calls.length).toBe(2);
  });
});
