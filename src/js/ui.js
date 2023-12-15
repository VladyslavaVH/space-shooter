import { Texture, TilingSprite, Text, TextStyle, Container, Graphics } from "pixi.js";
import { baseTextStyle } from "./utils";
import CountDown from "./countDown";

export default class UI {
    constructor(component) {
        this.component = component;
    }

    setBackground() {
        const bgTexture = Texture.from('../assets/images/galaxy_bg.png');
        const bg = TilingSprite.from(
            bgTexture, { 
                width: this.component.view.width, 
                height: this.component.view.height 
            }
        );
        this.component.draw(bg);
    }

    createBulletsText() {
        const bulletsText = new Text('bullets: 0 / 10');
        bulletsText.x = 25;
        bulletsText.y = 10;
        bulletsText.style = baseTextStyle;
        this.component.draw(bulletsText);
        this.component.stage.setChildIndex(bulletsText, 1);
        return bulletsText;
    }

    createBigMessage() {
        const bigMessage = new Text('YOU WIN');
        bigMessage.anchor.set(0.5);
        bigMessage.x = this.component.renderer.width / 2;
        bigMessage.y = this.component.renderer.height / 2;
        bigMessage.style = new TextStyle({
            fill: 'transparent',
            fontSize: 150,
            fontFamily: 'Rational Integer'
        });
        this.component.draw(bigMessage);
        this.component.stage.setChildIndex(bigMessage, 2);
        return bigMessage;
    }

    createCountDown() {
        const countDown = new CountDown(60);
        countDown.x = 1280 - countDown.width - 36;
        countDown.y = 10;
        this.component.draw(countDown);
        return countDown;
    }

    createButton() {
        const button = new Container();

        //border
        let border = new Graphics();
        border.beginFill('transparent');
        border.lineStyle(2, '#004e8c');
        border.drawRoundedRect(
            this.component.stage.width / 2 - 80,
            this.component.stage.height - 60,
            160,
            40,
            30
        );
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
        buttnText.x = this.component.stage.width / 2;
        buttnText.y = this.component.stage.height - 40;
        button.addChild(buttnText);

        button.eventMode = 'static';
        button.buttonMode = true;
        button.cursor = 'pointer';
        button.on('pointerdown', e => this.component.startGame(e));

        this.component.draw(button);

        return button;
    }
    
};