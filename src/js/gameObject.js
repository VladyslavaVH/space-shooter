import { Sprite } from "pixi.js";

export default class GameObject extends Sprite {
    constructor({ x = 0, y = 0, speed = 10 }) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(0.5);
        this.speed = speed;
        this.isGameObject = true;
        this.isDestroyed = false;
    }

    moveLeft() { 
        if (this.x - (this.width / 2) > 0) {
            this.x -= this.speed;
        } 
    }

    moveRight() { 
        if ((this.width / 2) + this.x < 1280) {
            this.x += this.speed;
        }
    }

    moveUp() { this.y -= this.speed; }
    moveDown() { this.y += this.speed; }

    setIsDestroyed(boolean) {
        if (boolean == 1 || boolean == 0) {
            this.isDestroyed = boolean;
        }
    }

    isCollision() {
        let isCollision = false;
        let bangX = false;
        let bangY = false;

        for (const obj of this.parent.children) {
            if (obj != this && obj?.isGameObject && !obj?.isBoss) {
                bangY = obj.y - obj.height / 2 == this.y ||
                        this.y - this.height / 2 == obj.y;

                bangX = this.x >= (obj.x - obj.width / 2) &&
                        this.x <= (obj.x + obj.width / 2);

                if (bangY && bangX) {
                    this.setIsDestroyed(true);
                }
            }
        }

        return isCollision;
    }
};