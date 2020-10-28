const prompts = require('prompts');
const { settings, shotStatus } = require('../helpers/constants');

const Board = require('./Board');

class Player {
  constructor({ name, isShipHorizontal }) {
    this.name = name;
    this.hitShots = 0;
    this.isShipHorizontal = isShipHorizontal;
    this.isWon = false;
    this.board = new Board(settings.WIDTH, settings.HEIGHT);
  }

  hitShotFired() {
    this.hitShots += 1;
    if (this.hitShots === 3) this.isWon = true;
  }

  //TODO: work on this function for logic

  async requestShot(enemy) {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Please enter the target you would like to attack?',
      validate: (value) =>
        this.validfireShot(value, enemy)
          ? `Please enter valid coordinates.`
          : true
    });

    const coords = convert.toCoordinates(response.value);
    const { status, message } = enemy.board.registerShot(coords);
    if (status === shotStatus.HIT) this.hitShotFired();
    console.log(`\n${message}\n`);
  }

  validfireShot(value, enemy) {
    const coords = convert.toCoordinates(value);
    return !enemy.board.isValidCoordinate(coords);
  }
}

module.exports = Player;
