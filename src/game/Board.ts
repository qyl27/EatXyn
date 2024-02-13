import * as PIXI from 'pixi.js';
import Xyn from "./Xyn";
import Grid from "../graphic/Grid";
import WidgetBase from "./WidgetBase";

export default class Board extends WidgetBase {
    protected app: PIXI.Application;

    protected grid: Grid;

    columnCount: number;
    gridSize: number;
    lineWidth: number;

    public constructor(app: PIXI.Application,
                       columnCount: number = 4,
                       gridSize: number = 100, lineWidth: number = 2) {
        super();
        this.app = app;

        this.columnCount = columnCount;
        this.gridSize = gridSize;
        this.lineWidth = lineWidth;

        this.grid = new Grid(this.app, this.getStartX(), this.getLastY(), this.getColumnCount(), this.getRowCount());
    }

    public load(): void {
    }

    public tick(): void {
    }

    public render(): void {
        this.grid.render();
    }

    public resize(): void {
        this.grid.startXPos = this.getStartX();
        this.grid.lastYPos = this.getLastY();
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
