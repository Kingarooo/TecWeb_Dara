
function handleRegistration(request, response) {
    let data = '';

    request.on('data', (chunk) => {
        data += chunk;
    });

    request.on('end', () => {
        //
        //NAO POR NADA QUE NAO SEJA JSON QUANDO ESCREVO NO RESPONSE
        //
        const users = readUsersFromFile();
        jsonData = JSON.parse(data);
        response.writeHead(200, { 'Content-Type': 'application/json' });
        response.end(JSON.stringify(jsonData));

        if (nickUsed(users, jsonData.nick)) {
            if (accountExists(users, jsonData.nick, jsonData.password)) {
                response.writeHead(200, { 'Content-Type': 'application/json' });
                showPopup('Welcome back ' + jsonData.nick + '!');
                response.end(JSON.stringify(jsonData));
            }
            else {
                response.writeHead(400, { 'Content-Type': 'application/json' });
                showPopup('Username already in use...');
                response.end(JSON.stringify(jsonData));
            }
        }
        else {
            users.push(jsonData);
            writeUsersToFile(users);
            response.writeHead(200, { 'Content-Type': 'application/json' });
            showPopup('You just registered as ' + jsonData.nick + '\nWelcome to the game!');
            response.end(JSON.stringify(jsonData));
        }
    });
}

function accountExists(users, nick, password) {
    return users.some((user) => user.nick === nick && user.password === password);
}

function nickUsed(users, nick) {
    return users.some((user) => user.nick === nick);
}

function readUsersFromFile() {
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
