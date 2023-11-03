const users = [
    { name: 'User1', points: 50 },
    { name: 'User2', points: 30 },
    { name: 'User3', points: 70 },
    { name: 'User4', points: 40 },
    { name: 'User5', points: 60 },
    { name: 'User6', points: 20 },
    { name: 'User7', points: 80 },
    { name: 'User8', points: 10 },
    { name: 'User9', points: 90 },
    { name: 'User10', points: 0 },
];
function createUserRankingsList() {
    const userList = document.getElementById('user-rankings');

//ORDENAR POR PONTOS
    users.sort((a, b) => b.points - a.points);

    // Populate the ordered list with user names, points, and profile pics
    users.forEach((user, index) => {
        const listItem = document.createElement('li');
        const profilePic = document.createElement('img');
        profilePic.src = user.profilePicURL || './images_files/Caveman.png';
        profilePic.alt = `${user.name} Profile Pic`; // Set the alt text
        listItem.className = 'user-rankings-item';
        listItem.textContent = `${user.name} (${user.points})`;
        listItem.insertBefore(profilePic, listItem.firstChild); // Add profile pic before text
        userList.appendChild(listItem);
    });
}

createUserRankingsList();