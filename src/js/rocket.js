import { Texture } from "pixi.js";
import { POINTS } from "./utils";
import ShootingObject from "./shootingObject";

export default class Rocket extends ShootingObject {
    constructor() {
        super({
            x: POINTS.RIGHT / 2, 
            y: POINTS.BOTTOM - 250
        });
        this.texture = Texture.from('../assets/images/rocket.png');
        this.anchor.y = 0;
        this.anchor.x = 0.5;
    }

    moveUp() {}
    moveDown() {}
};