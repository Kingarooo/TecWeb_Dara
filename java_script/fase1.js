let num_piece = 12
const cells = [];
const message = document.getElementById('message');
const player1Pieces = num_piece;
const player2Pieces = num_piece;
let player1PiecesLeft = num_piece;
let player2PiecesLeft = num_piece;
let totalMoves = 0;
let consecutivas = 0;
let row_antiga = 0
let col_antiga = 0
let notremove = true;
let nextmove = true
let fase = 1
let adversario = 0;

function handleCellClick(row, col, antrow, antcol) {
    if (notremove && totalMoves < 24){
        fase = 1;
    }
    else if (notremove && totalMoves >= 24){
        fase = 2
    }
    else if (isGameOver(boardState,currentPlayer)){
        fase = 4
    }
    else{
        fase = 3
    }
    
    switch(fase){
        case 1:
            if (boardState[row][col] === 0) {
                if ((currentPlayer === 1 && player1Pieces > 0) || (currentPlayer === 2 && player2Pieces > 0) ) {
                    boardState[row][col] = currentPlayer;
                    if (valid_move_col(row, col) || valid_move_row(row, col)){
                        boardState[row][col] = 0
                        nextmove = false;
                    } 
                    else{
                        `player${currentPlayer}Pieces--;`
                        nextmove = true;
                    }
                }
                if (nextmove){
                    totalMoves++;
                    updateBoard();
                    removePlayerPiece(currentPlayer === 1 ? player1Pieces : player2Pieces);
                    currentPlayer = move_currentPlayer();
                    playPieceSound();
                    nextmove = true;
                }
            }
            break;
            
            case 2:
                if((currentPlayer ===1 && boardState[row][col] === 1) ||(currentPlayer === 2 && boardState[row][col] === 2)){
                row_antiga = row
                col_antiga = col
                eliminar()
                possivel_moves(row,col,antcol, antrow)
                updateBoard();
            }
            else if (boardState[row][col] === 3){
                eliminar()
                boardState[row_antiga][col_antiga] = 0
                boardState[row][col] = currentPlayer;
                updatelastmove(col_antiga,row_antiga,row,col);
                updateBoard();
                if(move_col(row, col) || move_row(row, col)){
                    notremove = false
                }
                else{
                    currentPlayer = move_currentPlayer();
                }
            }
            break;
            case 3:
            adversario = currentPlayer === 1 ? 2 : 1
            if(boardState[row][col] === adversario){
                boardState[row][col] = 0
                currentPlayer = move_currentPlayer();
                `player${adversario}PiecesLeft--;`
                updateBoard()
                notremove = true
            }
            break;
            case 4:
                console.log("acabou o jogo")
                alert("acabou o jogo");
                break;
    }
}



function eliminar(){
    for(let i = 0; i < rows ; i++){
        for( let j = 0; j < cols; j++){
            if(boardState[i][j] === 3){
                boardState[i][j] = 0
            }
        }
    }
}

function valid_move_col(row, col){
    consecutivas = 0;
    let r = 3
    let meio_c = Math.floor(cols/2);
    if(col >= meio_c){
        if (col === 2){
            r = 2
        }
        for (let i = col - r; i < meio_c; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[row][i + j] === currentPlayer){ 
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
                if (boardState[row][i + j] === currentPlayer){ 
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

function valid_move_row(row, col){
    consecutivas = 0;
    let r = 3;
    let meio_r = Math.floor(rows/2);
    if(row >= meio_r){
        if (row === 2){
            r = 2
        }
        for (let i = row - r; i < meio_r; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[i+j][col] === currentPlayer){ 
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
                if (boardState[i+j][col] === currentPlayer){ 
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

function move_currentPlayer(){
    if (currentPlayer === 1){
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

function removePlayerPiece(piecesLeft) {
    if (piecesLeft >= 0) {
        const playerPieces = document.getElementById(`player${currentPlayer}-pieces`);
        const remainingPieces = playerPieces.querySelectorAll(`.player-pieces-${currentPlayer}`);

        if (remainingPieces.length > 0) {
            playerPieces.removeChild(remainingPieces[0]);
        }
    }
}

function updateBoard() {
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

function move_col(row, col){
    consecutivas = 0;
    let r = 3
    let meio_c = Math.floor(cols/2);
    if(col >= meio_c){
        if (col === 2){
            r = 2
        }
        for (let i = col - r; i < meio_c; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[row][i + j] === currentPlayer){ 
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
                if (boardState[row][i + j] === currentPlayer){ 
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

function move_row(row, col){
    consecutivas = 0;
    let r = 3;
    let meio_r = Math.floor(rows/2);
    if(row >= meio_r){
        if (row === 2){
            r = 2
        }
        for (let i = row - r; i < meio_r; i++){
            for(let j = 0; j < 4; j++){
                if (boardState[i+j][col] === currentPlayer){ 
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
                if (boardState[i+j][col] === currentPlayer){ 
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