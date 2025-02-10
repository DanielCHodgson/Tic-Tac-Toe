import GameBoard from "./GameBoard.js";
import Cell from "./Cell.js";
import Player from "./Player.js";
import GameState from "./GameState.js";

const GameController = (function () {

    const gameBoard = new GameBoard(createInitialBoard());
    const playerOne = new Player("playerOne", "O")
    const playerTwo = new Player("playerTwo", "X")
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let winningPlayer = null;
    let gameStates = [new GameState(0, gameBoard, playerOne, false)];

    const getWinningPlayer = () => winningPlayer;

    function getCurrentGameState() { return gameStates[gameStates.length - 1]; };

    console.log(getCurrentGameState())

    function createInitialBoard() {
        const board = [];
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(new Cell(null));
            }
        }
        return board;
    }


    const switchActivePlayer = (currentPlayer) => {
        let newPlayer = currentPlayer.getMarker() === players[0].getMarker() ? players[1] : players[0];
        return newPlayer;
    };


    const playRound = (cell, currentState) => {

        if (!cell.isOccupied()) {

            const turn = currentState.getTurn() + 1;
            const currentPlayer = currentState.getActivePlayer();
            const currentBoard = currentState.getGameBoard();
            currentBoard.addMarker(cell, currentPlayer.marker);

            let newActivePlayer = turn === 0 ? players[0] : switchActivePlayer(currentPlayer);

            if (isGameWon(currentBoard.getBoard(), currentPlayer)) {
                gameStates.push(new GameState(turn, currentBoard, currentPlayer, true));
                return;
            }

            gameStates.push(new GameState(turn, currentBoard, newActivePlayer, false));

        } else {
            alert("Square occupied, choose another!")
        }
    }

    function isGameWon(board, player) {
        const size = board.length;

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
        gameStates = [];
        gameBoard.resetBoard();
        board = gameBoard.getBoard();
        winningPlayer = null;
        activePlayer = playerOne;
    }

    function undoRound() {

        if (gameStates.length > 0) {

            gameStates.forEach(b => gameBoard.printBoard(b))

            const prevBoard = gameStates.pop();
            gameBoard.setBoard(prevBoard);
            switchActivePlayer();
        }
    }

    return {
        playRound,
        undoRound,
        reset,
        getWinningPlayer,
        getCurrentGameState
    }
})();

export default GameController;