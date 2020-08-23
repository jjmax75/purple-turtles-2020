import playerPng from '../assets/player.png';
import { JUMP_ANIMATION, PLAYER_KEY } from '../constants';

const Player = {
  preload: scene => {
    scene.load.spritesheet(
      PLAYER_KEY,
      playerPng,
      { frameWidth: 20, frameHeight: 150 },
    );
  },
  init: ({ scene, position }) => {
    const player = scene.physics.add.sprite(position.x, position.y, PLAYER_KEY);
    player.setData('moving', false);

    return player;
  },
  animations: scene => {
    scene.anims.create({
      key: JUMP_ANIMATION,
      frames: scene.anims.generateFrameNumbers(PLAYER_KEY, { start: 0, end: 6 }),
      frameRate: 9,
      repeat: 0,
    });
  },
  update: (scene, player) => {
    if (!player.getData('moving') && player.body.touching.down) {
      const cursors = scene.input.keyboard.createCursorKeys();

      if (cursors.left.isDown && player.x > 100) {
        scene.tweens.add({
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
      } else if (cursors.right.isDown && player.x < 700) {
        scene.tweens.add({
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
  },
};

export default Player;
