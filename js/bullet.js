import { Graphics } from 'pixi.js';
import { POINTS } from './utils/utils';

export default class Bullet extends Graphics {
    constructor(x, y, speed = 15, shootsUp = true) {
        super();
        this.speed = speed;
        this.shootsUp = shootsUp;
        this.shootingObject = null;

        this.beginFill('#fcfedb');
        this.drawCircle(x, y, 7);
        this.pivot.set(x, y);
        this.position.set(x, y);
        this.endFill();

        this.isBullet = true;
        this.isDead = false;
        
        return this;
    }

    setShootingObject(obj) {
        if (obj?.isGameObject) {
            this.shootingObject = obj;
        }
    }

    shoot() {
        const isCollision = this.isCollision();

        if (this.shootsUp) {
            if (this.y <= 0) {
                this.isDead = true;
            } else if (!isCollision) {
                this.up();
            }
        } else {
            if (this.y >= POINTS.BOTTOM) {
                this.isDead = true;
            } else if (!isCollision) {
                this.down();
            }
        }
    }

    up() { this.position.set(this.x, this.y - this.speed); } 

    down() { this.position.set(this.x, this.y + this.speed); } 

    isCollision() {
        let isCollision = false;
        let bangX = false;
        let bangY = false;
        let h = 0;
        let bulletH = this.height / 2;

        for (const obj of this.parent.children) {
            if (obj?.isGameObject && obj != this.shootingObject) {
                switch (obj.anchor.y) {
                    case 0.5:
                        h = obj.height / 2;
                        break;
                    case 1:
                        h = 0;
                        break;
                    default:
                        h = obj.height;
                        break;
                }

                if (this.shootsUp) {
                    bangY = obj.y + h >= this.y - bulletH;
                } else {
                    bangY = obj.y - h <= this.y + bulletH;
                }

                bangX = this.x >= (obj.x - obj.width / 2) &&
                        this.x <= (obj.x + obj.width / 2);

                if (bangY && bangX) {
                    obj?.setIsDestroyed(true);
                    this.isDead = true;
                }
            }
        }

        return isCollision;
    }
};