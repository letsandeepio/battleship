const Player = require('./Player');
const prompts = require('prompts');

class Game {
  constructor() {
    this.player1 = {};
    this.player2 = {};
    this.currentPlayer = {};
    this.targetPlayer = {};
  }

  isGameOver() {
    return this.player1.isWon || this.player2.isWon;
  }

  async start() {
    console.log('\nWelcome to the battleShip Wars! This is a two player game.');
    await this.setupPlayers();
    console.log('\n\nGood Job! Time to fire up the cannons!\n');
    this.currentPlayer = this.player1;
    this.targetPlayer = this.player2;
    while (!this.isGameOver()) {
      await this.requestShots();
    }
    console.log(`Awesome! ${this.currentPlayer.name} wins\n`);
    console.log('Final Battlefield\n');
    console.log(`~~~~~~${this.player1.name}'s Board~~~\n`);
    console.log(this.player1.board.getPrintableGrid(true));
    console.log(`~~~~~~${this.player2.name}'s Board~~~\n`);
    console.log(this.player2.board.getPrintableGrid(true));
  }

  async requestShots() {
    console.log('\n===========new round==========\n');
    console.log(`${this.currentPlayer.name} get ready its your turn!\n`);
    await this.currentPlayer.requestShot(this.targetPlayer);
    console.log(`~~~~~~${this.targetPlayer.name}'s Board~~~\n`);
    console.log(this.targetPlayer.board.getPrintableGrid());
    if (!this.isGameOver()) this.togglePlayers();
  }

  togglePlayers() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    this.targetPlayer =
      this.targetPlayer === this.player1 ? this.player2 : this.player1;
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
