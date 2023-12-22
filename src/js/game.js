import { Application } from "pixi.js";
import { KEYS, getRandomInRange } from "./utils";
import UI from "./ui";
import Asteroid from "./asteroid";

export default class Game extends Application {
    constructor() {
        super({
            width: 1280,
            height: 720
        });
        document.body.appendChild(this.view);

        this.currentKeys = {};
        this.onSpace = null;
        this.onReset = null;
        this.ui = new UI();

        this.init();

        this.asteroids = [];
        this.currentCountAsteroids = 0;
        this.maxBullets = 10;
        this.countDestroyedAsteroids = 0;
        this.isOver = false;

        this.bossExists = false;
        this.isLevel2 = false;
        this.isGame = false;
    }
    
    init() {
        this.bg = this.ui.getBackground(this.view.width, this.view.height);
        this.draw(this.bg);

        this.bulletsText = this.ui.createBulletsText(25, 10);
        this.draw(this.bulletsText);

        this.bigMessage = this.ui.createBigMessage(this.renderer.width / 2, this.renderer.height / 2);
        this.draw(this.bigMessage);

        this.countDown = this.ui.createCountDown(this.renderer.width - 65, 10, 60);
        this.draw(this.countDown);

        this.button = this.ui.createButton(this.stage.width / 2, this.stage.height - 35);
        this.button.on('pointerdown', () => this.startGame());
        this.draw(this.button);

        window.addEventListener('keydown', e => this.keysDown(e));
        window.addEventListener('keyup', e => this.keysUp(e));

    }

    getCurrentKeys() { return this.currentKeys; }

    setBulletsText(newText) {
        this.bulletsText.text = newText;
    }

    setBigMessage(newMessage) {
        this.bigMessage.text = newMessage;
        this.bigMessage.style.fill = '#fe015b';
    }

    startGame() {
        this.button.visible = false;
        this.button.eventMode = 'none';
        this.isGame = true;
        this.countDown.start();

        this.interval = setInterval(() => {
            const asteroid = new Asteroid(getRandomInRange(75, 1200));
            this.asteroids.push(asteroid);
            this.draw(asteroid);
            asteroid.fall();
            this.currentCountAsteroids++;
        }, getRandomInRange(1000, 6000));
    }

    updateAsteroids() {
        if (this.asteroids?.length > 0) {
            if (this.currentCountAsteroids == this.maxBullets) {
                clearInterval(this.interval);
                this.interval = null;
            }

            for (const i in this.asteroids) {
                const asteroid = this.asteroids[i];
                
                if (asteroid.isDestroyed || asteroid.isMissed) {
                    if (asteroid.isDestroyed) {
                        this.countDestroyedAsteroids += 1;
                    }

                    this.erase(asteroid);
                    this.asteroids.splice(i, 1);
                }
            }
        }
    }

    setYouLose() {
        this.isGame = false;
        this.reset();

        this.setBigMessage('YOU LOSE');
        this.button.visible = true;
        this.button.eventMode = 'static';
        this.button.on('pointerdown', () => this.startNewGame());
    }

    reset() {
        this.countDown.stop();
        if (this.interval) {
            clearInterval(this.interval);
            this.interval = null;
        }

        for (const asteroid of this.asteroids) {
            this.erase(asteroid);
        }
        this.asteroids = [];

    }

    startNewGame() {
        this.currentCountAsteroids = 0;
        this.countDestroyedAsteroids = 0;
        this.countDown.reset();
        this.bigMessage.style.fill = 'transparent';
        this.onReset();
        this.start();
        this.button.visible = false;
        this.button.eventMode = 'none';
    }

    startLevel2() {
        this.setBigMessage('LEVEL 2');
        this.tmpTimeout = setTimeout(() => {
            this.bigMessage.style.fill = 'transparent';
            clearTimeout(this.tmpTimeout);
        }, 1000);

        this.countDown.reset();
        this.setBulletsText(`bullets: 0 / ${this.maxBullets}`);
        this.button.visible = false;
        this.button.eventMode = 'none';

        this.isLevel2 = true;
    }

    setYouWin() { 
        this.setBigMessage('YOU WIN');
        this.countDown.stop();
    }

    draw(child) { child && this.stage.addChild(child); }

    erase(child) { child && this.stage.removeChild(child); }

    keysDown(e) {
        this.currentKeys[e.keyCode] = true;
    
        if (this.currentKeys[KEYS.SPACE] && this.onSpace && this.isGame) {
            this.onSpace();
        }
    }
    
    keysUp(e) { this.currentKeys[e.keyCode] = false; }
};