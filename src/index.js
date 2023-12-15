import Game from './js/game';
import Rocket from './js/rocket';
import { KEYS, POINTS } from './js/utils';

const game = new Game();

const rocket = new Rocket({
    x: game.renderer.width / 2, 
    y: POINTS.BOTTOM - 160
});
game.draw(rocket);
game.onSpace = () => rocket.fireBullet();
game.onReset = () => rocket.resetBullets();

// Game Loop
game.ticker.add(() => {
    let currentKeys = game.getCurrentKeys();

    if (currentKeys[KEYS.LEFT]) {
        rocket.moveLeft();
    } else if (currentKeys[KEYS.RIGHT]) {
        rocket.moveRight();
    } 

    rocket.updateBullets();
    game.setBulletsText(`bullets: ${rocket.shoots} / ${rocket.maxBullets}`);

    game.updateAsteroids();

    const time = game.countDown.getCurrentTime();
    if (time >= 0) {
        if (game.countDestroyedAsteroids == game.maxBullets) {
            game.setYouWin();
        }
    }

    if (rocket.isCollision() || 
       (time == 0 && game.countDestroyedAsteroids < game.maxBullets)) {
        game.setYouLose();
    }
});
 