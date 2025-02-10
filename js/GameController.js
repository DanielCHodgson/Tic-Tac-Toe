import GameBoard from "./GameBoard.js";
import Cell from "./Cell.js";
import Player from "./Player.js";
import GameState from "./GameState.js";

const GameController = (function () {
    let gameBoard = new GameBoard(createInitialBoard());
    const playerOne = new Player("playerOne", "O");
    const playerTwo = new Player("playerTwo", "X");
    const players = [playerOne, playerTwo];
    let gameStates = [new GameState(1, gameBoard, playerOne, false)];

    function getCurrentGameState() {
        return gameStates[gameStates.length - 1];
    }

    function createInitialBoard() {
        return Array(3).fill(null).map(() => Array(3).fill(null).map(() => new Cell(null)));
    }

    function cloneBoardGrid(grid) {
        return grid.map(row => row.map(cell => new Cell(cell.getValue())));
    }

    const switchActivePlayer = (activePlayer) => {
        let newPlayer = activePlayer.getMarker() === players[0].getMarker() ? players[1] : players[0];
        return newPlayer;
    };


    function playRound(row, col) {
        const currentState = getCurrentGameState();
        const currentBoard = currentState.getGameBoard();
        const cell = currentBoard.getCell(row, col);

        if (cell.isOccupied()) {
            console.warn("Square occupied, choose another!");
            return;
        }

        const turn = currentState.getTurn() + 1;
        const activePlayer = currentState.getActivePlayer();
        const newBoardGrid = cloneBoardGrid(currentBoard.getBoard());
        const newCurrentBoard = new GameBoard(newBoardGrid);
        newCurrentBoard.addMarker(row, col, activePlayer.marker);

        const gameWon = isGameWon(newBoardGrid, activePlayer);
        const newActivePlayer = switchActivePlayer(activePlayer);

        gameStates.push(new GameState(turn, newCurrentBoard, gameWon ? activePlayer : newActivePlayer, gameWon));
    }

    function isGameWon(board, player) {
        const size = board.length;
        const marker = player.marker;

        // Check rows and columns
        for (let i = 0; i < size; i++) {
            if (board[i].every(cell => cell.getValue() === marker) || 
                board.map(row => row[i]).every(cell => cell.getValue() === marker)) {
                return true;
            }
        }

        // Check diagonals
        if (board.every((_, i) => board[i][i].getValue() === marker) || 
            board.every((_, i) => board[i][size - 1 - i].getValue() === marker)) {
            return true;
        }

        return false;
    }

    function reset() {
        gameBoard = new GameBoard(createInitialBoard());
        gameStates = [new GameState(0, gameBoard, playerOne, false)];
    }

    function undoRound() {
        if (gameStates.length > 1) {
            gameStates.pop();
        }
    }

    return {
        getCurrentGameState,
        playRound,
        undoRound,
        reset,
    }
})();

export default GameController;