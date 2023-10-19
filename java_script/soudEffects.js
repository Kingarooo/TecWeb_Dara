var clickSound = document.getElementById('clickSound');

function playClickSound() {
    clickSound.play();
    clickSound.currentTime = 0;
    setTimeout(function () {
        clickSound.pause();
    }, 1000);
}