module.exports = async () => {
  const chalk = require('chalk');
  const Game = require('./components/Game');
  const prinTitle = require('./helpers/printTitle');

  const prompts = require('prompts');
  const print = console.log;
  console.log(await prinTitle());
  console.log(
    `${chalk.magenta.italic('by Sandeep')} - ${chalk.black.bgGreen.bold(
      'https://github.com/letsandeepio/'
    )}`
  );
  const game = new Game({ print, ask: prompts });
  await game.start();
};
