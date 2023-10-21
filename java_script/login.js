const loginForm = document.querySelector('.login-form');
const loginButton = document.getElementById('loginButton');
const logOutButton = document.getElementById('logOutButton');
const usernameInput = document.getElementById('usernameInput');
const passwordInput = document.getElementById('passwordInput');
const submitButton = document.getElementById('loginSubmit');
const loggedInUsername = document.getElementById('loggedInUsername');
const profileButton = document.querySelector('.profileOptions');
const validUsername = "";
const validPassword = "";

/*------------------------------------------------------------------------
---------------BUTAO LOG IN----------------------------------------------- */
loginButton.addEventListener('click', () => {
    if (loginForm.style.display === 'flex') {
        loginForm.style.display = 'none';
    } else {
        loginForm.style.display = 'flex';
        createAccountForm.style.display = 'none';   
        usernameInput.focus();
    }
});

/*----------------------------------------------------------------------
-----------------BUTAO LOGOUT-------------------------------------------*/
logOutButton.addEventListener('click', () => {
    loggedInUsername.textContent = '';
    usernameInput.value = '';
    passwordInput.value = '';
    loginButton.style.display = 'block';
    logOutButton.style.display = 'none';
});
/*-------------------------------------------------------------------------
----------------BUTAO LOGINSUBMIT -------------------------------------- */
submitButton.addEventListener('click', () => {
    const enteredUsername = usernameInput.value;
    const enteredPassword = passwordInput.value;

    if (enteredUsername === validUsername && enteredPassword === validPassword) {
        usernameInput.value = '';
        passwordInput.value = '';
        loginForm.style.display = 'none';
        loggedInUsername.textContent = `PINTOOO`; //DEPOIS POR ISTO ${enteredUsername}
        loginButton.style.display = 'none';
        logOutButton.style.display = 'block';
    } else {
        alert('Invalid username or password. Please try again.');
    }
});

/*-----------------------------------------------------------------------
--------------------CENAS PARA AUTOMATIZAR---------------------------*/
usernameInput.addEventListener('keyup', (event) => {
        if (event.key === 'Enter') {
            passwordInput.focus();
        }
});
passwordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        submitButton.click();
    }
});

usernameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        passwordInput.focus();
    }
});

loggedInUsername.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        profile.focus();
    }
});
