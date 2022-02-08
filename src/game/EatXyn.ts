import * as PIXI from 'pixi.js';
import Grid from "../graphic/Grid";
import Xyns from "./Xyns";

export default class EatXyn {
    protected app: PIXI.Application;
    protected elapsed: number = 0;

    protected grid: Grid;

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

        this.grid = new Grid(this.app);

        new Xyns();
    }

    public run(): void {
        this.loadMain();

        this.app.ticker.add((delta) => this.tick(delta));
    }

    public tick(delta: number): void {
        this.elapsed += delta;

        this.render();
    }

    protected render(): void {
        // Draw grid.
        this.grid.render();
    }

    protected onResize(width: number, height: number): void {
        console.log(`Width: ${width}, Height: ${height}`)

        this.app.view.width = width;
        this.app.view.height = height;

        this.app.renderer.resize(width, height);
        this.grid.resize();
    }

    private loadMain(): void {

    }
}
