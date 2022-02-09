import * as PIXI from 'pixi.js';

// @ts-ignore
import * as Xyn1 from '../assets/xyn-1.jpg';

export default class Xyns {
    xynsPath: string[];
    length: number = 0;

    xyns: PIXI.Sprite[];

    constructor() {
        this.xynsPath = new Array(Xyn1);
        this.xyns = new Array<PIXI.Sprite>();
    }

    public load(): void {
        for (let xyn in this.xynsPath) {
            // Todo: More xyns support.
            this.xyns.push(PIXI.Sprite.from('/assets/pictures/xyn-1.jpg'));
        }

        this.length = this.xyns.length;
    }

    public getLength(): number {
        return this.length;
    }

    public get(id: number): PIXI.Sprite {
        return this.xyns[id];
    }

    public random(): PIXI.Sprite {
        return this.xyns[this.getRandomInt(this.getLength())];
    }

    protected getRandomInt(maxBound: number): number {
        return Math.floor(Math.random() * maxBound);
    }
}
