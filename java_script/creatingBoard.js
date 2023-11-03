const board = document.getElementById('board');
const player1PiecesElement = document.getElementById('player1-pieces');
const player2PiecesElement = document.getElementById('player2-pieces');
let rows = 0
let cols = 0

function start(){
    const selectedRadioButton = document.querySelector('input[name="board-size"]:checked');
    const selectedValue = selectedRadioButton.value;
    switch(selectedValue){
        case "5x6":
            rows = 5;
            cols = 6;
            break;
        case "6x5":
            rows = 6;
            cols = 5;
            break;
        default:
            rows = 6;
            cols = 6;
    }
    boardContainer.style.setProperty('--col', cols);
    boardContainer.style.setProperty('--row', rows);
    boardState = criarMatriz();
    createcell(rows,cols);
}

function criarMatriz() {
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

function createCellElement(row, col) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.antrow = -1;
    cell.dataset.antcol = -1;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);
    cell.addEventListener('click', () => handleCellClick(row, col, cell.dataset.antrow, cell.dataset.antcol));
    board.appendChild(cell);

    return cell;
}

function createcell() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = createCellElement(i, j);
            cells.push(cell);
        }
    }
    updateBoard(cols)
}

function displayPlayerPieces() {
    for (let i = 12; i >= 1 ; i--) {
        const piece1 = document.createElement('div');
        piece1.className = 'player-pieces-1';
        //const number = document.createElement('span');
        //number.textContent = i;
        //piece.appendChild(number);
        player1PiecesElement.appendChild(piece1);
        const piece2 = document.createElement('div');
        piece2.className = 'player-pieces-2';
        //const number = document.createElement('span');
        //number.textContent = i;
        //piece.appendChild(number);
        player2PiecesElement.appendChild(piece2);
    }

    /*for (let i = 12; i >= 1; i--) {
        const piece = document.createElement('div');
        piece.className = 'player-pieces-2';
        //const number = document.createElement('span');
        //number.textContent = i;
        //piece.appendChild(number);
        player2PiecesElement.appendChild(piece);

    }*/
}
displayPlayerPieces();

