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

    function getCurrentGameState() { return gameStates[gameStates.length - 1]; };

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

    function cloneBoardGrid(grid) {
        const newGrid = [];
        for (let i = 0; i < grid.length; i++) {
            newGrid[i] = [];
            for (let j = 0; j < grid[i].length; j++) {
                newGrid[i].push(new Cell(grid[i][j].getValue()));
            }
        }
        return newGrid;
    }


    const switchActivePlayer = (playingPlayer) => {
        let newPlayer = playingPlayer.getMarker() === players[0].getMarker() ? players[1] : players[0];
        return newPlayer;
    };


    const playRound = (cell, currentState) => {

        if (!cell.isOccupied()) {


            console.log("last round:");
            console.log(currentState);

            const turn = currentState.getTurn() + 1;
            const playingPlayer = currentState.getActivePlayer();
            const currentBoard = currentState.getGameBoard();

            
            currentBoard.addMarker(cell, playingPlayer.marker);
            const newCurrentBoard = new GameBoard(cloneBoardGrid(currentBoard.getBoard()));

            let newActivePlayer = turn === 0 ? players[0] : switchActivePlayer(playingPlayer);

        
            if (isGameWon(currentBoard.getBoard(), playingPlayer)) {
                gameStates.push(new GameState(turn, newCurrentBoard, playingPlayer, true));
                return;
            }

            gameStates.push(new GameState(turn, newCurrentBoard, newActivePlayer, false));


            console.log("new round:");
            console.log(getCurrentGameState());

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
        gameBoard = new GameBoard(createInitialBoard());
        gameStates = [new GameState(0, gameBoard, playerOne, false)];

    }

    function undoRound() {
        if (gameStates.length > 1) {  
            const lastRound = gameStates.pop();  
            console.log("lastRound:");
            console.log(lastRound);
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