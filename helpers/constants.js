const settings = {
  HEIGHT: 8,
  WIDTH: 8,
  SHIP_LENGTH: 3
};

const shotStatus = {
  MISSED: 'MISSED',
  HIT: 'HIT',
  DOUBLE_HIT: 'DOUBLE_HIT'
};

const userMessages = {
  MISSED: 'Uh ho! You missed the shot :(',
  HIT: 'Good Job! You succesfully hit the enemy ship!',
  DOUBLE_HIT: 'Uh ho! You have hit that spot already!'
};

module.exports = { settings, shotStatus, userMessages };
