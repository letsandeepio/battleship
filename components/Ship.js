class Ship {
  constructor(x, y, length, isHorizontal) {
    this.x = x;
    this.y = y;
    this.length = length;
    this.isHorizontal = isHorizontal;
    this.coords = [];
    for (let i = 0; i < length; i++) {
      const newCoordinate = {
        x: isHorizontal ? x + i : x,
        y: isHorizontal ? y : y + i
      };
      this.coords.push(newCoordinate);
    }
  }
}

module.exports = Ship;
