const board = document.getElementById('board');
const message = document.getElementById('message');
const resetButton = document.getElementById('resetButton');

let currentPlayer = 'X';
let boardState = ['', '', '', '', '', '', '', '', ''];
let gameOver = false;

function checkWinner() {
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

    for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c]) {
            gameOver = true;
            message.textContent = `¡Jugador ${currentPlayer} gana!`;
            break;
        }
    }

    if (!boardState.includes('') && !gameOver) {
        message.textContent = '¡Empate!';
        gameOver = true;
    }
}

function handleClick(event) {
    const cell = event.target;

    if (!cell.classList.contains('cell') || cell.textContent || gameOver) {
        return;
    }

    cell.textContent = currentPlayer;
    const cellIndex = Array.from(board.children).indexOf(cell);
    boardState[cellIndex] = currentPlayer;

    checkWinner();

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function resetGame() {
    boardState = ['', '', '', '', '', '', '', '', ''];
    gameOver = false;
    currentPlayer = 'X';
    message.textContent = '';
    board.querySelectorAll('.cell').forEach(cell => cell.textContent = '');
}

board.addEventListener('click', handleClick);
resetButton.addEventListener('click', resetGame);

// Crear el tablero
for (let i = 0; i < 9; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    board.appendChild(cell);
}

