import Cell from "./Cell.js";

const Gameboard = (function () {

    const rows = 3, cols = 3;
    let board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell(null));
        }
    }

    const getBoard = () => board;
    const setBoard = (newBoard) => board = newBoard;

    const printBoard = (board) => {
        const boardWithCells = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCells);
    }

    const getCell = (row, col) => {
        if (row < 0 || row >= board.length || col < 0 || col >= board[0].length) {
            throw new Error("Invalid cell position");
        }
        return board[row][col];
    }

    const addMarker = (cell, marker) => {
        cell.addMarker(marker);
    }

    return {
        printBoard,
        getCell,
        getBoard,
        setBoard,
        addMarker,
    };
})();

export default Gameboard;