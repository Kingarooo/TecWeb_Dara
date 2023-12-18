// function addUser(userData) {
// var user = {
// nick: userData.nick,
// password: userData.password,
// victories: userData.victories !== undefined ? userData.victories : 0,
// games: userData.games !== undefined ? userData.games : 0,
// };
// users.push(user);
// createUserRankingsList();   
// }
// 
// ADD 3 BOTS SÓ PARA TESTAR
// 
// userData ={
// nick: 'Bot',
// password: '',
// victories: -1,
// games: 0,
// };
// 
// for (let i = 0; i < 3; i++) {
// addUser(userData);
// }


function createUserRankingsList(groupId, boardSize) {
    const userList = document.getElementById('user-rankings');
    // Limpar a lista
    userList.innerHTML = '';
    const users = readUsersFromFile();
    const groupUsers = users.filter((user) => user.group === groupId);
    
    // ORDENAR POR PONTOS no tamanho selecionado
    const sortedUsers = groupUsers.sort((a, b) => b.victories[boardSize] - a.victories[boardSize]);

    // Popular a lista de victories, só 10 sortedUsers
    sortedUsers.slice(0, 10).forEach((user, index) => {
        const listItem = document.createElement('li');
        const profilePic = document.createElement('img');
        profilePic.src = user.profilePicURL || './images_files/Caveman.png';
        profilePic.alt = `${user.nick}`;
        listItem.className = 'user-rankings-item';
        listItem.textContent = `${user.nick} (${user.victories[boardSize]})`;
        listItem.insertBefore(profilePic, listItem.firstChild);
        userList.appendChild(listItem);
    });
}

