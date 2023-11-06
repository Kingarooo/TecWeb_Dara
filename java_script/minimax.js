function minimax(board, piece,depth, isMaximizingPlayer) {
    if (depth === 0 || isGameOver(board,piece)) {
      return evaluate(board,piece),_;
    }
  
    if (isMaximizingPlayer) {
      const best_cost = -Infinity;
      const best_move = []
      for((newRow,newCol,newboard) in successors(board, piece)){
        valeu, _= minimax(newboard,piece,depth - 1, false);
        if (depth === max_depth){
            if (best_cost === value){
                best_move.push((newRow,newCol))
            }
            if (value > best_cost){
                best_cost = value
                best_move = []
                best_move.push((newRow,newCol))
            }
        }   
        else{
            best_cost = Math.max(best_cost, value)
        }
      }
      return best_cost,best_move

    } else {
        const best_cost = +Infinity;
        const best_move = []
        for((newRow,newCol,newboard) in successors(board, piece)){
          valeu, _= minimax(newboard,piece,depth - 1, true);
          if (depth === max_depth){
              if (best_cost === value){
                  best_move.push((newRow,newCol))
              }
              if (best_cost > valeu){
                  best_cost = value
                  best_move = []
                  best_move.push((newRow,newCol))
              }
          }   
          else{
              best_cost = Math.min(best_cost, value)
          }
        }
        return best_cost,best_move
    }
} 


function generatePossibleMoves(currentPlayer) {
    const possibleMoves = [];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (boardState[row][col] === currentPlayer) {
                const directions = [
                    [0, 1], [0, -1], [1, 0], [-1, 0]
                ];

                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;
                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols) {
                        if (boardState[newRow][newCol] === 0) {
                            // Check if moving to the new position is valid
                            boardState[row][col] = 0;
                            boardState[newRow][newCol] = currentPlayer;
                            if (!(valid_move_col(newRow, newCol, currentPlayer, cols) || valid_move_row(newRow, newCol, currentPlayer, rows))) {
                                possibleMoves.push({ fromRow: row, fromCol: col, toRow: newRow, toCol: newCol });
                            }
                            // Revert the board state
                            boardState[row][col] = currentPlayer;
                            boardState[newRow][newCol] = 0;
                        }
                    }
                }
            }
        }
    }

    return possibleMoves;
}

function countPossibleCaptures(boardState, currentPlayer) {
    const rows = boardState.length;
    const cols = boardState[0].length;
    let possibleMoves = 0;

    // Define as direções possíveis para os movimentos (horizontal e vertical)
    const directions = [[0, 1], [1, 0], [0, -1], [-1, 0]];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (boardState[row][col] === currentPlayer) {
                for (const [dr, dc] of directions) {
                    const newRow = row + dr;
                    const newCol = col + dc;

                    if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && boardState[newRow][newCol] === 0) {
                        possibleMoves++;
                    }
                }
            }
        }
    }

    return possibleMoves;
}

  
function evaluate(board, piece) {
    let playerScore = 0;
    const opponent = currentPlayer === 1 ? 2 : 1
    // Define as direções possíveis para formar sequências de 3 peças
    const directions = [[0, 1], [1, 0], [1, 1], [1, -1]];

    for (let row = 0; row < rows; row++) {
        for (let col = 0; col < cols; col++) {
            if (board[row][col] === piece) {
                for (const [dr, dc] of directions) {
                    let sequence = 0;
                    let newRow = row;
                    let newCol = col;

                    // Verifica quantas sequências de 3 o jogador atual possui
                    while (sequence < 3 && newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === piece) {
                        sequence++;
                        newRow += dr;
                        newCol += dc;
                    }

                    if (sequence === 3) {
                        playerScore += 1;  // Sequência de 3 peças do jogador atual
                    }
                }
            }
        }
    }

    // Avalie a mobilidade do jogador atual
    const playerMobility = successors(piece).length;
    const opponentMobility = successors(opponent).length;

    // Avalie a captura de peças do oponente
    const playerCaptures = countPossibleCaptures(boardState, piece);
    const opponentCaptures = countPossibleCaptures(boardState, opponent);

    // Pondere os fatores
    const mobilityWeight = 0.1;
    const capturesWeight = 0.5;

    playerScore += mobilityWeight * (playerMobility - opponentMobility);
    playerScore += capturesWeight * (playerCaptures - opponentCaptures);

    return playerScore;
}

