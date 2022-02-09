import * as PIXI from 'pixi.js';
import Line from "./Line";

export default class Grid {
    app: PIXI.Application;

    line: Line;

    startXPos: number;
    lastYPos: number;

    columnCount: number;
    rowCount: number;
    gridSize: number;
    lineWidth: number;

    constructor(application: PIXI.Application,
                startXPos: number, lastYPos: number,
                columnCount: number = 4, rowCount: number = 6,
                gridSize: number = 100, lineWidth: number = 2) {
        this.app = application;

        this.startXPos = startXPos;
        this.lastYPos = lastYPos;
        this.columnCount = columnCount;
        this.rowCount = rowCount;
        this.gridSize = gridSize;
        this.lineWidth = lineWidth;

        this.line = new Line(lineWidth);
    }

    public render(): void {
        this.removeLines();
        this.app.stage.addChild(this.line);

        this.drawVertical();
        this.drawHorizontal();
    }

    private drawVertical(): void {
        let lineCount = this.columnCount + 1;
        let fromY = 0;
        let totalHeight = this.app.view.height;
        let toY = fromY + totalHeight;

        for (let i = 0; i < lineCount; i++) {
            let x = this.startXPos + i * this.gridSize + i * this.lineWidth;
            this.line.draw(x, fromY, x, toY);
        }
    }

    private drawHorizontal(): void {
        let lineCount = this.rowCount - 1;   // Hide top and bottom edge.
        let lineHalfWidth = lineCount * this.lineWidth / 2;
        let fromX = this.startXPos;
        let toX = fromX + this.columnCount * this.gridSize + lineHalfWidth;

        for (let i = 0; i < lineCount; i++) {
            let y = this.lastYPos - i * this.gridSize - i * this.lineWidth;
            this.line.draw(fromX, y, toX, y);
        }
    }

    protected removeLines(): void {
        this.line.clear();
        this.line.setStyle(2);
    }
}
