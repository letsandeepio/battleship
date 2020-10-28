const Game = require('./Game');

describe('testing Game component ', () => {
  const mockPrint = jest.fn();
  const mockAsk = jest.fn();

  mockAsk
    .mockReturnValueOnce({ name: 'Sandeep', isShipHorizontal: true })
    .mockReturnValueOnce({ shipLocation: 'a1' })
    .mockReturnValueOnce({ name: 'Nidhi', isShipHorizontal: false })
    .mockReturnValueOnce({ shipLocation: 'a1' });

  test('successfully start a game', async () => {
    const game = new Game({ print: mockPrint, ask: mockAsk });
    await game.start();
    expect(mockPrint.mock.calls.length).toBe(6);
    expect(mockAsk.mock.calls.length).toBe(4);
  });
});
