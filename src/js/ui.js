import { Texture, TilingSprite, Text, TextStyle, Container, Graphics } from "pixi.js";
import { baseTextStyle } from "./utils";
import CountDown from "./countDown";

export default class UI {
    getBackground(width, height) {
        const bgTexture = Texture.from('../assets/images/galaxy_bg.png');
        return TilingSprite.from(bgTexture, { width, height });
    }

    createBulletsText(x, y) {
        const bulletsText = new Text('bullets: 0 / 10');
        bulletsText.x = x;
        bulletsText.y = y;
        bulletsText.style = baseTextStyle;
        return bulletsText;
    }

    createBigMessage(x, y) {
        const bigMessage = new Text('YOU WIN');
        bigMessage.anchor.set(0.5);
        bigMessage.x = x;
        bigMessage.y = y;
        bigMessage.style = new TextStyle({
            fill: 'transparent',
            fontSize: 150,
            fontFamily: 'Rational Integer'
        });
        return bigMessage;
    }

    createCountDown(x, y, seconds) {
        const countDown = new CountDown(seconds);
        countDown.x = x;
        countDown.y = y;
        return countDown;
    }

    createButton(x, y) {
        const button = new Container();
        button.pivot.set(80, 20);

        //border
        let border = new Graphics();
        border.beginFill('transparent');
        border.lineStyle(2, '#004e8c');
        border.drawRoundedRect(0, 0, 160, 40, 30);
        border.endFill();
        button.addChild(border);

        //text
        const buttnText = new Text('START NEW GAME');
        buttnText.anchor.set(0.5);
        buttnText.style = new TextStyle({
            fill: '#00a3f8',
            fontSize: 18,
            fontFamily: 'Rational Integer'
        });
        buttnText.x = buttnText.width / 2 + 15;
        buttnText.y = button.height / 2;
        button.addChild(buttnText);

        button.eventMode = 'static';
        button.buttonMode = true;
        button.cursor = 'pointer';
        button.position.set(x, y);

        return button;
    }
    
};