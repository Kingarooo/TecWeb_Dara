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


const rankings_button = document.querySelector('.rankings_button');
const rankings = document.querySelector('.rankings');
rankings_button.addEventListener('click', () => {
    const groupCodeInput = document.getElementById('groupCode');
    const group = groupCodeInput.value;
    const selectsize = document.querySelector('input[name="board-size"]:checked');
    const selectedValue = selectsize.value;
    const [rowValue, colValue] = selectedValue.split("x");
    const rows = parseInt(rowValue, 10);
    const columns = parseInt(colValue, 10);
    const size = {
        rows,
        columns
    }
    const jsonData = {
        group,
        size
    };
    rankingReq(jsonData);
});

function createUserRankingsList(groupId) {
    const userList = document.getElementById('user-rankings');
    // Limpar a lista
    userList.innerHTML = '';
    const users = readUsersFromFile();
    const groupUsers = users.filter((user) => user.group === groupId);
    // ORDENAR POR PONTOS
    groupUsersusers.sort((a, b) => b.victories - a.victories);

    // Popular a lista de victories, só 10 groupUsersusers
    groupUsersusers.slice(0, 10).forEach((user, index) => {
        const listItem = document.createElement('li');
        const profilePic = document.createElement('img');
        profilePic.src = user.profilePicURL || './images_files/Caveman.png';
        profilePic.alt = `${user.nick}`
        listItem.className = 'user-rankings-item';
        listItem.textContent = `${user.nick} (${user.victories})`; // Use nick instead of name
        listItem.insertBefore(profilePic, listItem.firstChild);
        userList.appendChild(listItem);
    });
}

