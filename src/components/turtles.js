import turtlePng from '../assets/turtle.png';

const TURTLE_KEY = 'turtle';

class Turtles {
  constructor (config) {
    this.initTurtles(config);
  }

  static preload (scene) {
    scene.load.image(
      TURTLE_KEY,
      turtlePng,
    );
  }

  initTurtles ({ scene, ...config }) {
    this.turtles = scene.physics.add.group(config);

    // this.turtles.children.iterate(function (child) {
    //   child.setBounceY();
    // })
  }

  getGroup () {
    return this.stars;
  }
}

export default Turtles;


// f (!activeTurtle) {
//     activeTurtle = Phaser.Math.Between(1, 2);
//     console.log(activeTurtle);
// 
//     const turtle = turtles.getChildren()[activeTurtle - 1];
// 
//     this.tweens.timeline({
//       targets: turtle.body.velocity,
//       loop: 1,
//       tweens: [
//         { y: turtle.y + 100, duration: 750},
//       ],
//     });
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
  // }