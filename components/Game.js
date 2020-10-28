const Player = require('./Player');
const Ship = require('./Ship');

const convert = require('../helpers/convertToAlphabet');

const { userQuestions, settings } = require('../helpers/constants');

class Game {
  constructor({ print, ask }) {
    this.player1 = {};
    this.player2 = {};
    this.currentPlayer = {};
    this.targetPlayer = {};
    this.print = print;
    this.ask = ask;
  }

  isGameOver() {
    return this.player1.isWon || this.player2.isWon;
  }

  async start() {
    this.print('\nWelcome to the battleShip Wars! This is a two player game.');
    this.print('\n\nGood Job! Time to fire up the cannons!\n');

    this.player1 = await this.setupPlayer('Player 1');
    this.player2 = await this.setupPlayer('Player 2');

    this.currentPlayer = this.player1;
    this.targetPlayer = this.player2;

    /*  while (!this.isGameOver()) {
      await this.requestShots();
    }


    console.log(`Awesome! ${this.currentPlayer.name} wins\n`);
    console.log('Final Battlefield\n');
    console.log(`~~~~~~${this.player1.name}'s Board~~~\n`);
    console.log(this.player1.board.getPrintableGrid(true));
    console.log(`~~~~~~${this.player2.name}'s Board~~~\n`);
    console.log(this.player2.board.getPrintableGrid(true)); */
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

  async setupPlayer(playerRoaster) {
    let player = {};
    this.print(`\n\n${playerRoaster} get ready!\n=================\n`);
    const { name, isShipHorizontal } = await this.ask(
      userQuestions.PREFERENCES
    );

    player = new Player({ name, isShipHorizontal });
    this.print('\n' + player.board.getPrintableGrid());

    const shipLocationWithValidation = {
      ...userQuestions.SHIP_LOCATION,
      validate: (value) =>
        !this.shipPlacement(value, player, true)
          ? `Please enter valid coordinates.`
          : true
    };

    const { shipLocation } = await this.ask(shipLocationWithValidation);

    console.log(shipLocation);
    this.shipPlacement(shipLocation, player);
    console.log(player);
    return player;
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
}

module.exports = Game;
