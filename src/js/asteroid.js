import { Texture } from 'pixi.js';
import { POINTS } from './utils/utils';
import GameObject from './baseObjects/gameObject';

export default class Asteroid extends GameObject {
    constructor(x) {
        super({ x });
        this.texture = Texture.from('../assets/images/asteroid.png');
        this.speed = 5;
        this.isMissed = null;
        this.anchor.set(0.5, 1);
        this.zIndex = 0;
    }

    fall() {
        this.interval = setInterval(() =>{
            if (this.y >= POINTS.BOTTOM || this.parent?.isOver) {
                if (!this?.isDestroyed && !this.parent?.isOver) {
                    this.isMissed = true;
                } 

                clearInterval(this.interval);
            } else {
                this.moveDown();
            }
        }, 100);
    }

    setIsMissed(isMissed) {
        if (isMissed == 1 || isMissed == 0) {
            this.isMissed = isMissed;
        }
    }
    
}