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
function createCellElement(row, col) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);

    cell.addEventListener('click', () => handleCellClick(row, col));
    board.appendChild(cell);

    return cell;
}

// Create the board and add event listeners to cells
for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
        const cell = createCellElement(i, j);
        cells.push(cell);
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


function updateBoard() {
    cells.forEach((cell, index) => {
        const row = Math.floor(index / 6);
        const col = index % 6;
        const overlay2 = cell.querySelector('.overlay2');

        if (boardState[row][col] === 0) {
            cell.textContent = 'none';
            //overlay.style.backgroundImage = 'none';
        } else if (boardState[row][col] === 1) {
            cell.textContent = 'O';
            //overlay.style.backgroundImage = 'url("https://www.freepnglogos.com/uploads/rock-png/big-rock-cimarron-deviantart-21.png")';
        } else {
            cell.textContent = 'X';
            //overlay.style.backgroundImage = 'url("https://www.freepnglogos.com/uploads/rock-png/big-rock-cimarron-deviantart-21.png")';
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