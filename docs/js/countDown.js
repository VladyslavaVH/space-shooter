import { Text } from "pixi.js";
import { baseTextStyle } from './utils';

export default class CountDown extends Text {
    constructor(startTime = 60) {
        super( startTime );
        this.style = baseTextStyle;
        this.style.fontSize = 36;
        this.zIndex = 1000;
        this.anchor.set(0.0);
        this.startTime = startTime;
        this.currentTime = startTime;
    }

    start() {
        this.interval = setInterval(() => {
            if (this.currentTime != 0) {
                this.currentTime -= 1;
            } else {
                console.log('The end');
                clearInterval(this.interval);
            }
            this.text = this.currentTime;
        }, 1000);
    }

    stop() {
        clearInterval(this.interval);
    }

    reset() {
        this.currentTime = this.startTime;
    }
    
    getCurrentTime() {
        return this.currentTime;
    }
};