import Phaser from 'phaser';
import waterPng from './assets/water.png';
import landPng from './assets/land.png';
import playerPng from './assets/player.png';
import turtlePng from './assets/turtle.png';

let player;
let land;
let turtles;
let cursors;
let water;
let activeTurtle;

const playerDies = function (player) {
  player.destroy();
};

function preload () {
  this.load.image('water', waterPng); // 600 * 180
  this.load.image('land', landPng); // 130 * 50
  this.load.spritesheet('player', playerPng, { frameWidth: 20, frameHeight: 150 }); // 20 * 150
  this.load.image('turtle', turtlePng); // 20 * 150
}

function create () {
  water = this.physics.add.staticImage(400, 510, 'water');
  land = this.physics.add.staticGroup();
  land.create(65, 420, 'land');
  land.create(735, 420, 'land');

  turtles = this.physics.add.staticGroup({
    key: 'turtle',
    repeat: 4,
    setXY: { x: 200, y: 420, stepX: 100 },
  });

  player = this.physics.add.sprite(100, 325, 'player');
  this.physics.add.collider(player, land);
  cursors = this.input.keyboard.createCursorKeys();
  player.setData('moving', false);

  this.anims.create({
    key: 'jump',
    frames: this.anims.generateFrameNumbers('player', { start: 0, end: 6 }),
    frameRate: 9,
    repeat: 0,
  });

  this.physics.add.collider(player, turtles);
  this.physics.add.collider(player, water, playerDies, null, this);
}

function update () {
  if (!activeTurtle) {
    activeTurtle = Phaser.Math.Between(1, 2);
    console.log(activeTurtle);

    const turtle = turtles.getChildren()[activeTurtle - 1];

    this.tweens.timeline({
      targets: turtle.body.velocity,
      loop: 1,
      tweens: [
        { y: turtle.y + 100, duration: 750},
      ],
    });
    // this.tweens.add({
    //   targets: turtle.body.velocity,
    //   y: turtle.y + 100,
    //   duration: 750,
    //   yoyo: true,
    //   completeDelay: 1000,
    //   ease: 'Stepped',
    //   onComplete: () => {
    //     activeTurtle = null;
    //   },
    // });
  }
  if (!player.getData('moving')) {
    if (cursors.left.isDown && player.x > 100 && player.body.touching.down) {
      this.tweens.add({
        targets: player,
        x: player.x - 100,
        y: 325,
        duration: 750,
        onStart: () => {
          player.setData('moving', true);
        },
        onComplete: () => {
          player.setData('moving', false);
        },
      });

      player.anims.play('jump');
    } else if (cursors.right.isDown && player.x < 700 && player.body.touching.down) {
      this.tweens.add({
        targets: player,
        x: player.x + 100,
        y: 325,
        duration: 750,
        onStart: () => {
          player.setData('moving', true);
        },
        onComplete: () => {
          player.setData('moving', false);
        },
      });

      player.anims.play('jump');
    }
  };
}

export const Game = new Phaser.Game({
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: false,
    },
  },
  scene: {
    preload,
    create,
    update,
  },
});
