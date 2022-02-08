import * as PIXI from 'pixi.js';
import Line from "./Line";

export default class Grid {
    app: PIXI.Application;

    line: Line;

    lineWidth: number;
    columnCount: number;
    gridSize: number;

    constructor(application: PIXI.Application,
                columnCount: number = 4, gridSize: number = 100,
                lineWidth: number = 2) {
        this.app = application;

        this.lineWidth = lineWidth;
        this.columnCount = columnCount;
        this.gridSize = gridSize;

        this.line = new Line(lineWidth);
    }

    public render(): void {
        this.app.stage.addChild(this.line);

        this.drawVertical();
        this.drawHorizontal();
    }

    public resize(): void {
        this.removeLines();
        this.render();
    }

    public getStartX(): number {
        let halfScreenWidth = this.app.view.width / 2;
        let totalWidth = this.columnCount * this.gridSize;
        let halfWidth = totalWidth / 2;
        let lineCount = this.columnCount + 1;
        let lineHalfWidth = lineCount * this.lineWidth / 2;
        return halfScreenWidth - halfWidth - lineHalfWidth;
    }

    public getLineHalfWidth(lineCount: number): number {
        return lineCount * this.lineWidth / 2;
    }

    private drawVertical(): void {
        let lineCount = this.columnCount + 1;
        let fromY = 0;
        let totalHeight = this.app.view.height;
        let toY = fromY + totalHeight;

        for (let i = 0; i < lineCount; i++) {
            let x = this.getStartX() + i * this.gridSize + i * this.lineWidth;
            this.line.draw(x, fromY, x, toY);
        }
    }

    private drawHorizontal(): void {
        let totalHeight = this.app.view.height;
        let rowCount = Math.floor(totalHeight / this.gridSize);
        let lineCount = rowCount - 1;   // Hide top and bottom edge.

        let lineHalfWidth = this.getLineHalfWidth(lineCount);
        let fromX = this.getStartX();
        let toX = fromX + this.columnCount * this.gridSize + lineHalfWidth;

        let halfScreenHeight = totalHeight / 2;
        let halfHeight = this.gridSize * rowCount / 2;

        let startY = halfScreenHeight - halfHeight - lineHalfWidth;

        for (let i = 0; i < rowCount; i++) {
            let y = startY + i * this.gridSize + i * this.lineWidth;
            this.line.draw(fromX, y, toX, y);
        }
    }

    protected removeLines(): void {
        this.line.clear();
        this.line.setStyle(2);
    }
}
