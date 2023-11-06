const createAccountForm = document.querySelector('.create-account-form');
const createAccountSubmit = document.querySelector('#createAccountSubmit');
const createAccountButton = document.querySelector('#createAccountButton');
const newUsernameInput = document.getElementById('newUsernameInput');
const newPasswordInput = document.getElementById('newPasswordInput');
const confirmPasswordInput = document.getElementById('confirmPasswordInput');

/* CRIAR CONTA */

createAccountButton.addEventListener('click', () => {
    if (createAccountForm.style.display === 'flex') {
        createAccountForm.style.display = 'none';
    } else {
        createAccountForm.style.display = 'flex';
        loginForm.style.display = 'none';
        newUsernameInput.focus();
    }
});

/* SUBMIT BUTAO */

createAccountSubmit.addEventListener('click', () => {
    const username = newUsernameInput.value;
    const password = newPasswordInput.value;
    const confirmPassword = confirmPasswordInput.value;

    if (username === '' || password === '' || confirmPassword === '') {
        alert('Please fill in all fields.');
    } else if (password !== confirmPassword) {
        alert('Passwords do not match.');
    } else {
        createAccountForm.style.display = 'none';
        alert('Account created successfully.');
    }
});
/* AUTOMATIZAR CENAS */

newUsernameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        newPasswordInput.focus();
    }
});
newPasswordInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        createAccountSubmit.click();
    }
});

newUsernameInput.addEventListener('keyup', (event) => {
    if (event.key === 'Enter') {
        passwordInput.focus();
    }
});
