const Robot = require('../robot_wars/robot');
const Arena = require('../robot_wars/arena');
const processCommand = require('../robot_wars/process_command');
const {
  validateCoords,
  validateInitialPosition,
  validateCommand,
} = require('../robot_wars/validate_input');

describe('Robot Suite', () => {
  test('Setting Up the Arena with wrong coords', (done) => {
    const [xmax, ymax] = validateCoords('5 D');
    const arena = new Arena(xmax, ymax);
    const areanWidth = [arena.xmax, arena.ymax];
    expect(areanWidth).toEqual([null, null]);
    done();
  });

  test('Setting Up the Arena with wrong coords', (done) => {
    const [xmax, ymax] = validateCoords('5 ');
    const arena = new Arena(xmax, ymax);
    const areanWidth = [arena.xmax, arena.ymax];
    expect(areanWidth).toEqual([null, null]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2');

    expect(initialPosition).toEqual([null, null, null]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, N');

    expect(initialPosition).toEqual([null, null, null]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2, 2');

    expect(initialPosition).toEqual([null, null, null]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2, N');

    expect(initialPosition).toEqual([1, 2, 1]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2, E');

    expect(initialPosition).toEqual([1, 2, 2]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2, S');

    expect(initialPosition).toEqual([1, 2, 4]);
    done();
  });

  test('Setting Up initial robot location', (done) => {
    const initialPosition = validateInitialPosition('1, 2, W');

    expect(initialPosition).toEqual([1, 2, 8]);
    done();
  });

  test('Setting Up the Arena', (done) => {
    const [xmax, ymax] = validateCoords('5 5');
    const arena = new Arena(xmax, ymax);
    const areanWidth = [arena.xmax, arena.ymax];
    expect(areanWidth).toEqual([5, 5]);
    done();
  });

  const [xmax, ymax] = validateCoords('5 5');
  const arena = new Arena(xmax, ymax);

  test('Cheching the robots movement for LMLMLMLMM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 2 N');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('LMLMLMLMMGGGGG');
    expect(commandsArray).toEqual([]);
    done();
  });

  test('Cheching the robots movement for LMLMLMLMM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 2 N');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('');
    expect(commandsArray).toEqual([]);
    done();
  });

  test('Cheching the robots movement for LMLMLMLMM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 2 N');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('LMLML MLMM');
    expect(commandsArray).toEqual([]);
    done();
  });

  test('Cheching the robots movement for LMLMLMLMM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 2 N');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('LMLMLMLMM');
    expect(commandsArray).toEqual([
      'L',
      'M',
      'L',
      'M',
      'L',
      'M',
      'L',
      'M',
      'M',
    ]);
    done();
  });

  test('Cheching the robots movement for LMLMLMLMM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 2 N');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('LMLMLMLMM');
    processCommand(commandsArray, robot);
    expect(robot.getCurrentPosition()).toEqual('1 3 N');
    done();
  });

  test('Cheching the robots movement for MMRMMRMRRM', (done) => {
    const [x, y, dir] = validateInitialPosition('3 3 E');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('MMRMMRMRRM');
    processCommand(commandsArray, robot);
    expect(robot.getCurrentPosition()).toEqual('5 1 E');
    done();
  });

  test('Cheching the robots movement for MMRMMRMRRM', (done) => {
    const [x, y, dir] = validateInitialPosition('1 1 S');
    const robot = new Robot(arena, x, y, dir);
    const commandsArray = validateCommand('MMM');
    processCommand(commandsArray, robot);
    expect(robot.getCurrentPosition()).toEqual('1 0 S');
    done();
  });
});
