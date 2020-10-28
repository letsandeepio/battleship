async function askShipLocation(prompter, validator) {
  const response = await prompts({
    type: 'text',
    name: 'value',
    message: 'Where would you like to place your Ship?',
    validate: (value) =>
      !this.shipPlacement(value, true)
        ? `Please enter valid coordinates.`
        : true
  });
  return response.value;
}
