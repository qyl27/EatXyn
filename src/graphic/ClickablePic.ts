import * as PIXI from 'pixi.js';

export default class ClickablePic extends PIXI.Sprite {
    public state: "on" | "press" | "hold" | "after" = "on";

    public isMouseDown: boolean = false;
    public isMouseOver: boolean = false;

    onPic: PIXI.Sprite;
    over: PIXI.Sprite;
    press: PIXI.Sprite;
    hold: PIXI.Sprite;

    constructor(onPic: PIXI.Sprite, press: PIXI.Sprite,
                hold: PIXI.Sprite, over: PIXI.Sprite,
                width: number, height: number,
                x: number, y: number) {
        super();

        this.onPic = this.setPosAndSize(onPic, width, height, x, y);
        this.press = this.setPosAndSize(press, width, height, x, y);
        this.hold = this.setPosAndSize(hold, width, height, x, y);
        this.over = this.setPosAndSize(over, width, height, x, y);

        onPic
            .on('pointerdown', onButtonUp)
            .on('pointerup', onButtonUp)
            .on('pointerout', onButtonUp)
            .on('pointerover', onButtonOver)
            .on('pointerout', onButtonOut);
    }

    public setPosAndSize(pic: PIXI.Sprite,
                         width: number, height: number,
                         x: number, y: number): PIXI.Sprite {
        pic.width = width;
        pic.height = height;
        pic.x = x;
        pic.y = y;

        return pic;
    }
}
