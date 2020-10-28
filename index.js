const chalk = require('chalk');

const Ship = require('./components/Ship');
const Game = require('./components/Game');
const Board = require('./components/Board');
const prinTitle = require('./helpers/printTitle');

const prompts = require('prompts');
const print = console.log;

async function main() {
  console.log(await prinTitle());
  console.log(chalk.black.bgGreen.bold('https://github.com/letsandeepio/'));
  const game = new Game({ print, ask: prompts });
  await game.start();
}

main();
