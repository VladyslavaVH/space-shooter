import { Texture } from "pixi.js";
import Bullet from "./bullet";
import GameObject from "./gameObject";

export default class Rocket extends GameObject {
    constructor(props) {
        super({...props});
        this.texture = Texture.from('../assets/images/rocket.png');
        this.bulletSpeed = 15;
        this.bullets = [];
        this.maxBullets = 10;
        this.shoots = 0;
    }

    moveUp() {}
    moveDown() {}

    fireBullet() {
        if (this.shoots < this.maxBullets) {
            let bullet = this.createBullet();
            this.bullets.push(bullet);
            this.shoots += 1;
        }
    }

    createBullet() {
        let bullet = new Bullet(this.x, this.y);
        bullet.speed = this.bulletSpeed;
        this.parent.addChild(bullet);

        return bullet;
    }

    updateBullets() {
        for (const i in this.bullets) {
            const bullet = this.bullets[i];
            bullet.shoot();
            if (bullet.isDead) {
                this.parent.removeChild(bullet);
                this.bullets.splice(i, 1);
            }
        }
    }

    resetBullets() {
        this.shoots = 0;
    }

    isCollision() {
        let isCollision = false;
        for (const obj of this.parent.children) {
            let bangY = obj.y + obj.height / 2 >= this.y - this.height / 2;
            
            let bangX = obj.x >= (this.x - (this.width / 2)) &&
                        obj.x <= (this.x + (this.width / 2));
            
            if (obj?.isAsteroid && bangY && bangX) {
                isCollision = true;
                obj.setIsDestroyed(true);
                break;
            }
        }

        return isCollision;
    }
};