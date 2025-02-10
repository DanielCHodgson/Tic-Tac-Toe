export default class GameState {

    #gameBoard;
    #activePlayer;
    #isWon;


    constructor(gameBoard, activePlayer, isWon) {
        this.#activePlayer = activePlayer;
        this.#isWon = isWon;
        this.#gameBoard = gameBoard;
    }

    getGameBoard() {
        return this.#gameBoard;
    }

    getActivePlayer() {
        return this.#activePlayer;
    }

    isWon() {
        return this.#isWon;
    }

}