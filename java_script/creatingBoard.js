const board = document.getElementById('board');
const player1PiecesElement = document.getElementById('player1-pieces');
const player2PiecesElement = document.getElementById('player2-pieces');

function start(){
    const selectedRadioButton = document.querySelector('input[name="board-size"]:checked');
    const selectedValue = selectedRadioButton.value;
    let [rows, cols] = selectedValue.split('x').map(Number);
    boardContainer.style.setProperty('--col', cols);
    boardContainer.style.setProperty('--row', rows);
    boardState = criarMatriz(rows,cols);
    createcell(rows,cols);
}

function criarMatriz(rows, cols) {
    let boardState = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0); // Inicializa cada elemento com o valor 0
        }
        boardState.push(row);
    }
    return boardState;
}

function createCellElement(row, col, cols,rows) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);
    cell.addEventListener('click', () => handleCellClick(row, col, cols,rows));
    board.appendChild(cell);

    return cell;
}

function createcell(rows, cols) {
    
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j, cols,rows);
            cells.push(cell);
        }
    }
    updateBoard(cols)
}

function displayPlayerPieces() {
    for (let i = 12; i >= 1 ; i--) {
        const piece = document.createElement('div');
        piece.className = 'player-pieces';
        const number = document.createElement('span');
        number.textContent = i;
        piece.appendChild(number);
        player1PiecesElement.appendChild(piece);
    }

    for (let i = 12; i >= 1; i--) {
        const piece = document.createElement('div');
        piece.className = 'player-pieces';
        const number = document.createElement('span');
        number.textContent = i;
        piece.appendChild(number);
        player2PiecesElement.appendChild(piece);

    }
}
displayPlayerPieces();

