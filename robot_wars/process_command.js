const { commands } = require('./constants');

module.exports = function (commandsArray, robot) {
  commandsArray.forEach((command) => {
    switch (command.toUpperCase()) {
      case commands.L: {
        robot.rotateRobot(true);
        break;
      }
      case commands.R: {
        robot.rotateRobot(false);
        break;
      }
      case commands.M: {
        robot.moveRobot();
        break;
      }
    }
  });
};
