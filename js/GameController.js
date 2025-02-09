import Gameboard from "./GameBoard.js";
import Cell from "./Cell.js";

const GameController = (function () {

    const gameBoard = Gameboard;
    const board = gameBoard.getBoard();

    let boardStates = [];

    const playerOne = { name: "playerOne", marker: "O" };
    const playerTwo = { name: "playerTwo", marker: "X" };
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let winningPlayer = null;

    const getActivePlayer = () => activePlayer;
    const getPlayers = () => players;
    const getGameBoard = () => gameBoard;
    const getWinningPlayer = () => winningPlayer;

    const switchActivePlayer = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    };

    const playRound = (cell) => {

        const activePlayer = getActivePlayer();
        if (!cell.isOccupied()) {

            const boardCopy = board.map(row => row.map(cell => Cell(cell.getValue())));
            boardStates.push(boardCopy);
            gameBoard.addMarker(cell, activePlayer.marker);

            if (isGameWon(activePlayer)) {
                winningPlayer = activePlayer;
                return;
            }
            switchActivePlayer();
        } else alert("Square occupied, choose another!")
    }

    function isGameWon(player) {
        let size = board.length;

        for (let i = 0; i < size; i++) {
            if (board[i].every(cell => cell.getValue() === player.marker) ||
                board.map(row => row[i]).every(cell => cell.getValue() === player.marker)) {
                return true;
            }
        }

        if (board.every((_, i) => board[i][i].getValue() === player.marker) ||
            board.every((_, i) => board[i][size - 1 - i].getValue() === player.marker)) {
            return true;
        }

        return false;
    }

    function reset() {

        boardStates = [];
    }

    function undoRound() {

        if (boardStates.length > 0) {

            boardStates.forEach(b => gameBoard.printBoard(b))

            const prevBoard = boardStates.pop();
            gameBoard.setBoard(prevBoard);
            switchActivePlayer();
        }
    }

    return {
        playRound,
        undoRound,
        reset,
        getActivePlayer,
        getPlayers,
        getGameBoard,
        getWinningPlayer,
    }
})();

export default GameController;