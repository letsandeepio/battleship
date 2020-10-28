const Player = require('./Player');
const Ship = require('./Ship');

const convert = require('../helpers/convertToAlphabet');

const { userQuestions, settings, shotStatus } = require('../helpers/constants');

class Game {
  constructor({ print, ask }) {
    this.player1 = {};
    this.player2 = {};
    this.currentPlayer = {};
    this.targetPlayer = {};
    this.print = print;
    this.ask = ask;
  }

  togglePlayers() {
    this.currentPlayer =
      this.currentPlayer === this.player1 ? this.player2 : this.player1;
    this.targetPlayer =
      this.targetPlayer === this.player1 ? this.player2 : this.player1;
  }

  isGameOver() {
    return this.player1.isWon || this.player2.isWon;
  }

  shipPlacement(value, player, validation = false) {
    const ship = new Ship(
      convert.toCoordinates(value),
      settings.SHIP_LENGTH,
      player.isShipHorizontal
    );
    if (validation) return player.board.isShipPlaceable(ship);
    player.board.placeShip(ship);
  }

  async start() {
    this.print(
      '\nWelcome to the battleShip Wars! This is a interactive two player game.'
    );
    this.player1 = await this.setupPlayer('Player 1');
    this.player2 = await this.setupPlayer('Player 2');

    this.print('\n\nGood Job! Time to fire up the cannons!\n');

    this.currentPlayer = this.player1;
    this.targetPlayer = this.player2;

    while (!this.isGameOver()) {
      await this.newRound();
    }

    this.printWinner();
  }

  async newRound() {
    this.print('\n===========new round==========\n');
    this.print(`${this.currentPlayer.name} get ready its your turn!\n`);
    await this.requestShot();
    this.print(`~~~~~~${this.targetPlayer.name}'s Board~~~\n`);
    this.print(this.targetPlayer.board.getPrintableGrid());
    if (!this.isGameOver()) this.togglePlayers();
  }

  async setupPlayer(playerRoaster) {
    let player = {};

    this.print(`\n\n${playerRoaster} get ready!\n=================\n`);

    const { name, isShipHorizontal } = await this.ask(
      userQuestions.PREFERENCES
    );

    const boardWidth = settings.WIDTH;
    const boardHeight = settings.HEIGHT;

    player = new Player({ name, isShipHorizontal, boardWidth, boardHeight });

    this.print('\n' + player.board.getPrintableGrid());

    const shipLocationWithValidation = {
      ...userQuestions.SHIP_LOCATION,
      validate: (value) =>
        !this.shipPlacement(value, player, true)
          ? `Please enter valid coordinates.`
          : true
    };

    const { shipLocation } = await this.ask(shipLocationWithValidation);
    this.shipPlacement(shipLocation, player);
    return player;
  }

  printWinner() {
    this.print(`Awesome! ${this.currentPlayer.name} wins\n`);
    this.print('Final Battlefield\n');
    this.print(`~~~~~~${this.player1.name}'s Board~~~\n`);
    this.print(this.player1.board.getPrintableGrid(true));
    this.print(`~~~~~~${this.player2.name}'s Board~~~\n`);
    this.print(this.player2.board.getPrintableGrid(true));
  }

  async requestShot() {
    const shotWithValidation = {
      ...userQuestions.SHOT,
      validate: (value) =>
        this.isFireShotValid(value) ? `Please enter valid coordinates.` : true
    };

    const { shotLocation } = await this.ask(shotWithValidation);

    const coords = convert.toCoordinates(shotLocation);
    const { status, message } = this.targetPlayer.board.registerShot(coords);
    if (status === shotStatus.HIT) this.currentPlayer.hitShotFired();
    this.print(`\n${message}\n`);
  }

  isFireShotValid(value) {
    const coords = convert.toCoordinates(value);
    return !this.targetPlayer.board.isValidCoordinate(coords);
  }
}

module.exports = Game;
