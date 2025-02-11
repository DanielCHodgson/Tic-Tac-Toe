import GameController from "./GameController.js";
import ScreenController from "./ScreenController.js";

const App = (function () {

    const startModal = document.querySelector(".input");
    const playerOneField = startModal.querySelector("#player-one-name");
    const playerTwoField = startModal.querySelector("#player-two-name");
    const playBtn = startModal.querySelector("#play-btn");
    const gameContainer = document.querySelector(".game-container");
    let gameController = null;


    function handlePlayClick(event) {
        event.preventDefault();

        let playerOneName = playerOneField.value === "" ? "playerOne" : playerOneField.value;
        let playerTwoName = playerOneField.value === "" ? "playerTwo" : playerTwoField.value;
        initGame(playerOneName, playerTwoName);
        startModal.remove();
        unBindEvents();
        gameContainer.style.display = "grid";
    }
    
    function initGame(playerOneName, playerTwoName) {
        gameController = GameController(playerOneName, playerTwoName);
        ScreenController(gameController);
    }

    function unBindEvents() {
        playBtn.removeEventListener("click", handlePlayClick);
    }

    function bindEvents() {
        playBtn.addEventListener("click", handlePlayClick);
    }


    bindEvents();

    return {
    }

})();




const app = App;