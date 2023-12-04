var users = [];

function addUser(userData) {
    var user = {
        nick: userData.nick,
        password: userData.password,
        victorys: userData.victorys !== undefined ? userData.victorys : 0,
    };
    users.push(user);
    createUserRankingsList();   
}

//ADD 10 BOTS SÓ PARA TESTAR

userData ={
    nick: 'Bot',
    password: '',
    victorys: -1,
};

for (let i = 0; i < 10; i++) {
    addUser(userData);
}

function createUserRankingsList() {
    const userList = document.getElementById('user-rankings');

    // Limpar a lista
    userList.innerHTML = '';

    // ORDENAR POR PONTOS
    users.sort((a, b) => b.victorys - a.victorys);

    // Popular a lista de victorys, só 10 users
    users.slice(0, 10).forEach((user, index) => {
        const listItem = document.createElement('li');
        const profilePic = document.createElement('img');
        profilePic.src = user.profilePicURL || './images_files/Caveman.png';
        profilePic.alt = `${user.nick}`
        listItem.className = 'user-rankings-item';
        listItem.textContent = `${user.nick} (${user.victorys})`; // Use nick instead of name
        listItem.insertBefore(profilePic, listItem.firstChild);
        userList.appendChild(listItem);
    });
}

const rankings_button = document.querySelector('.rankings_button');
const rankings = document.querySelector('.rankings');
rankings_button.addEventListener('click', () => {
    createUserRankingsList();
    if (rankings.style.display === 'flex') {
        rankings.style.display = 'none';
    } else rankings.style.display = 'flex';
});
