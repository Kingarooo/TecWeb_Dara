const board = document.getElementById('board');
const cells = [];
const message = document.getElementById('message');
const resetButton = document.getElementById('reset');
let currentPlayer = 1;
const player1Pieces = 12;
const player2Pieces = 12;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;



const radioButtons = document.querySelectorAll('input[name="board-size"]');

radioButtons.forEach(button => {
    button.addEventListener('change', () => {
        const selectedValue = document.querySelector('input[name="board-size"]:checked').value;
        const [rows, cols] = selectedValue.split('x').map(Number);
        boardContainer.style.setProperty('--col', cols);
        boardContainer.style.setProperty('--row', rows);
        let boardState = criarMatriz(rows,cols);
        createcell(rows,cols);
    });
});
message.textContent = `Player ${currentPlayer}'s turn`;
function criarMatriz(rows,cols) {
    boardState = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
}

function createCellElement(row, col,rows,cols) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);

    cell.addEventListener('click', () => handleCellClick(row, col,cols));
    board.appendChild(cell);

    return cell;
}

// Create the board and add event listeners to cells
function createcell(rows,cols,boardState){
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j,rows,cols);
            cells.push(cell);
        }
    }
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


function updateBoard(cols) {
    cells.forEach((cell, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        const overlay2 = cell.querySelector('.overlay2');
        cell.textContent
        if (boardState[row][col] === 0) {
            cell.textContent = 'none';
            //overlay.style.backgroundImage = 'none';
        } else if (boardState[row][col] === 1) {
            cell.textContent = 'O';
            //overlay.style.backgroundImage = 'url("https://www.freepnglogos.com/uploads/rock-png/big-rock-cimarron-deviantart-21.png")';
        } else if (boardState[row][col] ===2){
            cell.textContent = 'X';
            //overlay.style.backgroundImage = 'url("https://www.freepnglogos.com/uploads/rock-png/big-rock-cimarron-deviantart-21.png")';
        }
        else{
            cell.textContent = 'erro';
        }
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}


// Reset the game
resetButton.addEventListener('click', () => {
    currentPlayer = 1;
    player1PiecesLeft = player1Pieces;
    player2PiecesLeft = player2Pieces;
});