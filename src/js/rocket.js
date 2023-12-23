import { Texture } from 'pixi.js';
import { POINTS } from './utils/utils';
import ShootingObject from './baseObjects/shootingObject';

export default class Rocket extends ShootingObject {
    constructor() {
        super({
            x: POINTS.RIGHT / 2, 
            y: POINTS.BOTTOM - 260
        });
        this.texture = Texture.from('../assets/images/rocket.png');
        this.anchor.set(0.5, 0);
    }

    moveUp() {}
    moveDown() {}
};