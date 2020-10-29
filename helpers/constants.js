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
  MISSED: '❌ Uh Oh! You missed the shot :(',
  HIT: '✅ Good Job! You succesfully hit the enemy ship! 🔥',
  DOUBLE_HIT: ' 🏴‍☠️ Uh Oh! You have hit that spot already!'
};

const userQuestions = {
  PREFERENCES: [
    {
      type: 'text',
      name: 'name',
      message: 'Please type your name?',
      validate: (value) =>
        !value ? 'Please enter a valid name to continue.' : true
    },
    {
      type: 'select',
      name: 'isShipHorizontal',
      message: 'How would you liked to place your ship?',
      choices: [
        { title: 'Horizontal', value: true },
        { title: 'Vertical', value: false }
      ]
    }
  ],
  SHIP_LOCATION: {
    type: 'text',
    name: 'shipLocation',
    message:
      'Please enter target cell you would like to place your ship? e.g. a1, d5 etc'
  },
  SHOT: {
    type: 'text',
    name: 'shotLocation',
    message:
      'Please enter the target cell you would like to attack? e.g a1, d5 etc'
  }
};

module.exports = { settings, shotStatus, userMessages, userQuestions };
