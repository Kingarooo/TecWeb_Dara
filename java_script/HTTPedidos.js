//------------------------------------------------------------------------------------------
//---------CRIAR CONTA--------------------------------------------------------------
//-----------------------------------------------------------------------------------------------

function registerPlayerReq(jsonData) {
    console.log(jsonData);
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
                alert(`Error: ${data.error}`);
            } else {
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
                game = data.game; // Extracting the value property
                alert('Joined group successfuly, but not with professors link.');
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
                alert('Showing rankings, but not with professors link.');
            }
        })
        .catch(error => console.error('Error:', error));

}