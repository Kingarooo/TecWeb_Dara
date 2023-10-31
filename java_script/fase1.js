const cells = [];
const message = document.getElementById('message');
let currentPlayer = 1;
const player1Pieces = 12;
const player2Pieces = 12;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;
let totalMoves = 0;
let consecutivas = 0;
    
function handleCellClick(row, col, cols, rows) {
    let nextmove = true;
    if (boardState[row][col] === 0) {
        if (currentPlayer === 1 && player1PiecesLeft > 0) {
            boardState[row][col] = 1;
            if (valid_move_col(row, col, 1, cols) || valid_move_row(row, col, 1, rows)){
                boardState[row][col] = 0
                nextmove = false;
            } 
            else{
                player1PiecesLeft--;
            }
        } else if (currentPlayer === 2 && player2PiecesLeft > 0) {
            boardState[row][col] = 2;
            if (valid_move_col(row, col, 2, cols)  || valid_move_row(row, col, 2, rows)){
                boardState[row][col] = 0
                nextmove = false;
            }
            else{
                player2PiecesLeft--;
            }
        }
        if (nextmove){
            totalMoves++;
            updateBoard(cols);
            removePlayerPiece(currentPlayer, currentPlayer === 1 ? player1PiecesLeft : player2PiecesLeft);
            currentPlayer = move_currentPlayer(currentPlayer);
            checkAllMoves();
            playPieceSound();
            nextmove = true;
        }
    }
    else if(boardState[row][col] === 1 || boardState[row][col] === 2){
        possivel_moves(row,col,rows,cols)
        updateBoard(cols);
    }
}

function valid_move_col(row, col, piece, cols){
    consecutivas = 0;
    let r = 3
    let meio_c = Math.floor(cols/2);
    if(col >= meio_c){
        if (col === 2){
            r = 2
        }
        for (let i = col - r; i < meio_c; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[row][i + j] === piece){ 
                    consecutivas += 1;
                    if (consecutivas > 3){
                        return true;
                    }
                }
                else{
                    consecutivas = 0;
                }
            }
            consecutivas = 0;
        }
    }
    else{
        for (let i = 0; i <= col; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[row][i + j] === piece){ 
                    consecutivas+= 1;
                    if (consecutivas > 3){
                        return true;
                    }
                }
                else{
                    consecutivas = 0;
                }
            }
            consecutivas = 0;
        }
    }
    return false;
}

function valid_move_row(row, col, piece, rows){
    consecutivas = 0;
    let r = 3;
    let meio_r = Math.floor(rows/2);
    if(row >= meio_r){
        if (row === 2){
            r = 2
        }
        for (let i = row - r; i < meio_r; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[i+j][col] === piece){ 
                    consecutivas += 1;
                    if (consecutivas > 3){
                        return true;
                    }
                }
                else{
                    consecutivas = 0;
                }
            }
            consecutivas = 0;
        } 
    }
    else{
        for (let i = 0; i <= row; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[i+j][col] === piece){ 
                    consecutivas += 1;
                    if (consecutivas > 3){
                        return true;
                    }
                }
                else{
                    consecutivas = 0;
                }
            }
            consecutivas = 0;
        }
    }
    return false;
}

function move_currentPlayer(player){
    if (player === 1){
        return 2;
    }
    else{
        return 1;
    }
}

function checkAllMoves() {
    if (totalMoves == 24) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            if (!cell.classList.contains('player-1') && !cell.classList.contains('player-2')) {
                cell.style.backgroundImage = 'none'; 
            }
        });
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
            cell.textContent = '';
        } else if (boardState[row][col] === 1) {
            cell.className = 'cell player-1';
        } else if (boardState[row][col] === 2) {
            cell.className = 'cell player-2';
        } else {
            cell.textContent = 'erro';
        }
    });
    message.textContent = `Player ${currentPlayer}'s turn`;
}

function updatePlayerPieces() {
    player1PiecesDisplay.textContent = `Player 1 Pieces: ${player1PiecesLeft}`;
    player2PiecesDisplay.textContent = `Player 2 Pieces: ${player2PiecesLeft}`;
}
