import Phaser from 'phaser';

import GameScene from './scenes/game';

export default {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 300 },
      debug: true,
    },
  },
  scene: [
    GameScene,
  ],
};
