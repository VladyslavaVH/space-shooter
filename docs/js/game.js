import { Application } from "pixi.js";
import { KEYS } from "./utils";
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
        this.ui = new UI(this);

        this.init();

        this.asteroids = [];
        this.currentCountAsteroids = 0;
        this.maxBullets = 10;
        this.countDestroyedAsteroids = 0;
        this.isOver = false;
    }
    
    init() {
        this.ui.setBackground();

        this.bulletsText = this.ui.createBulletsText();
        this.bigMessage = this.ui.createBigMessage();
        this.countDown = this.ui.createCountDown();
        this.button = this.ui.createButton();

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

    startGame(e) {
        e.target.visible = false;
        e.target.useMode = 'none';
        this.countDown.start();

        this.interval = setInterval(() => {
            const asteroid = new Asteroid(this.getRandomInRange(75, 1200));
            this.asteroids.push(asteroid);
            this.draw(asteroid);
            asteroid.fall();
            this.currentCountAsteroids++;
        }, this.getRandomInRange(1000, 6000));
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
        this.reset();

        this.setBigMessage('YOU LOSE');
        this.button.useMode = 'dinamic';
        this.button.visible = true;
        this.button.on('pointerdown', e => this.startNewGame(e));
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

    startNewGame(e) {
        e.target.visible = false;
        e.target.useMode = 'none';
        this.currentCountAsteroids = 0;
        this.countDestroyedAsteroids = 0;
        this.countDown.reset();
        this.bigMessage.style.fill = 'transparent';
        this.onReset();
        this.start();
    }

    setYouWin() { this.setBigMessage('YOU WIN'); }

    draw(child) { child && this.stage.addChild(child); }

    erase(child) { child && this.stage.removeChild(child); }

    keysDown(e) {
        this.currentKeys[e.keyCode] = true;
    
        if (this.currentKeys[KEYS.SPACE] && this.onSpace) {
            this.onSpace();
        }
    }
    
    keysUp(e) { this.currentKeys[e.keyCode] = false; }
    
    getRandomInRange(min, max) { return Math.floor(Math.random() * (max - min)) + min; }
};