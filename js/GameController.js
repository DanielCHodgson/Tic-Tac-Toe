import GameBoard from "./GameBoard.js";
import Cell from "./Cell.js";
import Player from "./Player.js";
import GameState from "./GameState.js";

const GameController = (function () {

    const createInitialBoard = () => {
        const board = [];
        for (let i = 0; i < 3; i++) {
            board[i] = [];
            for (let j = 0; j < 3; j++) {
                board[i].push(new Cell(null));
            }
        }
        return board;
    }

    const gameBoard = new GameBoard(createInitialBoard());
    //const board = gameBoard.getBoard();
    const playerOne = new Player("playerOne", "O")
    const playerTwo = new Player("playerTwo", "X")
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let winningPlayer = null;

    let gameStates = [new GameState(gameBoard, playerOne, false)];
    let currentState = gameStates[gameStates.length - 1];


    //const getActivePlayer = () => currentState.getActivePlayer;
    //const getPlayers = () => players;
    //const getGameBoard = () => gameBoard;
    const getWinningPlayer = () => winningPlayer;
    const getCurrentGameState = () => currentState;

    const switchActivePlayer = (currentPlayer) => {
       return currentPlayer === players[0] ? players[1] : players[0];
    };


    const playRound = (cell) => {
        if (!cell.isOccupied()) {

            const currentBoard = currentState.getGameBoard().getBoard();
            const currentPlayer = currentState.getActivePlayer();

            const newBoard = new GameBoard(currentBoard.map(row => row.map(cell => new Cell(cell.getValue()))));
            newBoard.addMarker(cell, currentPlayer.marker);
           
            if (isGameWon(newBoard.getBoard(), currentPlayer)) {
                winningPlayer = activePlayer;
                gameStates.push(newBoard, null, true);
                return;
            }

            console.log(switchActivePlayer());
            gameStates.push(newBoard, switchActivePlayer(), false);
        } else {
            alert("Square occupied, choose another!")
        }
    }

    function isGameWon(board, player) {
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
        //getActivePlayer,
        //getPlayers,
        //getGameBoard,
        getWinningPlayer,
        getCurrentGameState
    }
})();

export default GameController;