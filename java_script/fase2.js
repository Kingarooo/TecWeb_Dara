
function possivel_moves(row, col,antcol, antrow) {
    const directions = [
        [0, 1], [0, -1], [1, 0], [-1, 0]
    ];
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
                }
                boardState[row][col] = currentPlayer
            }
        }
    }
}


function updatelastmove(antcol, antrow , row, col){
    cells.forEach((cell, index) => {
        const row1 = Math.floor(index / cols);
        const col1 = index % cols;

        if (row === row1 && col1 ===col) {
            cell.dataset.antrow = antrow;
            cell.dataset.antcol = antcol;
        }
    });
}
