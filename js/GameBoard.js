import Cell from "./Cell.js";

export default class Gameboard {

    constructor(board) {
        this.cols = board.length;
        this.rows = board.length;
        this.board = board;
    }

    resetBoard() {
        for (let i = 0; i < this.rows; i++) {
            this.board[i] = [];
            for (let j = 0; j < this.cols; j++) {
                this.board[i].push(new Cell(null));
            }
        }
    }

    getBoard() {
        return this.board;
    }
    setBoard(newBoard) {
        this.board = newBoard;
    }

    printBoard(board) {
        const boardWithCells = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCells);
    }

    getCell(row, col) {
        if (row < 0 || row >= this.rows || col < 0 || col >= this.cols) {
            throw new Error("Invalid cell position");
        }
        return this.board[row][col];
    }

    addMarker = (cell, marker) => {
        cell.addMarker(marker);
    }
}

