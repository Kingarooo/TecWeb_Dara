
function playRulesSound() {
    const rulesSound = document.getElementById('rulesSound');
    rulesSound.play();
    rulesSound.currentTime = 0;
    setTimeout(function () {
        rulesSound.pause();
    }, 1000);
}

function playPieceSound() {
    const pieceSound = document.getElementById('pieceSound');
    pieceSound.play();
    pieceSound.currentTime = 0;
    setTimeout(function () {
        pieceSound.pause();
    }, 1000);
}