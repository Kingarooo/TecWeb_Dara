// Add a click event listener to the MyProfile button
const profileOptions = document.getElementById('#profileOptions');
const existingButtons = document.querySelectorAll('.barra');

function toggleDropdown() {
    var profileOptions = document.getElementById("profileOptions");
    if (profileOptions.classList.contains("hidden")) {
        profileOptions.classList.remove("hidden");
    } else {
        profileOptions.classList.add("hidden");
    }
}

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

