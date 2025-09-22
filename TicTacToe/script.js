// File: script.js
const cells = document.querySelectorAll('.cell');
const resetButton = document.getElementById('reset-button');
let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameOver = false;

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        if (gameOver || cell.classList.contains('taken')) return;
        const index = cell.getAttribute('data-index');
        board[index] = currentPlayer;
        cell.textContent = currentPlayer;
        cell.classList.add('taken');
        if (checkWinner(currentPlayer)) {
            alert(`${currentPlayer} wins!`);
            gameOver = true;
            return;
        }
        if (board.every(cell => cell)) {
            alert("It's a draw!");
            gameOver = true;
            return;
        }
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    });
});

resetButton.addEventListener('click', () => {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameOver = false;
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
    });
});

function checkWinner(player) {
    const winPatterns = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];
    return winPatterns.some(pattern => {
        return pattern.every(index => board[index] === player);
    });
}
