const prompts = require('prompts');
const { settings, userQuestions, shotStatus } = require('../helpers/constants');
const convert = require('../helpers/convertToAlphabet');

const Board = require('./Board');
const Ship = require('./Ship');

class Player {
  constructor() {
    this.name = '';
    this.hitShots = 0;
    this.isShipHorizontal = true;
    this.isWon = false;
    this.board = new Board(settings.WIDTH, settings.HEIGHT);
  }

  hitShotFired() {
    this.hitShots += 1;
    if (this.hitShots === 3) this.isWon = true;
  }

  async setUp() {
    await this.setPlayerPreferences();
    console.log('\n' + this.board.getPrintableGrid());
    await this.askShipLocation();
  }

  async setPlayerPreferences() {
    const { name, orientation } = await prompts(userQuestions.PREFERENCES);
    this.name = name;
    this.isShipHorizontal = orientation;
  }

  async askShipLocation() {
    const response = await prompts({
      type: 'text',
      name: 'value',
      message: 'Where would you like to place your Ship?',
      validate: (value) =>
        !this.shipPlacement(value, true)
          ? `Please enter valid coordinates.`
          : true
    });
    this.shipPlacement(response.value);
  }

  //TODO: work on this function for logic
  shipPlacement(value, validation = false) {
    const ship = new Ship(
      convert.toCoordinates(value),
      settings.SHIP_LENGTH,
      this.isShipHorizontal
    );
    if (validation) return this.board.isShipPlaceable(ship);
    this.board.placeShip(ship);
  }

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
