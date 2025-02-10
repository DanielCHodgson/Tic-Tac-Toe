import Cell from "./Cell.js";

export default class Gameboard {

    constructor(boardArray) {
        this.cols = boardArray.length;
        this.rows = boardArray.length;
        this.boardArray = boardArray;
    }

    resetBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.boardArray[i].push(new Cell(null));
            }
        }
    }

    getBoard() {
        return this.boardArray;
    }

    printBoard(board) {
        const boardWithCells = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCells);
    }

    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error("Invalid cell position");
        }
        return this.boardArray[row][col];
    }

    addMarker = (cell, marker) => {
        console.log("gkfdsg")
        cell.addMarker(marker);
    }
}

