const { directions } = require('./constants');

module.exports = class Robot {
  constructor(arena, x = 0, y = 0, direction = directions.N) {
    this.arena = arena;
    this.x = x;
    this.y = y;
    this.direction = direction;
  }
  //method to increment or decrement the x and y positions
  moveRobot() {
    switch (this.direction) {
      case directions.N: {
        if (this.y < this.arena.ymax) {
          this.y++;
        } else {
          console.warn('Already at ymax boundry, Skipping a move');
        }
        break;
      }
      case directions.E: {
        if (this.x < this.arena.xmax) {
          this.x++;
        } else {
          console.warn('Already at xmax boundry, Skipping a move');
        }
        break;
      }

      case directions.S: {
        if (this.y > 0) {
          this.y--;
        } else {
          console.warn('Already at ymin boundry, Skipping a move');
        }
        break;
      }

      case directions.W: {
        if (this.x > 0) {
          this.x--;
        } else {
          console.warn('Already at xmin boundry, Skipping a move');
        }
        break;
      }
    }
  }

  rotateRobot(rotateLeft = true) {
    //Two types of rotations, clockwise and anti clockwise
    // making use of left shift and right shift operator to change the direction
    if (rotateLeft) {
      this.direction =
        this.direction === directions.N ? directions.W : this.direction >> 1;
    } else {
      this.direction =
        this.direction === directions.W ? directions.N : this.direction << 1;
    }
  }

  getCurrentPosition() {
    //Get the direction key with help of its value
    const _direction = Object.entries(directions).find(
      ([key, val]) => val === this.direction
    );
    return [this.x, this.y, _direction[0]].join(' ');
  }
};
