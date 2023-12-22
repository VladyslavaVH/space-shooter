import { Container, Graphics, Texture } from 'pixi.js';
import { POINTS, getRandomInRange } from './utils';
import ShootingObject from './shootingObject';

export default class Boss extends ShootingObject {
    constructor() {
        super({
            x: POINTS.RIGHT / 2,
            y: POINTS.TOP + 200
        });
        this.texture = Texture.from('../assets/images/boss_spaceship.png');
        
        this.hitPoints = 4;
        this.isBoss = true;

        this.speed = 1;
        this.randomX = 900;
        this.randomStop = false;

        this.shootsUp = false;
    }

    attack() {
        if (!this.interval && !this.stopInterval) {
            this.interval = setInterval(() => this.fireBullet(), 2000);
            this.stopInterval = setInterval(() => this.randomStop = !this.randomStop ? true : false, 3000);
        }

        this.updateBullets();
        this.randomMoving();
        this.updateHealthBar();
    }

    getHealthBar() {
        const healthBar = new Container();
        healthBar.pivot.set(50, 5);

        const bgRect = new Graphics();
        bgRect.beginFill('gray');
        bgRect.drawRoundedRect(0, 0, 100, 10, 10);
        bgRect.endFill();
        healthBar.addChild(bgRect);

        const frontRect = new Graphics();
        frontRect.beginFill('#fe015b');
        frontRect.drawRoundedRect(0, 0, this.hitPoints * 25, 10, 10);
        frontRect.endFill();
        healthBar.addChild(frontRect);

        healthBar.position.set(this.x, 50);

        this.healthBar = healthBar;

        return healthBar;
    }

    updateHealthBar() {
        this.healthBar.x = this.x;

        if (this.isDestroyed) {
            this.decrementHitPoints();
            this.setIsDestroyed(false);
        }
        this.healthBar.children[1].width = this.hitPoints * 25;
    }

    decrementHitPoints() {
        this.hitPoints--;

        if (this.hitPoints === 0) {
            this.clearIntervals();
        }
    }

    clearIntervals() {
        clearInterval(this.interval);
        clearInterval(this.stopInterval);
    }

    randomMoving() {
        if (!this.randomStop) {
            if (this.randomX > this.x) {
                this.moveRight();
            } else if (this.randomX < this.x) {
                this.moveLeft();
            } else if (this.randomX === this.x) {
                this.randomX = getRandomInRange(
                    POINTS.LEFT + this.width, 
                    POINTS.RIGHT - this.width
                );
            }
        } else {
            this.stopInterval = setInterval(() => {
                this.randomStop = false;
                clearInterval(this.stopInterval);
            }, getRandomInRange(2000, 5000));
        }
    }

    moveDown() {}
    moveUp() {}
};