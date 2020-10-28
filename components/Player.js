const Board = require('./Board');

class Player {
  constructor({ name, isShipHorizontal, boardWidth, boardHeight }) {
    this.name = name;
    this.hitShots = 0;
    this.isShipHorizontal = isShipHorizontal;
    this.isWon = false;
    this.board = new Board(boardWidth, boardHeight);
  }
  hitShotFired() {
    this.hitShots += 1;
    if (this.hitShots === 3) this.isWon = true;
  }
}

module.exports = Player;
