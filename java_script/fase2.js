
function possivel_moves(row,col,cols,rows){
    if(row === 0 && col ===0){
        boardState[row + 1][col] = 0
        boardState[row][col+1] = 0
    }
}