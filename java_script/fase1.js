const cells = [];
const message = document.getElementById('message');
const player1Pieces = 12;
const player2Pieces = 12;
let player1PiecesLeft = player1Pieces;
let player2PiecesLeft = player2Pieces;
let totalMoves = 0;
let consecutivas = 0;
let row_antiga = 0
let col_antiga = 0
let notremove = true;
let lastboard = []
    
function handleCellClick(row, col, antrow, antcol) {
    lastboard = criarMatriz();
    if(notremove){
        let nextmove = true;
        if (totalMoves < 24){
            if (boardState[row][col] === 0) {
                if ((currentPlayer === 1 && player1PiecesLeft > 0) || (currentPlayer === 2 && player2PiecesLeft > 0) ) {
                    boardState[row][col] = currentPlayer;
                    if (valid_move_col(row, col, currentPlayer, cols) || valid_move_row(row, col, currentPlayer, rows)){
                        boardState[row][col] = 0
                        nextmove = false;
                    } 
                    else{
                        `player${currentPlayer}PiecesLeft--;`
                    }
                }
                if (nextmove){
                    totalMoves++;
                    updateBoard(cols);
                    removePlayerPiece(currentPlayer === 1 ? player1PiecesLeft : player2PiecesLeft);
                    currentPlayer = move_currentPlayer(currentPlayer);
                    //checkAllMoves();
                    playPieceSound();
                    nextmove = true;
                }
            }
        }
        else{
            if((currentPlayer ===1 && boardState[row][col] === 1) ||(currentPlayer === 2 && boardState[row][col] === 2)){
                row_antiga = row
                col_antiga = col
                boardState = eliminar(rows,cols,boardState)
                possivel_moves(row,col,antcol, antrow)
                updateBoard(cols);
            }
            else if (boardState[row][col] === 3){
                boardState = eliminar(rows,cols,boardState)
                boardState[row_antiga][col_antiga] = 0
                boardState[row][col] = currentPlayer;
                updatelastmove(col_antiga,row_antiga,row,col);
                updateBoard(cols);
                if(move_col(row, col, currentPlayer) || move_row(row, col, currentPlayer)){
                    notremove = false
                }
                else{
                    currentPlayer = move_currentPlayer(currentPlayer);
                }
            } 
        } 
    }
    else{
        switch(currentPlayer){
            case 1:
                if(boardState[row][col] === 2){
                    boardState[row][col] = 0
                    currentPlayer = move_currentPlayer(currentPlayer);
                    updateBoard(cols)
                    notremove = true
                }
                break;
            case 2:
                if(boardState[row][col] === 1){
                    boardState[row][col] = 0
                    currentPlayer = move_currentPlayer(currentPlayer);
                    updateBoard(cols)
                    notremove = true
                }
                break;
        }
    }
    
}


function eliminar(rows,cols,boardState){
    for(let i = 0; i < rows ; i++){
        for( let j = 0; j < cols; j++){
            if(boardState[i][j] === 3){
                boardState[i][j] = 0
            }
        }
    }
    updateBoard(cols)
    return boardState
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
        colorrigth.style.setProperty('--back','rgb(50,205,50)');
        colorrigth.style.setProperty('--border','rgb(50,205,50)');
        colorleft.style.setProperty('--back','');
        colorleft.style.setProperty('--border','');
        return 2;
    }
    else{
        colorleft.style.setProperty('--back','rgb(50,205,50)');
        colorleft.style.setProperty('--border','rgb(50,205,50)');
        colorrigth.style.setProperty('--back','');
        colorrigth.style.setProperty('--border','');
        return 1;
    }
}

/*function checkAllMoves() {
    if (totalMoves == 24) {
        const cells = document.querySelectorAll('.cell');
        cells.forEach((cell) => {
            if (!cell.classList.contains('player-1') && !cell.classList.contains('player-2')) {
                cell.className = 'empty';
            }
        });
    }
}
*/

function removePlayerPiece(piecesLeft) {
    if (piecesLeft >= 0) {
        const playerPieces = document.getElementById(`player${currentPlayer}-pieces`);
        const remainingPieces = playerPieces.querySelectorAll(`.player-pieces-${currentPlayer}`);

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
            if(totalMoves == 24){
                cell.className = 'empty';
            }
        } else if (boardState[row][col] === 1) {
            cell.className = 'cell player-1';
        } else if (boardState[row][col] === 2) {
            cell.className = 'cell player-2';
        } else if (boardState[row][col] === 3) {
            cell.className = 'cell valid';
        } else {
            cell.textContent = 'erro';
        }
    });
    //message.textContent = `Player ${currentPlayer}'s turn`;
}

/*
function updatePlayerPieces() {
    player1PiecesDisplay.textContent = `Player 1 Pieces: ${player1PiecesLeft}`;
    player2PiecesDisplay.textContent = `Player 2 Pieces: ${player2PiecesLeft}`;
}*/

function move_col(row, col, piece){
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
                    if (consecutivas === 3){
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
                    if (consecutivas === 3){
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

function move_row(row, col, piece){
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
                    if (consecutivas === 3){
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
                    if (consecutivas === 3){
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