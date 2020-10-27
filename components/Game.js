const Player = require('./Player');

class Game {
  constructor() {
    this.player1 = {};
    this.player2 = {};
    this.currentPlayer = {};
  }

  isGameOver() {
    return this.player1.isWon || this.player2.isWon;
  }

  async start() {
    await this.setupPlayers();
  }

  async setupPlayers() {
    this.player1 = new Player();
    console.log('Player 1 get ready!');
    await this.player1.setUp();
  }
}

module.exports = Game;
