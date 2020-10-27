const convert = require('../helpers/convertToAlphabet');

class Board {
  constructor(width, height) {
    this.height = height;
    this.width = width;
    this.grid = generateGrid(width, height);
  }

  getPrintableGrid() {
    let printedGrid = '';
    printedGrid += generateTopRow(this.width) + '\n';
    for (let i = 0; i < this.height; i++) {
      let row = i + 1 + ' ';
      for (let cell of this.grid[i]) {
        row += cell + ' ';
      }
      printedGrid += row + '\n';
    }
    return printedGrid;
  }

  isValidCoordinate({ x, y }) {
    if (x < 0 || x >= this.width) {
      return false;
    }
    if (y < 0 || y >= this.height) {
      return false;
    }
    return true;
  }

  isShipPlaceable(ship) {
    for (let coord of ship.coords) {
      if (!this.isValidCoordinate(coord)) {
        return false;
      }
    }
    return true;
  }

  fireShot({ x, y }) {
    switch (true) {
      case !this.isValidCoordinate({ x, y }):
        return {
          status: 'invalid',
          message: 'invalid attack'
        };
      case this.grid[y][x] === '-':
        this.grid[y][x] = '*';
        return {
          status: 'miss',
          message: 'missed the target'
        };
      case this.grid[y][x] === 'O':
        this.grid[y][x] = '!';
        return {
          status: 'hit',
          message: 'successfully hit the target'
        };
      case this.grid[y][x] === '!' || this.grid[y][x] === '*':
        return {
          status: 'double hit',
          message: 'already hit this spot before'
        };
      default:
        return {
          status: 'failed',
          message: 'error firing shot'
        };
    }
  }

  placeShip(ship) {
    if (this.isShipPlaceable(ship)) {
      for (let coord of ship.coords) {
        this.grid[coord.y - 1][coord.x - 1] = 'O';
      }
    }
  }
}

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

const generateTopRow = (width) => {
  let topRow = '  ';
  for (let i = 0; i < width; i++) {
    topRow += convert.getAlpha(i) + ' ';
  }
  return topRow;
};

module.exports = Board;
