import Phaser from 'phaser';

import playerPng from '../assets/player.png';

const PLAYER_KEY = 'player';
const JUMP_ANIMATION = 'jump';

class Player extends Phaser.GameObjects.Sprite {
  constructor (config) {
    super(config.scene, config.x, config.y, PLAYER_KEY);
    this.initAnimations(config.scene);
    this.initPlayer(config.scene);
  }

  static preload (scene) {
    scene.load.spritesheet(
      PLAYER_KEY,
      playerPng,
      { frameWidth: 20, frameHeight: 150 },
    );
  }

  initPlayer (scene) {
    scene.physics.world.enable(this);
    scene.add.existing(this);
    this.setData('moving', false);
  }

  initAnimations (scene) {
    scene.anims.create({
      key: JUMP_ANIMATION,
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, { start: 0, end: 6 }),
      frameRate: 9,
      repeat: 0,
    });
  }

  update (scene) {
    const cursors = this.scene.input.keyboard.createCursorKeys();

    if (!this.getData('moving')) {
      if (cursors.left.isDown && this.x > 100 && this.body.touching.down) {
        scene.tweens.add({
          targets: this,
          x: this.x - 100,
          y: 325,
          duration: 750,
          onStart: () => {
            this.setData('moving', true);
          },
          onComplete: () => {
            this.setData('moving', false);
          },
        });

        this.anims.play('jump');
      } else if (cursors.right.isDown && this.x < 700 && this.body.touching.down) {
        scene.tweens.add({
          targets: this,
          x: this.x + 100,
          y: 325,
          duration: 750,
          onStart: () => {
            this.setData('moving', true);
          },
          onComplete: () => {
            this.setData('moving', false);
          },
        });

        this.anims.play('jump');
      }
    };
  }
}

export default Player;
