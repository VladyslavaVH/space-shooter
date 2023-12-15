import { Sprite, Assets } from "pixi.js";

export default class GameObject extends Sprite {
    constructor({ x = 0, y = 0, speed = 10 }) {
        super();
        this.x = x;
        this.y = y;
        this.anchor.set(0.5);
        this.speed = speed;
    }

    moveLeft() { 
        if (this.x - this.width > 0) {
            this.x -= this.speed;
        } 
    }

    moveRight() { 
        if (this.width + this.x < 1280) {
            this.x += this.speed;
        }
    }

    moveUp() { this.y -= this.speed; }
    moveDown() { this.y += this.speed; }
};