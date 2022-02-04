// Immediately invoked function expression

(function () {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const display = document.querySelector('.display');
    let deg = 0;
    let zoneSize = 45; // deg
    const clickAudio = new Audio();
    clickAudio.src = "./Mouse-Click.mp3";
    const blackgroundMusic = new Audio();
    blackgroundMusic.src = "./Xo-So.mp3";
    blackgroundMusic.volume = 0.2;
    blackgroundMusic.loop = true;

    const spinningAudio = new Audio();
    spinningAudio.src = "./Spinning-Sound.mp3";

    document.body.addEventListener("click", function () {
        blackgroundMusic.play();
    })


    const moneyZone = {
        1: "100k",
        2: "50k",
        3: "200k",
        4: "500k",
        5: "100k",
        6: "50k",
        7: "200k",
        8: "500k",
    }

    const handleWin = (actualDeg) => {
        const winningMoneyNum = Math.ceil(actualDeg / zoneSize)
        display.innerHTML = moneyZone[winningMoneyNum];
    }

    const conffettiStart = () => {
        setTimeout(function () {
            confetti.start()
        }, 200);
    };

    const conffettiStop = () => {
        setTimeout(function () {
            confetti.stop()
        }, 5000);
    };

    startButton.addEventListener('click', () => {
        clickAudio.play();
        spinningAudio.play();
        display.innerHTML = "-";
        startButton.style.pointerEvents = 'none';
        // reset display
        setTimeout(function () {
            deg = Math.floor(5000 + Math.random() * 5000);
            wheel.style.transition = 'all 10s ease-out';
            wheel.style.transform = `rotate(${deg}deg)`
            wheel.classList.add('blur');
        }, 800)

    })

    wheel.addEventListener('transitionend', () => {
        conffettiStart();
        conffettiStop();
        wheel.classList.remove('blur');
        startButton.style.pointerEvents = 'auto';
        wheel.style.transition = 'none';
        const actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        // calculate and display value
        handleWin(actualDeg);
    })
})();
