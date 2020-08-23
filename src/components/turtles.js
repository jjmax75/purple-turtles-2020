import { getRandomInt } from '../utils';
import { TURTLE_KEY } from '../constants';
import turtlePng from '../assets/turtle.png';

const Turtles = {
  preload: scene => {
    scene.load.image(
      TURTLE_KEY,
      turtlePng,
    );
  },
  init: ({ scene, ...config }) => scene.physics.add.group(config),
  update: (scene, turtles, activeTurtles) => {
    if (!activeTurtles.length) {
      const index = getRandomInt(0, 5);
      activeTurtles.push(turtles.children.entries[index]);
      scene.tweens.timeline({
        targets: activeTurtles[0],
        loop: 0,
        tweens: [
          { y: 520, duration: 1500, ease: 'Linear', delay: 500 },
          {
            y: 420,
            duration: 1000,
            ease: 'Linear',
            onComplete: () => {
              activeTurtles.pop(0);
            },
          },
        ],
      });
    }
  },
};

export default Turtles;
