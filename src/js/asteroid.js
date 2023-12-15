import { Texture } from "pixi.js";
import GameObject from "./gameObject";

export default class Asteroid extends GameObject {
    constructor(x) {
        super({ x });
        this.texture = Texture.from('../assets/images/asteroid.png');
        this.speed = 5;
        this.isAsteroid = true;
        this.isDestroyed = false;
        this.isMissed = null;
    }

    fall() {
        this.interval = setInterval(() =>{
            if (this.y - this.height / 2 > 720 || this.parent?.isOver) {
                if (!this?.isDestroyed && !this.parent?.isOver) {
                    this.isMissed = true;
                } 

                clearInterval(this.interval);
            } else {
                this.moveDown();
            }
        }, 100);
    }

    setIsDestroyed(boolean) {
        if (boolean == 1 || boolean == 0) {
            this.isDestroyed = boolean;
        }

        return new Promise(function(resolve, reject) {
            resolve(true);
        });
    }

    setIsMissed(boolean) {
        if (boolean == 1 || boolean == 0) {
            this.isMissed = boolean;
        }
    }
    
}