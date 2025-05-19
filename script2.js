const board = document.getElementById("board");
const statusText = document.getElementById("status");
const resetBtn = document.getElementById("resetBtn");

const popup = document.getElementById("popup");
const popupMessage = document.getElementById("popupMessage");
const closePopup = document.getElementById("closePopup");

let currentPlayer = "X";
let gameActive = true;
let gameState = ["", "", "", "", "", "", "", "", ""];

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8],  // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8],  // columns
  [0, 4, 8], [2, 4, 6]              // diagonals
];

function handleCellClick(e) {
  const cell = e.target;
  const index = parseInt(cell.getAttribute("data-index"));

  if (gameState[index] !== "" || !gameActive) return;

  gameState[index] = currentPlayer;
  cell.textContent = currentPlayer;

  if (checkWin()) {
    statusText.textContent = `Player ${currentPlayer} wins!`;
    showPopup(`🎉 Player ${currentPlayer} wins!`);
    gameActive = false;
    return;
  }

  if (gameState.every(cell => cell !== "")) {
    statusText.textContent = "It's a draw!";
    showPopup("🤝 It's a draw!");
    gameActive = false;
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function checkWin() {
  return winningCombinations.some(([a, b, c]) => {
    return gameState[a] && gameState[a] === gameState[b] && gameState[a] === gameState[c];
  });
}

function showPopup(message) {
  popupMessage.textContent = message;
  popup.style.display = "flex";
}

closePopup.addEventListener("click", () => {
  popup.style.display = "none";
});

function resetGame() {
  currentPlayer = "X";
  gameActive = true;
  gameState = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `Player ${currentPlayer}'s turn`;
  Array.from(board.children).forEach(cell => (cell.textContent = ""));
  popup.style.display = "none";
}

function createBoard() {
  for (let i = 0; i < 9; i++) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cell.setAttribute("data-index", i);
    cell.addEventListener("click", handleCellClick);
    board.appendChild(cell);
  }
}

resetBtn.addEventListener("click", resetGame);

createBoard();
