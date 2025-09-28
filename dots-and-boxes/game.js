const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const rows = 4; // number of boxes vertically
const cols = 4; // number of boxes horizontally
const spacing = 100; // distance between dots
const dotRadius = 5;

let hLines = Array(rows + 1).fill(null).map(() => Array(cols).fill(0));
let vLines = Array(rows).fill(null).map(() => Array(cols + 1).fill(0));
let boxes = Array(rows).fill(null).map(() => Array(cols).fill(0));

let currentPlayer = 1;

function drawBoard() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw dots
  ctx.fillStyle = "#000";
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j <= cols; j++) {
      ctx.beginPath();
      ctx.arc(j * spacing, i * spacing, dotRadius, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Draw horizontal lines
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (hLines[i][j]) {
        ctx.strokeStyle = hLines[i][j] === 1 ? "blue" : "red";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(j * spacing, i * spacing);
        ctx.lineTo((j + 1) * spacing, i * spacing);
        ctx.stroke();
      }
    }
  }

  // Draw vertical lines
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols; j++) {
      if (vLines[i][j]) {
        ctx.strokeStyle = vLines[i][j] === 1 ? "blue" : "red";
        ctx.lineWidth = 4;
        ctx.beginPath();
        ctx.moveTo(j * spacing, i * spacing);
        ctx.lineTo(j * spacing, (i + 1) * spacing);
        ctx.stroke();
      }
    }
  }

  // Draw boxes with player colors
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      if (boxes[i][j]) {
        ctx.fillStyle = boxes[i][j] === 1 ? "rgba(0, 0, 255, 0.3)" : "rgba(255, 0, 0, 0.3)";
        ctx.fillRect(j * spacing + dotRadius, i * spacing + dotRadius, spacing - dotRadius * 2, spacing - dotRadius * 2);
      }
    }
  }
}

function checkBoxes(lineType, row, col) {
  let scored = false;

  if (lineType === "h") {
    // Check box above the horizontal line
    if (row > 0) {
      if (
        hLines[row - 1][col] &&
        vLines[row - 1][col] &&
        vLines[row - 1][col + 1] &&
        !boxes[row - 1][col]
      ) {
        boxes[row - 1][col] = currentPlayer;
        scored = true;
      }
    }
    // Check box below the horizontal line
    if (row < rows) {
      if (
        hLines[row + 1] &&
        hLines[row + 1][col] &&
        vLines[row][col] &&
        vLines[row][col + 1] &&
        !boxes[row][col]
      ) {
        boxes[row][col] = currentPlayer;
        scored = true;
      }
    }
  } else {
    // vertical line
    // Check box left of the vertical line
    if (col > 0) {
      if (
        vLines[row][col - 1] &&
        hLines[row][col - 1] &&
        hLines[row + 1][col - 1] &&
        !boxes[row][col - 1]
      ) {
        boxes[row][col - 1] = currentPlayer;
        scored = true;
      }
    }
    // Check box right of the vertical line
    if (col < cols) {
      if (
        vLines[row][col + 1] &&
        hLines[row][col] &&
        hLines[row + 1][col] &&
        !boxes[row][col]
      ) {
        boxes[row][col] = currentPlayer;
        scored = true;
      }
    }
  }

  return scored;
}

function handleClick(event) {
  const rect = canvas.getBoundingClientRect();
  const x = event.clientX - rect.left;
  const y = event.clientY - rect.top;

  // Find closest horizontal line spot
  for (let i = 0; i <= rows; i++) {
    for (let j = 0; j < cols; j++) {
      let x1 = j * spacing;
      let y1 = i * spacing;

      if (
        y > y1 - 10 &&
        y < y1 + 10 &&
        x > x1 &&
        x < x1 + spacing &&
        hLines[i][j] === 0
      ) {
        hLines[i][j] = currentPlayer;
        if (!checkBoxes("h", i, j)) {
          currentPlayer = 3 - currentPlayer; // switch player
        }
        updateCurrentPlayer();
        drawBoard();
        return;
      }
    }
  }

  // Find closest vertical line spot
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j <= cols; j++) {
      let x1 = j * spacing;
      let y1 = i * spacing;

      if (
        x > x1 - 10 &&
        x < x1 + 10 &&
        y > y1 &&
        y < y1 + spacing &&
        vLines[i][j] === 0
      ) {
        vLines[i][j] = currentPlayer;
        if (!checkBoxes("v", i, j)) {
          currentPlayer = 3 - currentPlayer; // switch player
        }
        updateCurrentPlayer();
        drawBoard();
        return;
      }
    }
  }
}

function updateCurrentPlayer() {
  document.getElementById("currentPlayer").textContent = currentPlayer;
}

canvas.addEventListener("click", handleClick);

drawBoard();
updateCurrentPlayer();
