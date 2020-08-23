import landPng from '../assets/land.png';
import { LAND_KEY } from '../constants';

const Land = {
  preload: scene => {
    scene.load.image(LAND_KEY, landPng); // 600 * 180
  },
  init: ({ scene, positions }) => {
    const land = scene.physics.add.staticGroup();
    for (const position of positions) {
      land.create(position.x, position.y, LAND_KEY);
    }
    return land;
  },
};

export default Land;
