const printTitle = require('./printTitle');

describe('testing Player component ', () => {
  test('successfully print game title', async () => {
    const title = await printTitle();
    expect(typeof title).toBe('string');
  });
});
