const printTitle = require('./printTitle');

describe('testing Player component ', () => {
  test('successfully initialize a player', async () => {
    const title = await printTitle();
    expect(typeof title).toBe('string');
  });
});
