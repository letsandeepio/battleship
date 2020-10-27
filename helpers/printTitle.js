const figlet = require('figlet');

async function printTitle() {
  return new Promise((resolve, reject) => {
    figlet('Battleship', { font: 'Larry 3D', width: 90 }, function (err, data) {
      if (err) {
        reject(err);
      }
      resolve(data);
    });
  });
}

module.exports = printTitle;
