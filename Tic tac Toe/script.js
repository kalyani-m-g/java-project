let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;

const status = document.getElementById("status");
const boardDiv = document.getElementById("board");

function renderBoard() {
  boardDiv.innerHTML = "";
  board.forEach((cell, i) => {
    const cellDiv = document.createElement("div");
    cellDiv.classList.add("cell");
    cellDiv.innerText = cell;
    cellDiv.onclick = () => makeMove(i);
    boardDiv.appendChild(cellDiv);
  });
}

function makeMove(index) {
  if (board[index] === "" && gameActive) {
    board[index] = currentPlayer;
    checkWinner();
    currentPlayer = currentPlayer === "X" ? "O" : "X";
    renderBoard();
  }
}

function checkWinner() {
  const winPatterns = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
  ];
  for (let pattern of winPatterns) {
    const [a, b, c] = pattern;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      status.innerText = `${board[a]} Wins! 🎉`;
      gameActive = false;
      return;
    }
  }
  if (!board.includes("")) {
    status.innerText = "It's a Draw!";
    gameActive = false;
  }
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  status.innerText = "";
  renderBoard();
}

renderBoard();
