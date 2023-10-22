
    const profileOptions = document.getElementById('profileOptions');
    const startButton = document.querySelector('.start-button');
    const settingsDiv = document.querySelector('.settings');
    const gameplayDiv = document.querySelector('.gameplay');
    const overlay = document.querySelector('.overlay');
    const popup = document.querySelector('.popup');
    const settings_icon = document.getElementById('settings-icon');
    const reset = document.getElementById('reset');

    function toggleDropdown() {
        var profileOptions = document.getElementById("profileOptions");
        profileOptions.classList.toggle('visible');
    }

    function togglePopup() {
        if (overlay.style.display === 'block') {
            overlay.style.display = 'none';
            popup.style.display = 'none';
        } else {
            overlay.style.display = 'block';
            popup.style.display = 'block';
        }
        playRulesSound();
    }
        
    startButton.addEventListener('click', () => {
        const selectsize = document.querySelector('input[name="board-size"]:checked');
        const selectoppnent = document.querySelector('input[name="oppnent"]:checked');
        const selectplay = document.querySelector('input[name="player"]:checked');
        //const selectcolor =
        if(selectplay && selectoppnent && selectsize){  
            // Hide the settings div
            settingsDiv.style.display = 'none';
            // Show the gameplay div
            gameplayDiv.style.display = 'flex';
            start();
        }
    });

    settings_icon.addEventListener('click', () => {
        settingsDiv.classList.remove('hidden');
        gameplayDiv.classList.add('hidden');
    });

    reset.addEventListener('click', () => {
        currentPlayer = 1;
        player1PiecesLeft = player1Pieces;
        player2PiecesLeft = player2Pieces;
        totalMoves = 0;

        // Clear the board
        cells.forEach((cell) => {
            cell.classList.remove('player-1', 'player-2');
            cell.style.backgroundImage = 'url("./images_files/backgroundRelva.jpeg")'; // Reset background image
        });
        displayPlayerPieces();
        start();
    });




