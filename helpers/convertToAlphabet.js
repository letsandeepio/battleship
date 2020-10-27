const convert = {
  getAlpha: (number) => {
    return String.fromCharCode(number + 65);
  },
  toCoordinates: function toPositionFromString(value) {
    const str = value.toUpperCase();
    const x = str.charCodeAt(0) - 65;
    const y = Number(str.slice(1)) - 1;
    return { x, y };
  }
};

module.exports = convert;
