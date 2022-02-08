import * as PIXI from 'pixi.js';

export default class Line extends PIXI.Graphics {
    constructor(lineWidth: number = 3, lineColor: number = 0x66ccff) {
        super();

        this.lineStyle(lineWidth, lineColor);
    }

    public draw(fromX: number, fromY: number, toX: number, toY: number): void {
        this.moveTo(fromX, fromY);
        this.lineTo(toX, toY);
        this.moveTo(0, 0);
        // console.log(`${fromX} ${fromY} ${toX} ${toY}`);
    }

    public setStyle(lineWidth: number = 3, lineColor: number = 0x66ccff): void {
        this.lineStyle(lineWidth, lineColor);
    }
}
