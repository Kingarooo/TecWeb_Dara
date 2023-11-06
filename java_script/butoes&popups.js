const profileOptions = document.getElementById('profileOptions');
const startButton = document.querySelector('.start-button');
const settingsDiv = document.querySelector('.settings');
const gameplayDiv = document.querySelector('.gameplay');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const settings_icon = document.getElementById('settings-icon');
const reset = document.getElementById('reset');
const MyProfileButton = document.querySelector('.MyProfileButton');
const barra = document.querySelector('.barra');
let rows = 0
let cols = 0
let AIPlayer = 0
let HUMPlayer = 0
let currentPlayer = 1
let typeoppnent = 0

function toggleDropdown() {
    var profileOptions = document.getElementById("profileOptions");
    profileOptions.classList.toggle('visible');
}

MyProfileButton.addEventListener('click', toggleDropdown);

document.addEventListener('click', (event) => {
    if (!MyProfileButton.contains(event.target) && !profileOptions.contains(event.target) && profileOptions.classList.contains('visible')) {
        toggleDropdown();
    }
    
    });
MyProfileButton.addEventListener('mouseover', (event) =>{
    if (!profileOptions.classList.contains('visible')) {
        toggleDropdown();
    }
});

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
    if(selectplay && selectoppnent && selectsize){  
        settingsDiv.style.display = 'none';
        gameplayDiv.style.display = 'flex';
        const selectedValue = selectsize.value;
        switch(selectedValue){
            case "5x6":
                rows = 5;
                cols = 6;
                break;
            case "6x5":
                rows = 6;
                cols = 5;
                break;
            default:
                rows = 6;
                cols = 6;
        }
        const player = selectplay.value; 
        switch(player){
            case "p2":
                colorrigth.style.setProperty('--back','rgb(50,205,50)');
                colorrigth.style.setProperty('--border','rgb(50,205,50)');
                currentPlayer = 2;
                AIPlayer = 2; 
                HUMPlayer = 1;
                break;
            default:
                colorleft.style.setProperty('--back','rgb(50,205,50)');
                colorleft.style.setProperty('--border','rgb(50,205,50)');
                currentPlayer = 1;
                AIPlayer = 2;
                HUMPlayer = 1;
        }
        const oppnent = selectoppnent.value;
        switch(oppnent){
            case "ai":
                typeoppnent = 1;
                break;
            default:
                typeoppnent = 0;
        }
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

    cells.forEach((cell) => {
        cell.classList.remove('player-1', 'player-2');
        cell.style.backgroundImage = 'url("./images_files/backgroundRelva.jpeg")'; // Reset background image
    });
    displayPlayerPieces();
    start();
});






