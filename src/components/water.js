import waterPng from '../assets/water.png';

const WATER_KEY = 'water';

class Water {
  constructor (config) {
    this.initWater(config);
  }

  static preload (scene) {
    scene.load.image(WATER_KEY, waterPng); // 600 * 180
  }

  initWater ({ scene, position }) {
    scene.physics.add.staticImage(position.x, position.y, WATER_KEY);
  }
};

export default Water;
