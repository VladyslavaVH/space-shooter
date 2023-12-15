import { Graphics } from "pixi.js";

export default class Bullet extends Graphics {
    constructor(x, y) {
        super();

        this.beginFill('#fcfedb');
        this.drawCircle(x, y, 7);
        this.pivot.set(x, y);
        this.position.set(x, y);
        this.endFill();

        this.isDead = false;
        
        return this;
    }

    shoot() {
        if (this.y <= 0) {
            this.isDead = true;
        } else {
            const isCollision = this.isCollision();
            
            if (!isCollision) {
                this.up();
            } 
            // else {
            //     this.isDead = true;
            // }
        }
    }

    up() { this.position.set(this.x, this.y - this.speed); } 

    isCollision() {
        let isCollision = false;
        for (const obj of this.parent.children) {
            let bangY = obj.y + obj.height / 2 >= this.y;
            let bangX = this.x >= (obj.x - obj.width / 2) &&
                        this.x <= (obj.x + obj.width / 2);
                        
            if (obj?.isAsteroid && bangY && bangX) {
                isCollision = true;
                obj.setIsDestroyed(true).then(() => this.isDead = true);
                break;
            }
        }

        return isCollision;
    }
};