const http = require('http');
const url = require('url');
var fs = require('fs');
var pathname;
const server = http.createServer((request, response) => {
    const parsedUrl = url.parse(request.url, true);
    pathname = parsedUrl.pathname;
    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
    response.setHeader('Access-Control-Allow-Headers', 'Content-Type');

    //TENTAR CORRIGIR ERROS
    if (request.method === 'OPTIONS') {
        response.writeHead(200);
        response.end();
        return;
    }
    switch (request.method) {
        case 'GET':
            handleGetRequest(request, response);
            break;
        case 'POST':
            handlePostRequest(request, response);
            break;
        default:
            response.writeHead(405, { 'Content-Type': 'text/plain' });
            response.write('Method Not Allowed');
            response.end();
    }
});
function handleGetRequest(request, response) {
    switch (pathname) {
        case '/update':
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Page not found');
            response.end();
    }
}

function handlePostRequest(request, response) {
    switch (pathname) {
        case '/register':
            handleRegistration(request, response);
            break;
        case '/join':
            joinGroup(query, response);
            break;
        case '/leave':
            leaveGroup(query, response);
            break;
        case '/notify':
            notifyServer(query, response);
            break;
        case '/ranking':
            rankingServer(query, response);
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Page not found');
            response.end();
    }
}

function joinGroup(query, response) {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        joinData = JSON.parse(data);
        if (registered === false) {
            response.writeHead(401, { 'Content-Type': 'application/json' });
            showPopup('Please register first!', 1000);
            response.end(JSON.stringify(joinData));
        }
        else if(roomIsFull(joinData.group)){
            response.writeHead(400, { 'Content-Type': 'application/json' });
            showPopup('Room is full!', 1000);
            response.end(JSON.stringify(joinData));
        }
        else if (roomExists(joinData.group)) {
            roomDetails = getRoomDetails(joinData.group);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            showPopup('Welcome to the game! You are versus ' + roomDetails.creator + '!');
            response.end(JSON.stringify(joinData));
        }
        else {
            response.writeHead(200, { 'Content-Type': 'application/json' });
            showPopup(`Group ${joinData.group} created!`);
            response.end(JSON.stringify(joinData));
            createRoom(joinData.group, joinData.nick, joinData.password, joinData.size);
        }
    });
}
function roomIsFull(group){

}

function roomExists(group) {
    const data = fs.readFileSync('java_script/server/zGroupsData.json', 'utf8');

}

function getRoomDetails(group) {
    
}

function createRoom(group, nick, password, size) {
    const group = {
        group,
        nick,
        password,
        size
    };
    fs.writeFileSync('java_script/server/zUsersData.json', JSON.stringify(group), 'utf8');

}
function leaveGroup(query, response) {
    // Implement logic for leaving a game/group (POST)
}

function notifyServer(query, response) {
    // Implement logic for handling game notifications (POST)
}

function rankingServer(query, response) {
    let data = '';
        request.on('data', (chunk) => {
            data += chunk;
        });
    
        request.on('end', () => {
            rankingData = JSON.parse(data);
            const users = readUsersFromFile();
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(rankingData));
        });
}

server.listen(8119, () => {
    console.log('Server is running on port 8119');
});
