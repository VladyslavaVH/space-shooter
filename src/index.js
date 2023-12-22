import { KEYS } from './js/utils';
import Game from './js/game';
import Rocket from './js/rocket';
import Boss from './js/boss';

const game = new Game();

const rocket = new Rocket();
game.onSpace = () => rocket.fireBullet();
game.onReset = () => rocket.resetBullets();
game.draw(rocket);

let boss = new Boss();

// Game Loop
game.ticker.add(() => {
    const currentKeys = game.getCurrentKeys();

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
            //game.setYouWin();
            game.startLevel2();
            rocket.resetBullets();
        }
    }

    if (game.isLevel2) {
        if (!game.bossExists) {
            game.draw(boss);
            game.draw(boss.getHealthBar());
            game.bossExists = true;
        } else {
            if (boss.hitPoints === 0) {
                game.setYouWin();
                eraseBoss(boss, game);
            } else {
                boss.attack();
            }
        }
    }

    if (rocket.isCollision() || 
       (time == 0 && game.countDestroyedAsteroids < game.maxBullets)
       || rocket.isDestroyed) {
        game.setYouLose();

        if (game.isLevel2 && game.bossExists) {
            eraseBoss(boss, game);
        }
    }
});

function eraseBoss(boss, game) {
    boss.clearIntervals();
    boss.resetBullets();
    game.erase(boss.healthBar);
    game.erase(boss);
}
 