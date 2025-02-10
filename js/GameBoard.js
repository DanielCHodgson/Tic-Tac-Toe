import Cell from "./Cell.js";

export default class Gameboard {

    constructor(boardArray) {
        this.cols = boardArray.length;
        this.rows = boardArray.length;
        this.boardArray = boardArray;
    }

    boardHasSpace() {
        console.log("Checking boardHasSpace:", this.boardArray);
        return this.boardArray.some(row => row.some(cell => cell.getValue() === null));
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

    addMarker = (row, col, marker) => {
        this.boardArray[row][col] = new Cell(marker);
    }
}

