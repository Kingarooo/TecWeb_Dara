// ABRIR SOCKET PARA RECBER PEDIDOS?


//------------------------------------------------------------------------------------------
//---------CRIAR CONTA--------------------------------------------------------------
//-----------------------------------------------------------------------------------------------
let registered = false;
function registerPlayerReq(jsonData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        if (data.error) {
            UsernameInput.value = '';
            PasswordInput.value = '';
            UsernameInput.focus();
            alert(`Error: ${data.error}`);
        } else {
            registerButton.style.display = 'none';
            registerForm.style.display = 'none';
            logOutButton.style.display = 'block';
            parsedData = JSON.parse(jsonData);
            loggedInUsername.textContent = parsedData.nick;
            let userData = {
                nick: parsedData.nick,
                password: parsedData.password,
                victories: 0,
                games: 0,
            }
            console.log('Adding user:', userData);
                addUser(userData);
                registered = true;
                alert('Registration successful, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));
}

//----------------------------------------------------------------------------------------------------------------------------
//--------------ENTRAR NUMA SALA-----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------//----------------------------------------------------------------------------------------------------------------------------

var game;
function joinGroupReq(jsonData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/join', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                leaveGamee.style.display = 'inline';
                game = data.game;
                console.log("Entrada no grupo de jogo com ID" + game);
                alert('Joined group successfuly, but not with professors link.');
                playOnline();
            }
        })
        .catch(error => console.error('Error:', error));
}

function leaveGameReq(jsonData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                console.log("Saida do grupo de jogo");
                alert('Leaving the game, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function notifyReq(jsonData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/notify', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                console.log("Notificação de jogada" + data.nick);

                alert('Notifying player, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function updateReq(urlenData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/update', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: urlenData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                alert('Updating game, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));
}

function rankingReq(jsonData) {
    fetch('http://twserver.alunos.dcc.fc.up.pt:8008/leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
        .then(response => response.json())
        .then(data => {
            if (data.error) {
                alert(`Error: ${data.error}`);
            } else {
                data.ranking
                alert('Showing rankings, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));

}