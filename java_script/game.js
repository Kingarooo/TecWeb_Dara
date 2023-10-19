const board = document.getElementById('board');
const cells = [];
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 1;
const player1Pieces = 12;
const player2Pieces = 12;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;
let boardState = [
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0],
];

// Add an event listener to the radio buttons
const boardSizeRadioButtons = document.querySelectorAll('.board-size-radio');
boardSizeRadioButtons.forEach((radioButton) => {
    radioButton.addEventListener('change', () => {
        if (radioButton.checked) {
            const [selectedRows, selectedCols] = radioButton.value.split('x');
            rows = parseInt(selectedRows, 10);
            cols = parseInt(selectedCols, 10);
        }
    });
});
// Function to create the board with the current size
function createBoard() {
    // Clear the existing grid
    while (board.firstChild) {
        board.removeChild(board.firstChild);
    }

    // Create the grid with the updated size
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j);
            cells.push(cell);
        }
    }

    // Update the board
    updateBoard();
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
// Handle a cell click
function handleCellClick(row, col,cols) {
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
            const p_row = Math.floor(index / cols);
            const p_col = index % cols;

            // Move a piece
            // Implement your logic here
        }
        updateBoard(cols);
        //checkWin(currentPlayer);
    }
}


// Reset the game
resetButton.addEventListener('click', () => {
    currentPlayer = 1;
    player1PiecesLeft = player1Pieces;
    player2PiecesLeft = player2Pieces;
});