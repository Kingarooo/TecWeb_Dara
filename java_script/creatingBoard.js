const player1PiecesElement = document.getElementById('#player1-pieces');
const player2PiecesElement = document.getElementById('#player2-pieces');

function start(){
    const selectedRadioButton = document.querySelector('input[name="board-size"]:checked');
    const selectedValue = selectedRadioButton.value;
    let [rows, cols] = selectedValue.split('x').map(Number);
    boardContainer.style.setProperty('--col', cols);
    boardContainer.style.setProperty('--row', rows);
    let boardState = criarMatriz(rows,cols);
    createcell(rows,cols);
}

function criarMatriz(rows,cols) {
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

function createcell(rows, cols, boardState) {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j, rows, cols);
            cells.push(cell);
        }
    }
    updateBoard(cols)
}

    function displayPlayerPieces() {
        for (let i = 1; i <= 12 ; i++) {
            const piece = document.createElement('div');
            piece.className = 'player-pieces';
            piece.textContent = i; 
            piece.style.fontSize = '40px';            
            player1PiecesElement.appendChild(piece);
        }

        for (let i = 1; i <= 12; i++) {
            const piece = document.createElement('div');
            piece.className = 'player-pieces';
            piece.textContent = i; 
            piece.style.fontSize = '40px';
            player2PiecesElement.appendChild(piece);

    }
}

displayPlayerPieces();
