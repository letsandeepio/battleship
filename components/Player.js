const prompts = require('prompts');
const settings = require('../helpers/constants');
const convert = require('../helpers/convertToAlphabet');

const Board = require('./Board');
const Ship = require('./Ship');

class Player {
  constructor() {
    this.name = '';
    this.hitShots = 0;
    this.isShipHorizontal = true;
    this.isWon = false;
    this.board = {};
  }

  hitShotFired() {
    this.hitShots += 1;
    if (this.hitShots === 3) this.isWon = true;
  }

  async setUp() {
    await this.setPlayerPreferences();
    this.setupPlayerBoard();
    console.log('\n' + this.board.getPrintableGrid());
    await this.askShipLocation();
  }

  setupPlayerBoard() {
    this.board = new Board(settings.WIDTH, settings.HEIGHT);
  }

  async setPlayerPreferences() {
    const questions = [
      {
        type: 'text',
        name: 'name',
        message: 'What is your name?',
        validate: (value) => (!value ? 'Please enter a name to continue' : true)
      },
      {
        type: 'select',
        name: 'orientation',
        message: 'How would you liked to place your ship?',
        choices: [
          { title: 'Horizontal', value: true },
          { title: 'Vertical', value: false }
        ]
      }
    ];

    const { name, orientation } = await prompts(questions);
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
    if (status === 'hit') this.hitShot();
    console.log(`\n${message}\n`);
  }

  validfireShot(value, enemy) {
    const coords = convert.toCoordinates(value);
    return !enemy.board.isValidCoordinate(coords);
  }
}

module.exports = Player;
