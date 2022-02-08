import * as PIXI from 'pixi.js';
import { DisplayObject } from 'pixi.js';
import Line from "../graphic/Line";

export default class EatXyn {
    protected app: PIXI.Application;
    protected elapsed: number = 0;

    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            backgroundColor: 0xffffff
        });

        document.body.appendChild(this.app.view);

        window.addEventListener("resize", () => {
           this.onResize(window.innerWidth, window.innerHeight);
        });
    }

    public run(): void {
        this.loadMain();

        this.app.ticker.add(this.tick);
    }

    public tick(delta: number): void {
        this.elapsed += delta;

        this.render();
    }

    protected render(): void {
        // Draw grid.
        // qyl: There are only columns now.
        this.drawGrid(4, 100);
    }

    protected onResize(width: number, height: number): void {
        console.log(`Width: ${width}, Height: ${height}`)

        this.app.view.width = width;
        this.app.view.height = height;
        this.app.renderer.resize(width, height);
    }

    private loadMain(): void {

    }

    private drawGrid(columnCount: number, columnWidth: number = 100, lineWidth: number = 2): void {
        let totalHeight = this.app.view.height;
        let halfScreenWidth = this.app.view.width / 2;
        let totalWidth = columnCount * columnWidth;
        let halfWidth = totalWidth / 2;
        let lineCount = columnCount + 1;
        let lineTotalWidth = lineCount * lineWidth;

        let startX = halfScreenWidth - halfWidth - lineTotalWidth;
        let fromY = 0;
        let toY = fromY + totalHeight;

        let line = new Line(lineWidth);
        for (let i = 0; i < lineCount; i++) {
            let x = startX + i * columnWidth + i * lineWidth;
            line.draw(x, fromY, x, toY);
        }

        this.showObject(line);
    }

    protected showObject(object: DisplayObject): void {
        this.app.stage.addChild(object);
        // this.app.render();
    }
}
