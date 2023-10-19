const player1PiecesElement = document.getElementById('player1-pieces');
const player2PiecesElement = document.getElementById('player2-pieces');

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
function criarMatriz(rows, cols) {
    boardState = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
}

function criarMatriz(rows, cols) {
    boardState = Array.from({ length: rows }, () => Array.from({ length: cols }, () => 0));
}


function createCellElement(row, col, rows, cols) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);

    cell.addEventListener('click', () => handleCellClick(row, col, cols));
    board.appendChild(cell);

    return cell;
}

// Create the board and add event listeners to cells
function createcell(rows, cols, boardState) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j, rows, cols);
            cells.push(cell);
        }
    }

}

function displayPlayerPieces() {
    for (let i = 0; i < 12; i++) {
        const piece = document.createElement('div');
        piece.className = 'player-pieces';
        player1PiecesElement.appendChild(piece);
    }

    for (let i = 0; i < 12; i++) {
        const piece = document.createElement('div');
        piece.className = 'player-pieces';
        player2PiecesElement.appendChild(piece);
    }
}

displayPlayerPieces();
