import Gameboard from "./GameBoard.js";

const GameController = (function () {

    const gameBoard = Gameboard();
    const board = gameBoard.getBoard();

    const playerOne = { name: "playerOne", marker: "O" };
    const playerTwo = { name: "playerTwo", marker: "X" };
    const players = [playerOne, playerTwo];
    let activePlayer = players[0];
    let winningPlayer = null;

    const getActivePlayer = () => activePlayer;
    const getPlayers = () => players;
    const getGameBoard = () => gameBoard;
    const getWinningPlayer= () => winningPlayer;

    const switchActivePlayer = () => {
        activePlayer === players[0] ? activePlayer = players[1] : activePlayer = players[0];
    };

    const playRound = (cell, screenController) => {

        const activePlayer = getActivePlayer();

        if (!cell.isOccupied()) {
            gameBoard.addMarker(cell, activePlayer.marker);
            // /gameBoard.printBoard();
            if (didWinGame(activePlayer)) {
                winningPlayer = activePlayer;
                return;
            }
            switchActivePlayer();
        } else alert("Square occupied, choose another!")
    }

    function didWinGame(player) {
        let size = board.length;

        for (let i = 0; i < size; i++) {
            let rowWin = true;
            let colWin = true;
    
            for (let j = 0; j < size; j++) {
                if (board[i][j].getValue() !== player.marker) {
                    rowWin = false;
                }
                if (board[j][i].getValue() !== player.marker) {
                    colWin = false;
                }
            }
    
            if (rowWin || colWin) {
                return true;
            }
        }
    
        let diagWin1 = true;
        let diagWin2 = true;
    
        for (let i = 0; i < size; i++) {
            if (board[i][i].getValue() !== player.marker) {
                diagWin1 = false;
            }
            if (board[i][size - 1 - i].getValue() !== player.marker) {
                diagWin2 = false;
            }
        }
        
        if (diagWin1 || diagWin2) {
            return true;
        }
    
        return false;
    }

    return {
        playRound,
        getActivePlayer,
        getPlayers,
        getGameBoard,
        getWinningPlayer
    }
});

export default GameController;