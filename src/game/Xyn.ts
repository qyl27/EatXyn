import * as PIXI from 'pixi.js';

import '../assets/xyn-1.jpg';

export default class Xyn {
    xyn: PIXI.Sprite;

    constructor() {
        this.xyn = PIXI.Sprite.from('/assets/pictures/xyn-1.jpg')
    }

    public load(): void {
    }
}
