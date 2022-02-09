import * as PIXI from 'pixi.js';
import Xyns from "./Xyns";
import Grid from "../graphic/Grid";

export default class Board {
    protected app: PIXI.Application;

    protected grid: Grid;

    protected xyns: Xyns;

    columnCount: number;
    gridSize: number;
    lineWidth: number;

    public constructor(app: PIXI.Application,
                       columnCount: number = 4,
                       gridSize: number = 100, lineWidth: number = 2) {
        this.app = app;

        this.columnCount = columnCount;
        this.gridSize = gridSize;
        this.lineWidth = lineWidth;

        this.xyns = new Xyns();

        this.grid = new Grid(this.app, this.getStartX(), this.getLastY(), this.getColumnCount(), this.getRowCount());
    }

    public load(): void {
        this.xyns.load();


    }

    public resetBoard(): void {
        
    }

    public render(): void {
        this.grid.render();
    }

    public getColumnCount(): number {
        return this.columnCount;
    }

    public getRowCount(): number {
        return Math.floor(this.app.view.height / this.gridSize);
    }

    public getStartX(): number {
        let halfScreenWidth = this.app.view.width / 2;
        let totalWidth = this.columnCount * this.gridSize;
        let halfWidth = totalWidth / 2;
        let lineCount = this.columnCount + 1;
        let lineHalfWidth = lineCount * this.lineWidth / 2;
        return halfScreenWidth - halfWidth - lineHalfWidth;
    }

    public getLastY(): number {
        let totalHeight = this.app.view.height;
        let rowCount = this.getRowCount();
        let lineCount = rowCount - 1;   // Hide top and bottom edge.
        let lineHalfWidth = lineCount * this.lineWidth / 2;
        let halfScreenHeight = totalHeight / 2;
        let halfHeight = this.gridSize * lineCount / 2;

        return halfScreenHeight + halfHeight + lineHalfWidth - this.gridSize;
    }
}
