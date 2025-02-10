export default class GameState {

    #gameBoard;
    #activePlayer;
    #status;
    #turn;


    constructor(turn, gameBoard, activePlayer, status) {
        this.#turn = turn;
        this.#gameBoard = gameBoard;
        this.#activePlayer = activePlayer;
        this.#status = status;
    }

    getGameBoard() {
        return this.#gameBoard;
    }

    getActivePlayer() {
        return this.#activePlayer;
    }

    s
    getStatus() {
        return this.#status;
    }

    getTurn() {
        return this.#turn;
    }
}