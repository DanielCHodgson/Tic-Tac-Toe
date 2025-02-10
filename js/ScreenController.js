import Utility from "./Utility.js";

const ScreenController = (gameController) => {
  const utility = Utility();
  const headerText = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');
  const undoBtn = document.querySelector('.undo');
  const resetBtn = document.querySelector('.reset');
  let currentState = null;

  function updateScreen() {
    currentState = gameController.getCurrentGameState();
    renderTurnCounter();
    renderBoard();

    if (currentState.isWon()) {
      renderWinMessage(currentState.getActivePlayer());
    }
  }

  function renderWinMessage(player) {
    headerText.textContent = `${player.name} won!`;
  }

  function renderTurnCounter() {
    const turnNum = currentState.getTurn();
    const activePlayer = currentState.getActivePlayer();
    headerText.textContent = `Turn: ${turnNum} ${activePlayer.getName()}'s turn...`;
  }

  function renderBoard() {
    boardDiv.textContent = ""; // Clear previous board
    const board = currentState.getGameBoard().getBoard();
    const fragment = document.createDocumentFragment(); // Optimize DOM updates

    for (let i = 0; i < board.length; i++) {
      for (let j = 0; j < board.length; j++) {
        const cell = board[i][j];
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.cell = utility.twoDToIndex(i, j, board.length);
        cellButton.appendChild(getCellIcon(cell.getValue()));
        fragment.appendChild(cellButton);
      }
    }

    boardDiv.appendChild(fragment); // Batch DOM update
  }

  function getCellIcon(cellValue) {
    const tempDiv = document.createElement('div');
    if (cellValue === null) return tempDiv;

    tempDiv.innerHTML = (cellValue === "O") ?
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-o</title><path d="M11,7A2,2 0 0,0 9,9V15A2,2 0 0,0 11,17H13A2,2 0 0,0 15,15V9A2,2 0 0,0 13,7H11M11,9H13V15H11V9Z" /></svg>` :
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><title>alpha-x</title><path d="M9,7L11,12L9,17H11L12,14.5L13,17H15L13,12L15,7H13L12,9.5L11,7H9Z" /></svg>`;

    return tempDiv.firstChild;
  }

  function handleBoardClick(event) {
    if (!currentState.isWon()) {
      const selectedCell = event.target.dataset.cell;
      if (!selectedCell) return;

      const { row, col } = utility.indexToTwoD(selectedCell, currentState.getGameBoard().getBoard().length);
      gameController.playRound(row, col);
      updateScreen();
    }
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
    resetBtn.addEventListener("click", handleResetClick);
  }

  bindEvents();
  updateScreen();

  return {
    updateScreen,
    renderWinMessage,
  };
};

export default ScreenController;
