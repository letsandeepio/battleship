const Game = require('./Game');

describe('testing Game component ', () => {
  const mockPrint = jest.fn();
  const mockAsk = jest.fn();

  mockAsk
    .mockReturnValueOnce({ name: 'Sandeep', isShipHorizontal: true })
    .mockReturnValueOnce({ shipLocation: 'a1' })
    .mockReturnValueOnce({ name: 'Nidhi', isShipHorizontal: false })
    .mockReturnValueOnce({ shipLocation: 'a1' })
    .mockReturnValueOnce({ shotLocation: 'a5' }) //Player 1: missed shot
    .mockReturnValueOnce({ shotLocation: 'a1' }) // Player 2: hit shot
    .mockReturnValueOnce({ shotLocation: 'a6' }) //Player 1: missed shot
    .mockReturnValueOnce({ shotLocation: 'b1' }) // Player 2: hit shot
    .mockReturnValueOnce({ shotLocation: 'a7' }) //Player 1: missed shot
    .mockReturnValueOnce({ shotLocation: 'c1' }); // Player 2: hit shot

  test('successfully start a game', async () => {
    const game = new Game({ print: mockPrint, ask: mockAsk });
    await game.start();
    expect(mockPrint.mock.calls.length).toBe(36);
    expect(mockAsk.mock.calls.length).toBe(10);
  });
});
