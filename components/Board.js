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
      let rowStr = i + 1 + ' ';
      for (let cell of this.grid[i]) {
        rowStr += cell + ' ';
      }
      printedGrid += rowStr + '\n';
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
    topRow += i + 1 + ' ';
  }
  return topRow;
};

module.exports = Board;
