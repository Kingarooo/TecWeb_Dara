var http = require('http');
const url = require('url');
const fs = require('fs');
var body;
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
            response.end();
    }
});
function handleGetRequest(request, response) {
    switch (pathname) {
        case '/update':
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.end();
    }
}

function handlePostRequest(request, response) {
    switch (pathname) {
        case '/register':
            handleRegistration(request, response);
            break;
        case '/join':
            joinGroup(request, response);
            break;
        case '/leave':
            leaveGroup(request, response);
            break;
        case '/notify':
            notifyServer(request, response);
            break;
        case '/ranking':
            handleRanking(request, response);
            break;
        default:
            response.writeHead(404, { 'Content-Type': 'text/plain' });
            response.write('404 Page not found');
            response.end();
    }
}
//------------------------------------------------
//REGISTER REGISTER REGISTER REGISTER REGISTER
//------------------------------------------------
function handleRegistration(request, response) {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', async () => {
        const users = await readUsersFromFile();
        jsonData = JSON.parse(data);
        const expectedFields = ['nick', 'password'];
        const name = jsonData.nick;
        console.log(name);
        if (Object.keys(jsonData).every(field => expectedFields.includes(field))) {
            if (nickUsed(users, name)) {
                if (accountExists(users, name, jsonData.password)) {
                    response.writeHead(200, { 'Content-Type': 'application/json' });
                    popupMessage = "Welcome back " + name + "!";
                    body = {
                        message: popupMessage
                    };
                    return response.end(JSON.stringify(body));
                }
                else {
                    response.writeHead(401, { 'Content-Type': 'application/json' });
                    popupMessage = 'User registered with different password';
                    body = {
                        error: popupMessage
                    };
                    return response.end(JSON.stringify(body));
                }
            }
            else {
                jsonData.games = 0;
                jsonData.victories = 0;
                jsonData.group = '';
                users.push(jsonData);
                writeUsersToFile(users);
                response.writeHead(200, { 'Content-Type': 'application/json' });
                response.end(JSON.stringify(body));
            }
        }
        else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Invalid data format' }));

        }
    });
}

function accountExists(users, nick, password) {
    return users.some((user) => user.nick === nick && user.password === password);
}

function nickUsed(users, nick) {
    return users.some((user) => user.nick === nick);
}

async function readUsersFromFile() {
    try {
        const data = fs.readFileSync('java_script/server/zUsersData.json', 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
}

function writeUsersToFile(users) {
    fs.writeFileSync('java_script/server/zUsersData.json', JSON.stringify(users), 'utf8');
}

//------------------------------------------------
//RANKING RANKING RANKING RANKING RANKING RANKING
//------------------------------------------------

function handleRanking(request, response) {
    let data = '';
    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        rankingData = JSON.parse(data);
        const expectedFields = ['group', 'size'];
        if (Object.keys(rankingData).every(field => expectedFields.includes(field))) {

            const users = readUsersFromFile();
            response.writeHead(200, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify(rankingData));
        }
        else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Invalid data format' }));
        }
    });
}

//------------------------------------------------
//JOIN JOIN JOIN JOIN JOIN JOIN JOIN JOIN JOIN JOIN
//------------------------------------------------
let groupsData = '';
let groups = [];


function joinGroup(request, response) {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        joinData = JSON.parse(data);
        const expectedFields = ['group', 'nick', 'password', 'size'];
        if (Object.keys(joinData).every(field => expectedFields.includes(field))) {
            groups = readGroupsFromFile();
            if (roomIsFull(joinData.group)) {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                popupMessage = 'Room is full!';
                response.end(JSON.stringify(joinData));
            }
            else if (roomExists(joinData.group)) {
                const roomDetails = getRoomDetails(joinData.group);
                response.writeHead(200, { 'Content-Type': 'application/json' });
                popupMessage = 'Welcome to the game! You are versus ' + roomDetails.creator + '!';
                response.end(JSON.stringify(joinData));
            }
            else {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                popupMessage = "Group created!";
                response.end(JSON.stringify(joinData));
                createRoom(joinData.group, joinData.nick, joinData.password, joinData.size);
            }
        }
        else {
            response.writeHead(400, { 'Content-Type': 'application/json' });
            response.end(JSON.stringify({ error: 'Invalid data format' }));
        };

    });
}

function roomIsFull(group) {
    for (let i = 0; i < groups.length; i++) {
        if (groups[i].group === group) {
            if (groups[i].players.length === 2) {
                return true;
            }
        }
    }
}

function roomExists(group) {
    groups.forEach(group => {
        if (group.group === group) {
            return true;
        }
    });
}

function getRoomDetails(group) {
    groups.forEach(group => {
        if (group.group === group) {
            return group.players;
        }
    });
}

function createRoom(group, nick, password, size) {
    const newGroup = {
        group,
        nick,
        password,
        size
    };
    fs.writeFileSync('java_script/server/zGroupsData.json', JSON.stringify(newGroup), 'utf8');
}

function readGroupsFromFile() {
    try {
        const data = fs.readFile('java_script/server/zGroupsData.json', 'utf8');
        return JSON.parse(data) || [];
    } catch (error) {
        return [];
    }
}

function leaveGroup(request, response) {
    // Implement logic for leaving a game/group (POST)
}

function notifyServer(request, response) {
    // Implement logic for handling game notifications (POST)
}

server.listen(8119, () => {
    console.log('Server is running on port 8119');
});
