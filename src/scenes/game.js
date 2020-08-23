import Phaser from 'phaser';

import Turtles from '../components/turtles';
import Player from '../components/player';
import Water from '../components/water';
import Land from '../components/land';

let turtles;
let player;
let water;
let land;

class GameScene extends Phaser.Scene {
  constructor () {
    super({
      key: 'Game',
    });
  }

  preload () {
    Turtles.preload(this);
    Player.preload(this);
    Water.preload(this);
    Land.preload(this);
  }

  create () {
    water = createWater(this);
    land = createLand(this);
    turtles = createTurtles(this);
    player = createPlayer(this);
    initPhysics(player, turtles, water, land, this);
    initAnimations(this);
  }

  update () {
    Player.update(this, player);
  }
}

function initPhysics (player, turtles, water, land, phaser) {
  phaser.physics.add.collider(player, land);
  phaser.physics.add.collider(player, turtles);
  phaser.physics.add.collider(player, water);
  // this.physics.add.collider(player, water, playerDies, null, this);
}

function initAnimations (phaser) {
  Player.animations(phaser);
}

function createTurtles (phaser) {
  return Turtles.init({
    scene: phaser,
    key: 'turtle',
    repeat: 4,
    setXY: { x: 200, y: 420, stepX: 100, stepY: 10 },
    immovable: true,
    allowGravity: false,
  });
};

function createPlayer (phaser) {
  return Player.init({
    scene: phaser,
    position: {
      x: 100,
      y: 300, // y: 325
    },
  });
};

function createWater (phaser) {
  return Water.init({
    scene: phaser,
    position: {
      x: 400,
      y: 510,
    },
  });
}

function createLand (phaser) {
  return Land.init({
    scene: phaser,
    positions: [
      { x: 65, y: 420 },
      { x: 735, y: 420 },
    ],
  });
}

// const playerDies = function (player) {
//   player.destroy();
// };

export default GameScene;
