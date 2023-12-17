let moves = []
function total_moves(){
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            moves.push((i,j))
        }
    }
}


function successors(board, piece) {
    const successors = []
    cells.forEach((cell, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        if (board[row][col] === piece) {
            const newboard = successor(board,piece,row,col,cell.dataset.antcol, cell.dataset.antrow)
            if(newboard.length > 0){
                successors.push(newboard);
            }
        }
    });
    return successors
}

function successors_fase1(board, piece) {
    const successors = []
    cells.forEach((cell, index) => {
        const row = Math.floor(index / cols);
        const col = index % cols;
        console.log("row")
        console.log(row)
        console.log("col")
        console.log(col)
        console.log(board[row][col])
        if (board[row][col] === piece ) {
            const newboard = successor(board,piece,row,col,cell.dataset.antcol, cell.dataset.antrow)
            if(newboard.length > 0){
                successors.push(newboard);
            }
        }
    });
    return successors
}

function successor(board,piece,row,col,antcol,antrow){
    const successor = []
    const directions = [ [0, 1], [0, -1], [1, 0], [-1, 0] ];
    for (const [dr, dc] of directions) {
        const newRow = row + dr;
        const newCol = col + dc;
        const newboard = copy(board)
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && (newRow != antrow || newCol != antcol)) {
            if (newboard[newRow][newCol] === 0){
                newboard[row][col] = 0
                newboard[newRow][newCol] = piece;
                if(valid_move_col(newRow, newCol) || valid_move_row(newRow, newCol)){
                    newboard[newRow][newCol] = 0;
                }
                else{
                    newboard[newRow][newCol] = piece;
                    successor.push((newRow,newCol,newboard))
                }
            }
        }
    }
    return successor;
}
function copy(board){
    let board_cop = create_board()
    for(let i =0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            board_cop[i][j] = board[i][j];
        }
    }
    return board_cop
}

function possivel_moves(row, col,antcol, antrow) {
    let move = 0 
    const directions = [ [0, 1], [0, -1], [1, 0], [-1, 0] ];
    for (const [dr, dc] of directions) {
        let newRow = row + dr;
        let newCol = col + dc;
        if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && (newRow != antrow || newCol != antcol)) {
            if (boardState[newRow][newCol] === 0){
                boardState[row][col] = 0
                boardState[newRow][newCol] = currentPlayer;
                if(valid_move_col(newRow, newCol) || valid_move_row(newRow, newCol)){
                    boardState[newRow][newCol] = 0;
                }
                else{
                    boardState[newRow][newCol] = 3;
                    move++;
                }
                boardState[row][col] = currentPlayer
            }
        }
    }
    return move;
}


function updatelastmove(antcol, antrow , row, col){
    cells.forEach((cell, index) => {
        const row1 = Math.floor(index / cols);
        const col1 = index % cols;
        if (row === row1 && col1 ===col) {
            cell.dataset.antrow = antrow;
            cell.dataset.antcol = antcol;
        }
        else if(boardState[row1][col1] == currentPlayer){
                cell.dataset.antrow = -1
                cell.dataset.antcol = -1
        }
    });
}

function count_piece_left(board,piece){
    let count = 0;
    for(let i = 0; i < rows; i++){
        for(let j = 0; j < cols; j++){
            if(board[i][j] === piece){
                count++;
            }
        }
    }
    return count;
}

function  isGameOver(board,piece){
    return (count_piece_left(board,1) === 2 || count_piece_left(board,2) === 2) || successors(board,piece).length === 0
}