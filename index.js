const readline = require('readline');
const Robot = require('./robot_wars/robot');
const Arena = require('./robot_wars/arena');
const processCommand = require('./robot_wars/process_command');
const {
  validateCoords,
  validateInitialPosition,
  validateCommand,
} = require('./robot_wars/validate_input');

//Initilazing the stdout and stdin
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});
const prompt = (query) => new Promise((resolve) => rl.question(query, resolve));

const readInput = async () => {
  try {
    //Fetch the maximum size (xmax, ymax) of the arena, left most position is (0, 0)
    const maxCoords = await prompt(
      'Enter the Arena maximum width and height seperated by spaces\n'
    );
    /*
    validateCoords return an array of [null, null] in case of invalid args, 
    or an array of [xmax, ymax] in case of valid input 
    */
    const [xmax, ymax] = validateCoords(maxCoords);
    //If either of the one value is not corrent, exit
    if (!xmax) {
      rl.close();
    }
    //Initiating the arena object
    const arena = new Arena(xmax, ymax);

    //Fetch the initial position of the robot
    const initialPosition = await prompt(
      'Enter the initial position of the Robot x y direction(N | S | E | W) seperated by spaces\n'
    );
    // returns [null, null, null] in case of invalid input
    const [x, y, direction] = validateInitialPosition(initialPosition);
    if (!x) {
      rl.close();
    }

    if (x < 0 || x > arena.xmax || y < 0 || y > arena.ymax) {
      console.error('Initial position cannot be outside the Arena');
      rl.close();
    }
    //create a robot instance
    const robot = new Robot(arena, x, y, direction);
    const commands = await prompt(
      'Enter the Robot instructions with a sequence of L(rotate Left), R(rotate right) and M(move forward) \n'
    );

    const commandsArray = validateCommand(commands);
    if (!commandsArray.length) {
      rl.close();
    }

    processCommand(commandsArray, robot);

    console.log(robot.getCurrentPosition());

    rl.close();
  } catch (e) {
    console.error('Unable to prompt', e);
  }
};

rl.on('close', () => process.exit(0));

readInput();
// const r = new robot();
// r.print();
