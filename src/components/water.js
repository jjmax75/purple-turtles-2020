import waterPng from '../assets/water.png';
import { WATER_KEY } from '../constants';

const Water = {
  preload: scene => {
    scene.load.image(WATER_KEY, waterPng); // 600 * 180
  },
  init: ({ scene, position }) => {
    scene.physics.add.staticImage(position.x, position.y, WATER_KEY);
  },
};

export default Water;
