const Player = require('./Player');
const Ship = require('./Ship');

const convert = require('../helpers/convertInput');

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

  async setupPlayer(playerRoaster) {
    let player = {};

    //board settings
    const boardWidth = settings.WIDTH;
    const boardHeight = settings.HEIGHT;

    this.print(`\n\n${playerRoaster} get ready!\n=================\n`);

    const { name, isShipHorizontal } = await this.ask(
      userQuestions.PREFERENCES
    );

    //intialize the player object
    player = new Player({ name, isShipHorizontal, boardWidth, boardHeight });

    this.print('\n' + player.board.getPrintableGrid());

    //ask user for the location to place the ship
    const shipLocationWithValidation = {
      ...userQuestions.SHIP_LOCATION,
      validate: (value) =>
        !this.shipPlacement(value, player, true)
          ? `Please enter valid target cell coordinates (it's 3 cell wide). e.g. a1`
          : true
    };
    const { shipLocation } = await this.ask(shipLocationWithValidation);

    //place the ship on the player board
    this.shipPlacement(shipLocation, player);
    return player;
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

  //places the ship on the player's board
  // if validation flag is passed, just return true or false based on if ship can be placed on the board or not
  shipPlacement(value, player, validation = false) {
    // convert input to coordinates ( e.g. a1 > 0,0)
    const { x, y } = convert.toCoordinates(value);
    //invalid input
    if (validation) {
      if (isNaN(x) || isNaN(y)) return false;
    }
    const ship = new Ship(
      { x, y },
      settings.SHIP_LENGTH,
      player.isShipHorizontal
    );
    //check if ship is not placeable on the board or not
    if (validation) return player.board.isShipPlaceable(ship);
    player.board.placeShip(ship);
  }

  async newRound() {
    this.print('\n========== New Round =========\n');
    this.print(`${this.currentPlayer.name} get ready! It's your turn!\n`);
    await this.requestPlayerShot();
    this.print(`~~~ ${this.targetPlayer.name}'s (Enemy) Board ~~~\n`);
    this.print(this.targetPlayer.board.getPrintableGrid());
    if (!this.isGameOver()) this.togglePlayers();
  }

  async requestPlayerShot() {
    //ask user for input for registering the shot & validates it
    const shotWithValidation = {
      ...userQuestions.SHOT,
      validate: (value) =>
        this.isFireShotValid(value)
          ? `Please enter valid target cell coordinates. e.g. a1`
          : true
    };
    const { shotLocation } = await this.ask(shotWithValidation);
    // convert input to coordinates ( e.g. a1 > 0,0)
    const coords = convert.toCoordinates(shotLocation);
    // send the shot to the player's board and get back the status & message
    const { status, message } = this.targetPlayer.board.registerShot(coords);
    // if shot is hit
    if (status === shotStatus.HIT) this.currentPlayer.hitShotFired();
    // print the message  if shot is hit, missed or double hit
    this.print(`\n${message}\n`);
  }

  //check if shot entered is valid or not
  isFireShotValid(value) {
    // convert input to coordinates ( e.g. a1 > 0,0)
    const { x, y } = convert.toCoordinates(value);
    return (
      isNaN(x) ||
      isNaN(y) ||
      !this.targetPlayer.board.isValidCoordinate({ x, y })
    );
  }

  printWinner() {
    this.print(
      `Awesome! You have sunk the Enemy ship! ${this.currentPlayer.name} wins!\n`
    );
    this.print('Final Battlefield View\n==================\n');
    this.print(`~~~ ${this.player1.name}'s Board ~~~\n`);
    this.print(this.player1.board.getPrintableGrid(true));
    this.print(`~~~ ${this.player2.name}'s Board ~~~\n`);
    this.print(this.player2.board.getPrintableGrid(true));
  }
}

module.exports = Game;
