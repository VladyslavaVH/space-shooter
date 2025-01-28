import { Application } from 'pixi.js';
import { POINTS, getRandomInRange } from './utils/utils';
import UI from './utils/ui';
import Asteroid from './asteroid';
import Boss from './boss';

export default class Game extends Application {
    constructor() {
        super({
            width: POINTS.RIGHT,
            height: POINTS.BOTTOM
        });
        document.body.appendChild(this.view);

        this.onReset = null;
        this.ui = new UI();

        this.init();

        this.asteroids = [];
        this.currentCountAsteroids = 0;
        this.maxBullets = 10;
        this.countDestroyedAsteroids = 0;
        
        this.isGame = false;
        this.isOver = false;
        
        this.level = 1;
        this.maxLevel = 2;

        this.boss = null;
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

        this.button = this.ui.createButton(this.stage.width / 2, this.stage.height - 45);
        this.button.on('pointerdown', () => this.onStartNewGame());
        this.draw(this.button);
    }

    onStartNewGame() {
        this.enableButton(false);

        if (!this.isGame && this.isOver) {
            this.resetCurrentLevel();
        }

        if (this.level === 1) {
            this.startGame();
        } 
    }

    startGame() {
        this.isGame = true;
        this.isOver = false;
        this.countDown.start();

        this.interval = setInterval(() => {
            const asteroid = new Asteroid(getRandomInRange(POINTS.LEFT + 80, POINTS.RIGHT - 80));
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

    resetCurrentLevel() {
        this.countDown.reset();
        this.bigMessage.style.fill = 'transparent';
        this.onReset();
        this.isGame = true;
        this.isOver = false;
    }

    nextLevel() {
        this.onReset();

        this.setBigMessage(`LEVEL ${this.level}`);
        this.setBulletsText(`bullets: 0 / ${this.maxBullets}`);

        this.countDown.reset();

        this.enableButton(false);

        this.isGame = true;
        this.isOver = false;
    }

    updateLevels() {
        switch (this.level) {
            case 1:
                this.updateAsteroids();
                if (this.countDown.getCurrentTime() >= 0) {
                    if (this.countDestroyedAsteroids == this.maxBullets) {
                        this.currentCountAsteroids = 0;
                        this.countDestroyedAsteroids = 0;
                        this.isGame = false;
                        this.level++;
                    }
                }

                if (this.countDown.getCurrentTime() == 0 && 
                    this.countDestroyedAsteroids < this.maxBullets && 
                    !this.isOver) {
                    this.setYouLose();
                    this.currentCountAsteroids = 0;
                    this.countDestroyedAsteroids = 0;
                }

                break;
            
            case 2: 
                if (!this.isGame) {
                    this.nextLevel();
                }

                if (!this.boss) {
                    this.boss = new Boss();

                    this.level2Timeout = setTimeout(() => {
                        this.bigMessage.style.fill = 'transparent'; 

                        this.draw(this.boss);
                        this.draw(this.boss.healthBar);
                    }, 1000);
                } else {
                    if (this.boss.hitPoints === 0) {
                        this.setYouWin();
                        this.eraseBoss();
                    } else {
                        this.boss.attack();
                    }
                }

                break;

            default:
                break;
        }
    }

    setBulletsText(newText) {
        this.bulletsText.text = newText;
    }

    setBigMessage(newMessage) {
        this.bigMessage.text = newMessage;
        this.bigMessage.style.fill = '#fe015b';
    }

    setYouWin() { 
        this.setBigMessage('YOU WIN');
        this.countDown.stop();
        this.level != this.maxLevel ? this.level++ : this.level = 1;
        this.isGame = false;
        this.isOver = true;
        this.enableButton(true);
    }

    setYouLose() {
        this.isGame = false;
        this.isOver = true;

        if (this.level === 2 && this.boss) {
            this.eraseBoss();
        } else if (this.level === 1) {
            if (this.interval) {
                clearInterval(this.interval);
                this.interval = null;
            }
    
            for (const asteroid of this.asteroids) {
                this.erase(asteroid);
            }
            this.asteroids = [];
        }

        this.level = 1;
        this.countDown.stop();
        
        this.setBigMessage('YOU LOSE');
        this.enableButton(true);
    }

    enableButton(isEnable) {
        if (isEnable) {
            this.button.visible = true;
            this.button.eventMode = 'static';
        } else {
            this.button.visible = false;
            this.button.eventMode = 'none';
        }
    }

    draw(child) { child && this.stage.addChild(child); }

    erase(child) { child && this.stage.removeChild(child); }

    eraseBoss() {
        this.boss.clearIntervals();
        this.boss.resetBullets();
        this.erase(this.boss.healthBar);
        this.erase(this.boss);
        this.boss = null;
    }
};