    const cells = [];
    const message = document.getElementById('message');
    let currentPlayer = 1;
    const player1Pieces = 12;
    const player2Pieces = 12;
    let player1PiecesLeft = player1Pieces;
    let player2PiecesLeft = player2Pieces;
    let totalMoves = 0;

    function handleCellClick(row, col, cols) {
        if (boardState[row][col] === 0) {
            if (currentPlayer === 1 && player1PiecesLeft > 0) {
                boardState[row][col] = 1;
                player1PiecesLeft--;
            } else if (currentPlayer === 2 && player2PiecesLeft > 0) {
                boardState[row][col] = 2;
                player2PiecesLeft--;
            } else {
                // Handle moving pieces (not implemented yet)
                //
                // This is where you will handle moving pieces
            }
            totalMoves++;
            updateBoard(cols);
            removePlayerPiece(currentPlayer, currentPlayer === 1 ? player1PiecesLeft : player2PiecesLeft);
            currentPlayer = move_currentPlayer(currentPlayer);
            
            checkAllMoves();
            playPieceSound();
        }
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
        if (totalMoves >= 24) {
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
