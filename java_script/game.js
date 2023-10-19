const board = document.getElementById('board');
const cells = [];
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 1;
const player1Pieces = 12;
const player2Pieces = 12;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;
let totalMoves = 0;

const radioButtons = document.querySelectorAll('input[name="board-size"]');

radioButtons.forEach(button => {
    button.addEventListener('change', () => {
        const selectedValue = document.querySelector('input[name="board-size"]:checked').value;
        const [rows, cols] = selectedValue.split('x').map(Number);
        boardContainer.style.setProperty('--col', cols);
        boardContainer.style.setProperty('--row', rows);
        let boardState = criarMatriz(rows, cols);
        createcell(rows, cols);
    });
});
message.textContent = `Player ${currentPlayer}'s turn`;

function handleCellClick(row, col, cols) {
    if (boardState[row][col] === 0 && totalMoves < 24) {
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
        }
        totalMoves++;
        updateBoard(cols);
        removePlayerPiece(currentPlayer, currentPlayer === 1 ? player1PiecesLeft : player2PiecesLeft);
    }
}

function removePlayerPiece(player, piecesLeft) {
    if (piecesLeft > 0) {
        const playerPieces = document.getElementById(`player${player}-pieces`);
        const remainingPieces = playerPieces.querySelectorAll('.player-pieces');

        if (remainingPieces.length > 0) {
            playerPieces.removeChild(remainingPieces[0]);
        }
    }
}



function updateBoard(cols) {
    cells.forEach((cell, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const overlay2 = cell.querySelector('.overlay2');

        if (boardState[row][col] === 0) {
            cell.textContent = ''; // Clear the cell
        } else if (boardState[row][col] === 1) {
            cell.textContent = 'O'; // You can also set the player 1 piece image here
            removePlayerPiece('player1-pieces'); // Remove a piece from Player 1
        } else if (boardState[row][col] === 2) {
            cell.textContent = 'X'; // You can also set the player 2 piece image here
            removePlayerPiece('player2-pieces'); // Remove a piece from Player 2
        } else {
            cell.textContent = 'erro';
        }
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

// Function to update the player pieces display
function updatePlayerPieces() {
    player1PiecesDisplay.textContent = `Player 1 Pieces: ${player1PiecesCount}`;
    player2PiecesDisplay.textContent = `Player 2 Pieces: ${player2PiecesCount}`;
}