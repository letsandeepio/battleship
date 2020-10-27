const prompts = require('prompts');
const Board = require('./Board');
const settings = require('../helpers/constants');
const Ship = require('./Ship');
const convert = require('../helpers/convertToAlphabet');

class Player {
  constructor() {
    this.name = '';
    this.shotsFired = 0;
    this.hitShots = 0;
    this.isShipHorizontal = true;
    this.board = {};
  }

  fireShot() {
    this.shotFired += 1;
  }

  hitShot() {
    this.hitShots += 1;
  }

  async setUp() {
    await this.setPlayerPreferences();
    this.setupPlayerBoard();
    console.log('\n' + this.board.getPrintableGrid());
    await this.askShipLocation();
    console.log('\n' + this.board.getPrintableGrid());
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
    console.log(response.value);
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

  requestShot(enemy) {
    console.log(response.value);
    this.shipPlacement(response.value);
  }
}

module.exports = Player;
