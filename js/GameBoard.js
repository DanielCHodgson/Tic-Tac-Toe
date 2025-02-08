const Gameboard = (function () {

    const rows = 3, cols = 3;

    const board = [];

    for (let i = 0; i < rows; i++) {
        board[i] = [];
        for (let j = 0; j < cols; j++) {
            board[i].push(Cell());
        }
    }

    const printBoard = () => {
        const boardWithCells = board.map(row => row.map(cell => cell.getValue()));
        console.log(boardWithCells);
    }


    return {
        printBoard
    };

});

window.Gameboard = Gameboard;