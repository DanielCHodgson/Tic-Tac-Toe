const ScreenController = (function (gameController) {

  const playerTurnDiv = document.querySelector('.turn');
  const boardDiv = document.querySelector('.board');


  const updateScreen = () => {

    boardDiv.textContent = "";
    const board = gameController.getBoard();
    const activePlayer = gameController.getActivePlayer();

    playerTurnDiv.textContent = `${activePlayer.name}'s turn...`

    board.forEach(row => {
      row.forEach((cell, index) => {
        const cellButton = document.createElement("button");
        cellButton.classList.add("cell");
        cellButton.dataset.column = index
        cellButton.textContent = cell.getValue();
        boardDiv.appendChild(cellButton);
      })
    })
  }

  return {
    updateScreen
  }

});


export default ScreenController;