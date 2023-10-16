const board = document.getElementById('board');
const cells = [];
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 1;
const player1Pieces = 9;
const player2Pieces = 9;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;
let boardState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];
// Initialize rows and cols with default values
let rows = 6;
let cols = 6;
const radioButtons = document.querySelectorAll('input[name="board-size"]');
// Add an event listener to each radio button
radioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        if (radioButton.checked) {
            const [selectedRows, selectedCols] = radioButton.value.split('x');
            rows = parseInt(selectedRows, 10);
            cols = parseInt(selectedCols, 10);
            console.log(`Selected Rows: ${rows}`);
            console.log(`Selected Columns: ${cols}`);
        }
    });
});

// Create the board and add event listeners to cells
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = document.createElement('div');
        cell.className = 'cell';
        cell.dataset.row = i;
        cell.dataset.col = j;
        cells.push(cell);
        cell.addEventListener('click', () => handleCellClick(i, j));
        board.appendChild(cell);
    }
}

// Handle a cell click
function handleCellClick(row, col) {
    if (boardState[row][col] === 0) {
        if (currentPlayer === 1 && player1PiecesLeft > 0) {
            boardState[row][col] = 1;
            player1PiecesLeft--;
            currentPlayer = 2;
        } else if (currentPlayer === 2 && player2PiecesLeft > 0) {
            boardState[row][col] = 2;
            player2PiecesLeft--;
            currentPlayer = 1;
        } else {
            // Move a piece
            // Implement your logic here
        }
        updateBoard();
        checkWin(currentPlayer);
    }
}


// Update the board visuals
function updateBoard() {
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        if (boardState[row][col] === 0) {
            cell.textContent = '';
        } else if (boardState[row][col] === 1) {
            cell.textContent = 'X';
        } else {
            cell.textContent = 'O';
        }
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Reset the game
resetButton.addEventListener('click', () => {
    currentPlayer = 1;
    player1PiecesLeft = player1Pieces;
    player2PiecesLeft = player2Pieces;
    boardState = [
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
        [0, 0, 0, 0, 0, 0],
    ];
    updateBoard();
});