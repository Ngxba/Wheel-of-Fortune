// Immediately invoked function expression

(function () {
    const wheel = document.querySelector('.wheel');
    const startButton = document.querySelector('.button');
    const display = document.querySelector('.display');
    let deg = 0;
    let zoneSize = 30; // deg
    const clickAudio = new Audio();
    clickAudio.src = "./Mouse-Click.mp3";
    const blackgroundMusic = new Audio();
    blackgroundMusic.src = "./Xo-So.mp3";
    blackgroundMusic.volume = 0.4;
    blackgroundMusic.loop = true;

    const spinningAudio = new Audio();
    spinningAudio.src = "./Spinning-Sound.mp3";
    spinningAudio.volume = 0.7;

    // document.body.addEventListener("click", function () {
    //     blackgroundMusic.play();
    // })


    const moneyZone = {
        1: "100k",
        2: "50k",
        3: "100k",
        4: "50k",
        5: "500k",
        6: "50k",
        7: "100k",
        8: "50k",
        9: "200k",
        10: "50k",
        11: "100k",
        12: "50k",
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
        blackgroundMusic.play();
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
        setTimeout(function () {
            blackgroundMusic.pause();
            spinningAudio.pause();
            spinningAudio.currentTime = 0;
            startButton.style.pointerEvents = 'auto';
        }, 2000)
        wheel.classList.remove('blur');
        wheel.style.transition = 'none';
        const actualDeg = deg % 360;
        wheel.style.transform = `rotate(${actualDeg}deg)`;
        // calculate and display value
        handleWin(actualDeg);
    })
})();
