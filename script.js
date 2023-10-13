// Add a click event listener to the MyProfile button
const myProfileButton = document.querySelector('.MyProfileButton');
const profileOptions = document.getElementById('profileOptions');
const existingButtons = document.querySelectorAll('.barra');

let optionsVisible = false;

myProfileButton.addEventListener('click', () => {
    // Toggle the visibility of the profile options and hide existing buttons
    optionsVisible = !optionsVisible;

    if (optionsVisible) {
        profileOptions.classList.remove('hidden');
        existingButtons.forEach(button => {
            button.style.display = 'none';
        });
    } else {
        profileOptions.classList.add('hidden');
        existingButtons.forEach(button => {
            button.style.display = 'block';
        });
    }
});

function togglePopup() {
    var overlay = document.querySelector('.overlay');
    var popup = document.querySelector('.popup');

    if (overlay.style.display === 'block') {
        overlay.style.display = 'none';
        popup.style.display = 'none';
    } else {
        overlay.style.display = 'block';
        popup.style.display = 'block';
    }
}
