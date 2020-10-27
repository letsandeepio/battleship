const Player = require('./Player');

class Game {
  constructor() {
    this.player1 = {};
    this.player2 = {};
    this.currentPlayer = {};
    this.targetPlayer = {};
    this.gameover = false;
  }

  isGameOver() {
    return this.player1.isWon || this.player2.isWon;
  }

  async start() {
    console.log('\nWelcome to the battleShip game! This is a two player game.');
    await this.setupPlayers();
    console.log('\n\nGood Job! Time to fire up the cannons!\n');
    this.currentPlayer = this.player1;
    this.targetPlayer = this.player2;
    while (!this.gameover) {
      this.requestShots();
      this.gameover = true;
    }
  }

  requestShots() {
    console.log('\n===========new round==========\n');
    console.log(`${this.currentPlayer.name} get ready its your turn!`);
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Please enter the target you would like to attack?',
      validate: (value) =>
        !this.shipPlacement(value, true)
          ? `Please enter valid coordinates.`
          : true
    });

    console.log()

  }

  async setupPlayers() {
    this.player1 = new Player();
    console.log('\n\nPlayer 1 get ready!\n=================\n');
    await this.player1.setUp();

    this.player2 = new Player();
    console.log('\n\nPlayer 2 get ready!\n=================\n');
    await this.player2.setUp();
  }
}

module.exports = Game;
