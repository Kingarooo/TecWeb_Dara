// Add a click event listener to the MyProfile button
const profileOptions = document.getElementById('#profileOptions');
const startButton = document.querySelector('.start-button');
const settingsDiv = document.querySelector('.settings');
const gameplayDiv = document.querySelector('.gameplay');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const settings_icon = document.getElementById('#settings-icon');

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
    playClickSound();
}
    
startButton.addEventListener('click', () => {
    // Hide the settings div
    settingsDiv.style.display = 'none';

    // Show the gameplay div
    gameplayDiv.style.display = 'flex';
});

settings_icon.addEventListener('click', () => {
    settingsDiv.classList.remove('hidden');
    gameplayDiv.classList.add('hidden');
});

resetButton.addEventListener('click', () => {
    currentPlayer = 1;
    player1PiecesLeft = player1Pieces;
    player2PiecesLeft = player2Pieces;
    totalMoves = 0; // Reset total moves
});



