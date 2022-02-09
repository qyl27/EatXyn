import * as PIXI from 'pixi.js';
import Grid from "../graphic/Grid";
import Xyns from "./Xyns";
import Board from "./Board";

export default class EatXyn {
    protected app: PIXI.Application;
    protected elapsed: number = 0;

    protected panel: Board;

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

        this.panel = new Board(this.app);
    }

    public run(): void {
        this.load();

        this.app.ticker.add((delta) => this.tick(delta));
    }

    private load(): void {
        this.panel.load();
    }

    public tick(delta: number): void {
        this.elapsed += delta;

        if (this.elapsed >= 30.0) { // Slow down.
            this.elapsed = 0;

            this.render();
        }
    }

    protected render(): void {
        // Draw grid.
        this.panel.render();
    }

    protected onResize(width: number, height: number): void {
        console.log(`Width: ${width}, Height: ${height}`)

        this.app.view.width = width;
        this.app.view.height = height;

        this.app.renderer.resize(width, height);
        this.render();
    }
}
