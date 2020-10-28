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

const userQuestions = {
  PREFERENCES: [
    {
      type: 'text',
      name: 'name',
      message: 'What is your name?',
      validate: (value) => (!value ? 'Please enter a name to continue' : true)
    },
    {
      type: 'select',
      name: 'orientation',
      message: 'How would you liked to place your ship?',
      choices: [
        { title: 'Horizontal', value: true },
        { title: 'Vertical', value: false }
      ]
    }
  ]
};

module.exports = { settings, shotStatus, userMessages, userQuestions };
