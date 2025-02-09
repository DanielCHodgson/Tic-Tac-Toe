import Utility from "./Utility.js"

const ScreenController = (function (gameController) {

  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const gameBoard = gameController.getGameBoard();
  const board = gameBoard.getBoard();
  const utility = Utility();
  
  const updateScreen = () => {

    boardDiv.textContent = "";
    const activePlayer = gameController.getActivePlayer();
    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = board[i][j];
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.cell = utility.twoDToIndex(i, j, board.length);
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      }
    }

    if (gameController.getWinningPlayer() != null) {
      displayWin(gameController.getWinningPlayer());
    }
  }

  function displayWin(player) {
    alert(player.name + "WON!");
  }

  function handleBoardClick(event) {
    const selectedCell = event.target.dataset.cell;
    if (!selectedCell)
      return;
    const point = utility.indexToTwoD(selectedCell, board.length);
    const cell = gameBoard.getCell(point[0], point[1]);
    gameController.playRound(cell, this);
    updateScreen();
  }

  function bindEvents() {
    boardDiv.addEventListener("click", handleBoardClick);
  }

  bindEvents()
  updateScreen();

  return {
    updateScreen,
    displayWin
  }
});

export default ScreenController;