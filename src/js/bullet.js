import { Graphics } from "pixi.js";
import { POINTS } from "./utils";

export default class Bullet extends Graphics {
    constructor(x, y, speed = 15) {
        super();
        this.speed = speed;
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

    shootUp() {
        if (this.y <= 0) {
            this.isDead = true;
        } else {
            const isCollision = this.isCollision();
            
            if (!isCollision) {
                this.up();
            }
        }
    }

    up() { this.position.set(this.x, this.y - this.speed); } 
    
    shootDown() {
        if (this.y >= POINTS.BOTTOM) {
            this.isDead = true;
        } else {
            const isCollision = this.isCollision();
            
            if (!isCollision) {
                this.down();
            }
        }
    
    }

    down() { this.position.set(this.x, this.y + this.speed); } 

    isCollision() {
        let isCollision = false;
        let bangX = false;
        let bangY = false;

        for (const obj of this.parent.children) {
            if (obj?.isGameObject && obj != this.shootingObject) {
                bangY = obj.y + obj.height / 2 >= this.y;
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