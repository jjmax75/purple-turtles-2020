import landPng from '../assets/land.png';

const LAND_KEY = 'land';

class Land {
  constructor (config) {
    this.initLand(config);
  }

  static preload (scene) {
    scene.load.image(LAND_KEY, landPng); // 600 * 180
  }

  initLand ({ scene, positions }) {
    this.land = scene.physics.add.staticGroup();
    for (const position of positions) {
      this.land.create(position.x, position.y, LAND_KEY);
    }
  }

  getGroup () {
    return this.platforms;
  }
};

export default Land;
