import { Sprite } from 'pixi.js';

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
        if (this.x - this.width / 2 > 0) {
            this.x -= this.speed;
        } 
    }

    moveRight() { 
        if (this.x + this.width / 2 < 1280) {
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
                bangX = this.x >= (obj.x - obj.width / 2) &&
                        this.x <= (obj.x + obj.width / 2);

                if (bangX) {
                    const { anchorH, objAnchorH } = this.getObjAnchorH(obj);

                    if (obj.y < this.y) {
                        bangY = obj.y + objAnchorH >= this.y - 5;
                    } else {
                        bangY = obj.y - objAnchorH == this.y + anchorH;
                    }

                    if (bangY) {
                        this.setIsDestroyed(true);
                    }
                }
            }
        }

        return isCollision;
    }

    getObjAnchorH(obj) {
        let objAnchorH = 0;
        let anchorH = 0;

        switch (obj.anchor.y) {
            case 0.5:
                objAnchorH = obj.height / 2;
                break;
            case 1:
                objAnchorH = 0;
                break;
            default:
                objAnchorH = obj.height;
                break;
        }

        switch (this.anchor.y) {
            case 0.5:
                anchorH = this.height / 2;
                break;
            case 1:
                anchorH = 0;
                break;
            default:
                anchorH = this.height;
                break;
        }

        return { anchorH, objAnchorH };
    }
};