import * as PIXI from 'pixi.js';
import Board from "./Board";
import WidgetBase from "./WidgetBase";

export default class EatXyn {
    protected app: PIXI.Application;
    protected elapsed: number = 0;

    private widgets: WidgetBase[] = [];

    constructor() {
        this.app = new PIXI.Application({
            width: window.innerWidth,
            height: window.innerHeight,
            antialias: true,
            backgroundColor: 0xffffff
        });

        document.body.appendChild(this.app.view as HTMLCanvasElement);

        window.addEventListener("resize", () => {
           this.onResize(window.innerWidth, window.innerHeight);
        });

        let panel = new Board(this.app);
        this.widgets.push(panel);
    }

    public run(): void {
        this.load();

        this.app.ticker.add((delta) => this.tick(delta));
    }

    private load(): void {
        this.widgets.forEach(w => w.load());
    }

    public tick(delta: number): void {
        this.elapsed += delta;

        if (this.elapsed >= 30.0) { // Slow down.
            this.elapsed = 0;

            this.widgets.forEach(w => w.tick());

            this.render();
        }
    }

    protected render(): void {
        this.widgets.forEach(w => w.render());
    }

    protected onResize(width: number, height: number): void {
        this.app.view.width = width;
        this.app.view.height = height;

        this.app.renderer.resize(width, height);
        this.app.resize();

        this.widgets.forEach(w => w.resize());
    }
}
