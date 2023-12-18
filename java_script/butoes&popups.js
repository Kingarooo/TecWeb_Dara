const profileOptions = document.getElementById('profileOptions');
const startButton = document.querySelector('.start-button');
const settingsDiv = document.querySelector('.settings');
const gameplayDiv = document.querySelector('.gameplay');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const reset = document.querySelector('.reset');
const MyProfileButton = document.querySelector('.MyProfileButton');
const barra = document.querySelector('.barra');
const settings2 = document.querySelector('.settings2');
const playFriends = document.querySelector('.play-friends');
let groupJoinDiv;
groupJoinDiv = document.querySelector('.groupJoinDiv');
var leaveGamee = document.getElementById('leaveGamee');
let rows = 0
let cols = 0
let AIPlayer = 0
let HUMPlayer = 0
let currentPlayer = 1
let typeopponent = 0

function toggleDropdown() {
    var profileOptions = document.getElementById("profileOptions");
    profileOptions.classList.toggle('visible');
}

function playOnline() {
    const groupJoinDiv = document.querySelector('.groupJoinDiv');
    const groupCodeInput = document.getElementById('groupCode');
    if (window.getComputedStyle(groupJoinDiv).display === 'none') {
        groupJoinDiv.style.display = 'flex';
        groupCodeInput.focus();
    }
    else {
        const selectsize = document.querySelector('input[name="board-size"]:checked');
        const selectedValue = selectsize.value;
        const group = groupCodeInput.value;
        const [rowValue, colValue] = selectedValue.split("x");
        const rows = parseInt(rowValue, 10);
        const columns = parseInt(colValue, 10);
        const nick = UsernameInput.value;
        const password = PasswordInput.value;
        const size = {
            rows,
            columns
        }
        const formData = {
            group,
            nick,
            password,
            size
        };
        const jsonData = JSON.stringify(formData);
        StartButtonOnline();
        joinGroupReq(jsonData);
        playOnline();
        groupJoinDiv.style.display = 'none';
        reset.style.display = 'none';
        leaveGamee.style.display = 'inline';
    }
}

leaveGamee.addEventListener('click', leaveGame);

function leaveGame() {
    settings2.style.display = 'flex';
    settingsDiv.style.display = 'flex';
    gameplayDiv.style.display = 'none';
    boardState = [];
    const nick = UsernameInput.value;
    const password = PasswordInput.value;
    const formData = {
        nick,
        password,
        game
    };
    const jsonData = JSON.stringify(formData);
    console.log('Request JSON:', jsonData);
    leaveGameReq(jsonData);
}

const GoBack = document.querySelector('.GoBack');

GoBack.addEventListener('click', () => {
    groupJoinDiv.style.display = 'none';
}
);
const playFriendsText = document.getElementById('play-friends-text');
const groupCodeInput = document.getElementById('groupCode');
groupCodeInput.addEventListener('input', (event) => {
    playFriendsText.textContent = 'Start Online Game';
});

function notify(move) {
    const nick = UsernameInput.value;
    const password = PasswordInput.value;
    // const move =
    const formData = {
        game,
        nick,
        password,
        move
    };
    const jsonData = JSON.stringify(formData);
    notifyReq(jsonData);
}

function update() {
    const nick = UsernameInput.value;
    const formData = {
        game,
        nick
    };
    const urlenData = encodeURI(formData);
    updateReq(urlenData);
}

startButton.addEventListener('click', StartButton);

function StartButton() {
    const missingOptions = [];
    const selectsize = document.querySelector('input[name="board-size"]:checked');
    const selectopponent = document.querySelector('input[name="opponent"]:checked');
    const selectplay = document.querySelector('input[name="player"]:checked');
    const color = document.querySelector('input[name="color"]:checked');
    const difficulty = document.querySelector('input[name="difficulty"]:checked');
    //cenas para aparecer no alerta//////////////
    if (!selectsize) { missingOptions.push('Board Size'); }
    if (!selectopponent) { missingOptions.push('Opponent'); }
    if (!selectplay) { missingOptions.push('Player'); }
    if (!color) { missingOptions.push('Color'); }
    if (!difficulty) { missingOptions.push('Difficulty'); }
    ////////////////////////////////////////
    if (missingOptions.length === 0 || (missingOptions.length === 1 && selectopponent.value === "human")) {
        settingsDiv.style.display = 'none';
        settings2.style.display = 'none';
        gameplayDiv.style.display = 'flex';
        //-----DEFENIR TAMANHO DO TABULEIRO
        const selectedValue = selectsize.value;
        const [rowValue, colValue] = selectedValue.split("x");
        rows = parseInt(rowValue, 10);
        cols = parseInt(colValue, 10);
        //-----DEFENIR JOGADOR
        const player = selectplay.value;
        switch (player) {
            case "p2":
                colorrigth.style.setProperty('--back', 'rgb(50,205,50)');
                colorrigth.style.setProperty('--border', 'rgb(50,205,50)');
                currentPlayer = 2;
                AIPlayer = 1;
                HUMPlayer = 2;
                break;
            default:
                colorleft.style.setProperty('--back', 'rgb(50,205,50)');
                colorleft.style.setProperty('--border', 'rgb(50,205,50)');
                currentPlayer = 1;
                AIPlayer = 2;
                HUMPlayer = 1;
        }
        //-----DEFENIR OPONENTE
        const opponent = selectopponent.value;
        switch (opponent) {
            case "ai":
                typeopponent = 1;
                break;
            case "friend":
                typeopponent = 2;
                break;
            default:
                typeopponent = 0;
        }
        //-----DEFENIR COR
        const colorValue = color.value;
        switch (colorValue) {
            case "black":

        }
        //-----DEFENIR DIFICULDADE-----------------------------
        //---------------------------------------------------
        // const difficultyValue = difficulty.value;
        // switch (difficultyValue) {
        //     case "easy":
        //         break;
        //     case "medium":
        //         break;
        //     case "hard":
        //         break;
        //     default:
        //         break;
        // }
        start();
    }
    else
        alert(`Please select the following options: ${missingOptions.join(', ')}`);
}

function StartButtonOnline() {
    const selectsize = document.querySelector('input[name="board-size"]:checked');
    settingsDiv.style.display = 'none';
    settings2.style.display = 'none';
    gameplayDiv.style.display = 'flex';
    //-----DEFENIR TAMANHO DO TABULEIRO
    const selectedValue = selectsize.value;
    const [rowValue, colValue] = selectedValue.split("x");
    rows = parseInt(rowValue, 10);
    cols = parseInt(colValue, 10);
    //-----DEFENIR JOGADOR
    colorleft.style.setProperty('--back', 'rgb(50,205,50)');
    colorleft.style.setProperty('--border', 'rgb(50,205,50)');
    currentPlayer = 1;
    AIPlayer = 2;
    HUMPlayer = 1;
    typeopponent = 2;
    reset.style.display = 'none';
    const groupJoinDiv = document.querySelector('.groupJoinDiv');
    groupJoinDiv.style.display = 'none';
    start();
}

MyProfileButton.addEventListener('click', toggleDropdown);

document.addEventListener('click', (event) => {
    if (!MyProfileButton.contains(event.target) && !profileOptions.contains(event.target) && profileOptions.classList.contains('visible')) {
        toggleDropdown();
    }

});
MyProfileButton.addEventListener('mouseover', (event) => {
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

const aiOptionsDiv = document.querySelector(".AI-settings");
const aiRadioButton = document.getElementById('AII');
// const humanRadioButton = document.getElementById('Human');
aiRadioButton.addEventListener('change', () => {
    if (aiRadioButton.checked) {
        aiOptionsDiv.classList.remove('hidden');
    } else {
        // if (humanRadioButton.checked)
        aiOptionsDiv.classList.add('hidden');
    }
});


reset.addEventListener('click', () => {
    settingsDiv.classList.remove('hidden');
    gameplayDiv.classList.add('hidden');
    board.innerHTML = '';
    alert("O jogo foi reiniciado");

    StartButton();
});

const aiRadio = document.getElementById("AII");






