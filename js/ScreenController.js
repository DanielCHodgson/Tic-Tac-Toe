import Utility from "./Utility.js"

const ScreenController = (function (gameController) {

  const headerText = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const gameBoard = gameController.getGameBoard();
  const board = gameBoard.getBoard();
  const utility = Utility();

  const updateScreen = () => {

    boardDiv.textContent = "";
    const activePlayer = gameController.getActivePlayer();
    headerText.textContent = `${activePlayer.name}'s turn...`

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = board[i][j];
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.cell = utility.twoDToIndex(i, j, board.length);

        cellButton.appendChild(activePlayerIcon(cell.getValue()));
        boardDiv.appendChild(cellButton);
      }
    }

    if (gameController.getWinningPlayer() != null) {
      displayWin(gameController.getWinningPlayer());
    }
  }

  function activePlayerIcon(cellValue) {

    const tempDiv = document.createElement('div');

    if (cellValue === null)
      return tempDiv;

    tempDiv.innerHTML = (cellValue === "O") ?
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-o</title><path d="M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z" /></svg>` :
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-x</title><path d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z" /></svg>`;

    return tempDiv.firstChild;
  }

  function displayWin(player) {
   headerText.textContent = `${player.name} won!`
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