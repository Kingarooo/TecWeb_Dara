// Add a click event listener to the MyProfile button
const profileOptions = document.getElementById('#profileOptions');
const startButton = document.querySelector('.start-button');
const settingsDiv = document.querySelector('.settings');
const gameplayDiv = document.querySelector('.gameplay');
const overlay = document.querySelector('.overlay');
const popup = document.querySelector('.popup');
const settings_icon = document.getElementById('#settings-icon');
var clickSound = document.getElementById('clickSound'); 



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
    clickSound.play();
    clickSound.currentTime = 0;
    setTimeout(function() {
      clickSound.pause();
    }, 1000);
}

startButton.addEventListener('click', () => {
  // Hide the settings div
  settingsDiv.classList.add('hidden');
  
  gameplayDiv.classList.remove('hidden');
});

settings_icon.addEventListener('click', () => {
    settingsDiv.classList.remove('hidden');
    gameplayDiv.classList.add('hidden');
});





