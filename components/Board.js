const convert = require('../helpers/convertInput');
const { shotStatus, userMessages } = require('../helpers/constants');

class Board {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.grid = generateGrid(width, height);
  }

  //return the printable version of the ship
  getPrintableGrid(revealShips = false) {
    let printedGrid = '';
    printedGrid += generateTopRow(this.width) + '\n';
    for (let i = 0; i < this.height; i++) {
      let row = i + 1 + ' ';
      for (let cell of this.grid[i]) {
        if (!revealShips && cell === 'O') {
          row += '- ';
        } else {
          row += cell + ' ';
        }
      }
      printedGrid += row + '\n';
    }
    return printedGrid;
  }

  //regiser the shot on the board
  registerShot({ x, y }) {
    switch (true) {
      case this.grid[y][x] === '-':
        this.updateCell({ x, y }, '*');
        return {
          status: shotStatus.MISSED,
          message: userMessages.MISSED
        };
      case this.grid[y][x] === 'O':
        this.updateCell({ x, y }, '!');
        return {
          status: shotStatus.HIT,
          message: userMessages.HIT
        };
      case this.grid[y][x] === '!' || this.grid[y][x] === '*':
        return {
          status: shotStatus.DOUBLE_HIT,
          message: userMessages.DOUBLE_HIT
        };
    }
  }

  //check if given x,y is valid for the board or not
  isValidCoordinate({ x, y }) {
    if (x < 0 || x >= this.width) {
      return false;
    }
    if (y < 0 || y >= this.height) {
      return false;
    }
    return true;
  }

  //check if given ship can be placed on the board or not
  isShipPlaceable(ship) {
    for (let coord of ship.coords) {
      if (!this.isValidCoordinate(coord)) {
        return false;
      }
    }
    return true;
  }

  //places the ship on the grid
  placeShip(ship) {
    if (this.isShipPlaceable(ship)) {
      for (let coord of ship.coords) {
        this.grid[coord.y][coord.x] = 'O';
      }
    }
  }

  //utitlity function to update the cell inside the gril
  updateCell({ x, y }, toUpdate) {
    this.grid[y][x] = toUpdate;
  }
}

//helper functions
// to generate X*Y grid
const generateGrid = (width, height) => {
  let grid = [];
  for (let i = 0; i < height; i++) {
    grid[i] = [];
    for (let j = 0; j < width; j++) {
      grid[i][j] = '-';
    }
  }
  return grid;
};

//to generate the top row containing alphabets
const generateTopRow = (width) => {
  let topRow = '  ';
  for (let i = 0; i < width; i++) {
    topRow += convert.getAlpha(i) + ' '; //convert numbers to alphabet 0 => a , 1 =>  b etc
  }
  return topRow;
};

module.exports = Board;
