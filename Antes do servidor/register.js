const registerForm = document.querySelector('.register-form');
const registerSubmit = document.getElementById('registerSubmit');
const registerButton = document.getElementById('registerButton');
var UsernameInput = document.getElementById('UsernameInput');
var PasswordInput = document.getElementById('PasswordInput');
const profileButton = document.querySelector('.profileOptions');
let logOutButton = document.getElementById('logOutButton');
const loggedInUsername = document.getElementById('loggedInUsername');

/* CRIAR CONTA */
function submitAccountForm() {
    const formData = {
        nick: UsernameInput.value,
        password: PasswordInput.value
    };
    //------- CONVERTER DADOS PARA JSON_------------------------------------------------
    const jsonData = JSON.stringify(formData);
    registerPlayerReq(jsonData);
}

    registerSubmit.addEventListener('click', () => {
        submitAccountForm();
    });

registerButton.addEventListener('click', () => {
    if(window.getComputedStyle(groupJoinDiv).display === 'none'){
        registerForm.style.display = 'flex';
        UsernameInput.focus();
    } else {
        registerForm.style.display = 'none';
    }
});

logOutButton.addEventListener('click', () => {
    loggedInUsername.textContent = '';
    UsernameInput.value = '';
    PasswordInput.value = '';
    registered = false;
    registerButton.style.display = 'block';
    logOutButton.style.display = 'none';
});
/* AUTOMATIZAR CENAS */

UsernameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        PasswordInput.focus();
    }
});

PasswordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        registerSubmit.click();
    }
});

loggedInUsername.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        MyProfileButton.click();
    }
});