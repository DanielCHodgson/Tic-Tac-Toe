export default class GameState {

    #gameBoard;
    #activePlayer;
    #isWon;
    #turn;


    constructor(turn, gameBoard, activePlayer, isWon) {
        this.#turn = turn;
        this.#gameBoard = gameBoard;
        this.#activePlayer = activePlayer;
        this.#isWon = isWon;
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

    getTurn() {
        return this.#turn;
    }
}