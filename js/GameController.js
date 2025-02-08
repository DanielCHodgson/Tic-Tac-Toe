import Gameboard from "./GameBoard.js";

const GameController = (function () {

    const gameBoard = Gameboard();

    const playerOne = { name: "playerOne", marker: "O" };
    const playerTwo = { name: "playerTwo", marker: "X" };

    const players = [playerOne, playerTwo];

    let activePlayer = players[0];

    const getActivePlayer = () => activePlayer;

    const getBoard =() => gameBoard.getBoard();

    const switchActivePlayer = () => {
        activePlayer = players[0] ? players[1] : players[0];
    };

    const printNewRound = () => {
        gameBoard.printBoard();
        console.log(`${getActivePlayer().name}'s turn.`);
    }

    const playRound = (row, col) => {

        const cell = gameBoard.getCell(row, col);

        console.log(`Placing ${getActivePlayer().name}'s marker into cell ${row},${col} `);

        gameBoard.addMarker(cell, getActivePlayer().marker);

        switchActivePlayer();
        printNewRound();
    }

    return {
        playRound,
        getActivePlayer,
        getBoard
    }
});

export default GameController;