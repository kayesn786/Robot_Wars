const { directions, commands } = require('./constants');

/*
  args: string | Array[<int>, <int>] 
  return: [int|null, int|null]
*/
const validateCoords = (coords) => {
  //Remove the trailing white spaces and aignore white spaces in between characters
  //This returns an array of chars
  let _coords;
  if (coords instanceof Array) {
    _coords = coords;
  } else {
    _coords = coords
      .trim()
      .split(/(\s+)/)
      .filter((e) => e.trim().length > 0);
  }
  //The length of the array should be equal to two
  if (_coords.length === 2) {
    const xmax = parseInt(_coords[0]);
    const ymax = parseInt(_coords[1]);

    //If any one of the input is not a number, return null
    if (isNaN(xmax) || isNaN(ymax)) {
      console.error(
        `Co-ordinates <x, y>: Expected integer, received ${
          (typeof _coords[0], typeof _coords[1])
        }`
      );
      return [null, null];
    }
    if (xmax === 0 && ymax === 0) {
      console.error('Width if the arena cannot be zero');
      return [null, null];
    }
    return [xmax, ymax];
  } else {
    console.error(
      `Expected 2 arguments <xmax, ymax>, received ${_coords.length}`
    );
    return [null, null];
  }
};

/*
  args: string
  return: [null|int, null|int, null|int]
*/
const validateInitialPosition = (position) => {
  //Remove the trailing white spaces and aignore white spaces in between characters
  //This returns an array of chars
  const _position = position
    .trim()
    .split(/(\s+)/)
    .filter((e) => e.trim().length > 0);

  if (_position.length === 3) {
    const coords = validateCoords(_position.slice(0, 2));
    const _direction = _position[2].toUpperCase();
    if (!directions[_direction]) {
      console.error('Direction should be either of <N|S|E|W>');
      return [null, null, null];
    }
    return [...coords, directions[_direction]];
  } else {
    console.error(
      `Expected 3 arguments <x y direction>, received: ${_position.length}`
    );
    return [null, null, null];
  }
};

/*
  args: string
  return: Array[] | Array[<char>]
*/
const validateCommand = (commandStr) => {
  const commandArray = commandStr.trim().split('');
  if (!commandArray.length) {
    console.error('Expected atleast one command, received 0');
    return [];
  }
  //Check if all the commands are either of L|R|M
  const isValid = commandArray.every((cmd, index) => {
    if (!commands[cmd.toUpperCase()]) {
      console.error(
        `Invalid Command, expected <L|R|M>, found ${cmd} at position ${index}`
      );
      return false;
    }
    return true;
  });
  //return empty if any of the character is not a valid command
  if (!isValid) {
    return [];
  }
  return commandArray;
};

module.exports = {
  validateCoords,
  validateInitialPosition,
  validateCommand,
};
