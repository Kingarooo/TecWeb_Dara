// ABRIR SOCKET PARA RECBER PEDIDOS?
//----------------------------------------------------------------------------------------------------------------------------
//--------------ENTRAR NUMA SALA-----------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------------------------------------------//----------------------------------------------------------------------------------------------------------------------------
const popup2 = document.getElementById('userPopup');
var popupMessage = document.getElementById('popupMessage');

function showPopup2(message, duration = 3000) {

    popupMessage.textContent = message;
    popup2.style.display = 'block';

    setTimeout(() => {
        popup2.style.display = 'none';
    }, duration);
}

var game;
function joinGroupReq(jsonData) {
    fetch('http://localhost:8119/join', {
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
    fetch('http://localhost:8119/leave', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })       //
        //NAO POR NADA QUE NAO SEJA JSON QUANDO ESCREVO NO RESPONSE
        //
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
    fetch('http://localhost:8119/notify', {
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
    fetch('http://localhost:8119/update', {
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
    fetch('http://localhost:8119/ranking', {
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
                showPopup2("Showing rankings!");
                createUserRankingsList(groupId);
                if (rankings.style.display === 'flex') {
                    rankings.style.display = 'none';
                } else rankings.style.display = 'flex';
            }
        })
        .catch(error => console.error('Error:', error));

}