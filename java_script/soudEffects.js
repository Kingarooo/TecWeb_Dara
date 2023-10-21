var rulesSound = document.getElementById('#rulesSound');
var pieceSound = document.getElementById('#pieceSound');

function playRulesSound() {
    rulesSound.play();
    rulesSound.currentTime = 0;
    setTimeout(function () {
        rulesSound.pause();
    }, 1000);
}

function playPieceSound() {
    pieceSound.play();
    pieceSound.currentTime = 0;
    setTimeout(function () {
        pieceSound.pause();
    }, 1000);
}