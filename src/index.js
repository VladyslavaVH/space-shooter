import { KEYS } from './js/utils/utils';
import Game from './js/game';
import Rocket from './js/rocket';

const currentKeys = {};
window.onload = function () {
    const game = new Game();

    const rocket = new Rocket();
    game.onReset = () => rocket.resetBullets();
    game.draw(rocket);

    game.ticker.add(gameLoop);

    function gameLoop() {
        if (currentKeys[KEYS.LEFT]) {
            rocket.moveLeft();
        } else if (currentKeys[KEYS.RIGHT]) {
            rocket.moveRight();
        } 
        
        rocket.updateBullets();
        game.setBulletsText(`bullets: ${rocket.shoots} / ${rocket.maxBullets}`);
        
        if ((rocket.isCollision() || rocket.isDestroyed) && !game.isOver && game.isGame) {
            game.setYouLose();
        
            rocket.setIsDestroyed(false);
        }
        
        game.updateLevels();
    }

    window.addEventListener('keydown', keysDown);
    window.addEventListener('keyup', keysUp);

    function keysDown(e) {
        currentKeys[e.keyCode] = true;

        if (currentKeys[KEYS.SPACE] && game.isGame) {
            if (rocket) {
                rocket.fireBullet();
            }
        }
    }

    function keysUp(e) { currentKeys[e.keyCode] = false; }
}