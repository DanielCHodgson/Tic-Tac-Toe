import Utility from "./Utility.js"

const ScreenController = (function (gameController) {

  const utility = Utility();
  const headerText = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const undoBtn = document.querySelector('.undo');
  //const resetBtn = document.querySelector('.reset');
  let currentState = null;

  const updateScreen = () => {

    currentState = gameController.getCurrentGameState();

    setTurnName(currentState);
    updateBoardGrid(currentState);

    if (currentState.isWon()) {
      displayWin(currentState.getActivePlayer());
    }
  }

  function displayWin(player) {
    headerText.textContent = `${player.name} won!`
  }

  function setTurnName(currentState) {
    boardDiv.textContent = "";
    const activePlayer = currentState.getActivePlayer();
    headerText.textContent = `${activePlayer.getName()}'s turn...`
  }

  function updateBoardGrid(currentState) {

    const board = currentState.getGameBoard().getBoard();

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = board[i][j];
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.cell = utility.twoDToIndex(i, j, board.length);
        cellButton.appendChild(getCellIcon(cell.getValue()));
        boardDiv.appendChild(cellButton);
      }
    }
  }

  function getCellIcon(cellValue) {

    const tempDiv = document.createElement('div');

    if (cellValue === null)
      return tempDiv;

    tempDiv.innerHTML = (cellValue === "O") ?
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-o</title><path d="M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z" /></svg>` :
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-x</title><path d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z" /></svg>`;

    return tempDiv.firstChild;
  }


  function handleBoardClick(event) {

    const gameBoard = currentState.getGameBoard();
    const board = gameBoard.getBoard();

    const selectedCell = event.target.dataset.cell;
    if (!selectedCell) return;
 
    const point = utility.indexToTwoD(selectedCell, board.length);
    const cell = gameBoard.getCell(point[0], point[1]);
    gameController.playRound(cell, currentState);
    updateScreen();
  }

  function handleUndoClick() {
    gameController.undoRound();
    updateScreen();
  }

  function handleResetClick() {
    gameController.reset();
    updateScreen();
  }

  function bindEvents() {
    boardDiv.addEventListener("click", handleBoardClick);
    undoBtn.addEventListener("click", handleUndoClick);
    //resetBtn.addEventListener("click", handleResetClick);
  }

  bindEvents()
  updateScreen();

  return {
    updateScreen,
    displayWin
  }
});

export default ScreenController;