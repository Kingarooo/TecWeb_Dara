const board = document.getElementById('board');
const player1PiecesElement = document.getElementById('player1-pieces');
const player2PiecesElement = document.getElementById('player2-pieces');
let max_depth = 1

function start(){
    boardContainer.style.setProperty('--col', cols);
    boardContainer.style.setProperty('--row', rows);
    boardState = create_board();
    create_cell();
    displayPlayerPieces();
}

function create_board() {
    let boardState = [];
    for (let i = 0; i < rows; i++) {
        let row = [];
        for (let j = 0; j < cols; j++) {
            row.push(0);
        }
        boardState.push(row);
    }
    return boardState;
}

function create_html(row, col) {
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.dataset.row = row;
    cell.dataset.col = col;
    cell.dataset.antrow = -1;
    cell.dataset.antcol = -1;
    const overlay2 = document.createElement('div');
    overlay2.className = 'overlay2';
    cell.appendChild(overlay2);
    cell.addEventListener('click', () => handleCellClick(row,col,cell.dataset.antrow,cell.dataset.antcol));
    board.appendChild(cell);
    return cell;
}

function type(cell,row, col,antrow,antcol){
    if(currentPlayer === AIPlayer && typeoppnent === 1){
        if(totalMoves <= 2){
            const best_row = Math.floor(Math.random() * rows ) -1;
            const best_col = Math.floor(Math.random() * cols ) -1;
            boardState[best_row][best_col] = AIPlayer
            totalMoves++;
            updateBoard(cols);
            removePlayerPiece(currentPlayer === 1 ? player1Pieces : player2Pieces);
            currentPlayer = move_currentPlayer();
            playPieceSound();
        }
        else{
            const [_, move] = minimax_fase1(boardState,currentPlayer,max_depth,true);
            const best_move = Math.floor(Math.random() * move.length);
            const [row_1,col_1] = move[best_move];
            boardState[row_1][col_1] = AIPlayer;
            totalMoves++;
            updateBoard(cols);
            removePlayerPiece(currentPlayer === 1 ? player1Pieces : player2Pieces);
            currentPlayer = move_currentPlayer();
            playPieceSound();
        }
        type(cell,cell.dataset.row, cell.dataset.col,cell.dataset.antrow,cell.dataset.antcol)
    }
    else{
        cell.addEventListener('click', () => handleCellClick(cell,row,col,antrow,antcol));
    }
}

function create_cell() {
    for (let i = 0; i < rows; i++) {
        for (let j = 0; j < cols; j++) {
            const cell = create_html(i, j);
            cells.push(cell);
        }
    }
    updateBoard()
}

function displayPlayerPieces() {
    for (let i = 12; i >= 1 ; i--) {
        const piece1 = document.createElement('div');
        piece1.className = 'player-pieces-1';
        player1PiecesElement.appendChild(piece1);
        const piece2 = document.createElement('div');
        piece2.className = 'player-pieces-2';
        player2PiecesElement.appendChild(piece2);
    }
}


