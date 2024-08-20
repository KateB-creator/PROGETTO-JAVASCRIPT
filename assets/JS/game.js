document.addEventListener('DOMContentLoaded', () => {
    // --- Interazioni con le card ---
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('flipped');
        });
    });

    // --- Aggiornamento dell'anno corrente ---
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // --- Gestione del menu ad hamburger e pulsante di condivisione ---
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const shareButton = document.querySelector('.share-button');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    shareButton.addEventListener('click', () => {
        alert('Condividi la tua pagina!');
    });

    // --- Game 1 ---
    const startButtonGame1 = document.getElementById("start-game1");
    const counterValue = document.getElementById('counter-value');
    const timeRemaining = document.getElementById('time-remaining');
    const gameMessage = document.getElementById('game-message');
    const gameArea = document.getElementById('game-area');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const restartButton = document.getElementById('restart-button');

    let counter = 0; 
    let timeLeft = 30;
    let timer;
    let spawnTimer;

    function updateCounter() {
        counterValue.textContent = counter;
    }

    function updateTime() {
        timeRemaining.textContent = timeLeft;
    }

    function endGame(message) {
        clearInterval(timer);
        clearInterval(spawnTimer);
        gameMessage.textContent = message;
        document.querySelectorAll('.star').forEach(star => star.remove());
        restartButton.style.display = 'inline-block';
    }

    function spawnStar() {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star', 'star');
        star.style.left = Math.random() * (gameArea.clientWidth - 30) + 'px';
        star.style.top = Math.random() * (gameArea.clientHeight - 30) + 'px';
        star.addEventListener('click', () => {
            counter++;
            updateCounter();
            star.remove();
        });
        gameArea.appendChild(star);

        setTimeout(() => {
            if (star.parentElement) {
                star.remove();
            }
        }, 3000);
    }

    function startGame1() {
        counter = 0;
        timeLeft = 30;
        gameMessage.textContent = '';
        restartButton.style.display = 'none';
        updateCounter();
        updateTime();

        clearInterval(timer);
        clearInterval(spawnTimer);

        timer = setInterval(() => {
            timeLeft--;
            updateTime();
            if (timeLeft <= 0) {
                endGame('Time is up! You scored ' + counter + ' points.');
            }
        }, 1000);

        spawnTimer = setInterval(spawnStar, 1000);
    }

    startButtonGame1.addEventListener('click', startGame1);
    incrementButton.addEventListener('click', () => {
        counter++;
        updateCounter();
    });
    decrementButton.addEventListener('click', () => {
        counter--;
        updateCounter();
    });
    restartButton.addEventListener('click', startGame1);

    // --- Game 2 ---
    const startButtonGame2 = document.getElementById("start-game2");
    const game2Area = document.getElementById("game2-area");
    const game2Message = document.getElementById("game2-message");
    const timerElement = document.getElementById("game2-timer");

    if (!startButtonGame2 || !game2Area || !game2Message || !timerElement) {
        console.error('Uno o più elementi necessari non sono presenti nel DOM.');
        return;
    }

    let timerGame2;
    let spawnInterval;
    let timeRemainingGame2 = 30;
    const numAliens = 10;
    const spawnRate = 500;

    const createAlien = () => {
        const alien = document.createElement("div");
        alien.className = "alien";
        alien.style.left = `${Math.random() * (game2Area.offsetWidth - 80)}px`;
        alien.style.top = `${Math.random() * (game2Area.offsetHeight - 80)}px`;
        alien.addEventListener("click", () => {
            alien.remove();
            if (document.querySelectorAll(".alien").length === 0) {
                game2Message.textContent = "Hai catturato tutti gli alieni!";
                clearInterval(timerGame2);
                clearInterval(spawnInterval);
            }
        });
        game2Area.appendChild(alien);
    };

    const startGame2 = () => {
        game2Area.innerHTML = '';
        game2Message.textContent = '';
        timeRemainingGame2 = 30;
        timerElement.textContent = `Tempo rimanente: ${timeRemainingGame2} secondi`;

        for (let i = 0; i < numAliens; i++) {
            createAlien();
        }

        spawnInterval = setInterval(createAlien, spawnRate);

        timerGame2 = setInterval(() => {
            timeRemainingGame2--;
            timerElement.textContent = `Tempo rimanente: ${timeRemainingGame2} secondi`;
            if (timeRemainingGame2 <= 0) {
                clearInterval(timerGame2);
                clearInterval(spawnInterval);
                game2Message.textContent = "Tempo scaduto! Hai perso.";
            }
        }, 1000);
    };

    startButtonGame2.addEventListener("click", startGame2);

    // --- Game 3 ---
    const gameArea3 = document.getElementById('game3-area');
const startButtonGame3 = document.getElementById('start-game3');
const timerDisplay3 = document.getElementById('game3-timer');
const messageDisplay3 = document.getElementById('game3-message');

const player = document.createElement('div');
player.classList.add('player');
gameArea3.appendChild(player);

let aliens3 = [];
let bullets3 = [];
let alienSpeed3 = 2;
let gameInterval3, bulletInterval3, timerInterval3, alienSpawnInterval3;
let timeLeft3 = 60;
let gameActive3 = false;
let touchStartX = 0;

function createAlien3() {
    const alien = document.createElement('div');
    alien.classList.add('alien');
    alien.style.top = '0px';
    alien.style.left = `${Math.random() * (gameArea3.clientWidth - 50)}px`; // Posizionamento casuale
    gameArea3.appendChild(alien);
    aliens3.push(alien);
}

function createAliens3() {
    for (let i = 0; i < 6; i++) {
        createAlien3();
    }
}

function moveAliens3() {
    aliens3.forEach(alien => {
        let currentTop = parseInt(alien.style.top);
        alien.style.top = `${currentTop + alienSpeed3}px`;

        if (currentTop + alienSpeed3 > (gameArea3.clientHeight - player.clientHeight * 2)) {
            endGame3('Hai perso! Gli alieni sono atterrati.');
        }
    });
}

function movePlayer3(e) {
    let currentLeft = parseInt(player.style.left);

    if (e.key === 'ArrowLeft' && currentLeft > 0) {
        player.style.left = `${currentLeft - player.clientWidth}px`;
    } else if (e.key === 'ArrowRight' && currentLeft < (gameArea3.clientWidth - player.clientWidth)) {
        player.style.left = `${currentLeft + player.clientWidth}px`;
    }
}

function shootBullet3() {
    const bullet = document.createElement('div');
    bullet.classList.add('bullet');
    bullet.style.left = `${parseInt(player.style.left) + (player.clientWidth / 2) - (bullet.clientWidth / 2)}px`;
    bullet.style.top = `${player.offsetTop - bullet.clientHeight}px`;
    gameArea3.appendChild(bullet);
    bullets3.push(bullet);
}

function moveBullets3() {
    bullets3.forEach((bullet, index) => {
        let currentTop = parseInt(bullet.style.top);
        bullet.style.top = `${currentTop - 5}px`;

        if (currentTop < 0) {
            bullet.remove();
            bullets3.splice(index, 1);
        }

        aliens3.forEach((alien, alienIndex) => {
            if (checkCollision3(bullet, alien)) {
                alien.remove();
                bullet.remove();
                aliens3.splice(alienIndex, 1);
                bullets3.splice(index, 1);

                if (aliens3.length === 0 && timeLeft3 > 0) {
                    createAliens3();
                }
            }
        });
    });
}

function checkCollision3(bullet, alien) {
    const bulletRect = bullet.getBoundingClientRect();
    const alienRect = alien.getBoundingClientRect();

    return (
        bulletRect.left < alienRect.right &&
        bulletRect.right > alienRect.left &&
        bulletRect.top < alienRect.bottom &&
        bulletRect.bottom > alienRect.top
    );
}

function startGame3() {
    if (gameActive3) return;
    gameActive3 = true;
    messageDisplay3.textContent = '';
    timeLeft3 = 60;
    aliens3 = [];
    bullets3 = [];
    alienSpeed3 = 2;
    player.style.left = '45%';
    gameArea3.querySelectorAll('.alien, .bullet').forEach(e => e.remove());

    createAliens3();

    gameInterval3 = setInterval(moveAliens3, 100);
    bulletInterval3 = setInterval(moveBullets3, 50);
    timerInterval3 = setInterval(updateTimer3, 1000);
    alienSpawnInterval3 = setInterval(createAlien3, 2000); // Genera un alieno ogni 2 secondi
}

function updateTimer3() {
    timeLeft3--;
    timerDisplay3.textContent = `Tempo rimanente: ${timeLeft3} secondi`;

    if (timeLeft3 <= 0) {
        endGame3('Tempo scaduto! Hai perso.');
    }
}

function endGame3(message) {
    clearInterval(gameInterval3);
    clearInterval(bulletInterval3);
    clearInterval(timerInterval3);
    clearInterval(alienSpawnInterval3); 
    gameActive3 = false;
    messageDisplay3.textContent = message;
}

function handleTouchStart3(e) {
    touchStartX = e.touches[0].clientX;
}

function handleTouchMove3(e) {
    const touchX = e.touches[0].clientX;
    const deltaX = touchX - touchStartX;
    touchStartX = touchX;

    let currentLeft = parseInt(player.style.left);
    currentLeft += deltaX;

    if (currentLeft < 0) {
        currentLeft = 0;
    } else if (currentLeft > (gameArea3.clientWidth - player.clientWidth)) {
        currentLeft = gameArea3.clientWidth - player.clientWidth;
    }

    player.style.left = `${currentLeft}px`;
}

function handleTouchEnd3(e) {
    shootBullet3();
}

startButtonGame3.addEventListener('click', startGame3);
document.addEventListener('keydown', movePlayer3);
document.addEventListener('keydown', (e) => {
    if (e.key === ' ') {
        shootBullet3();
    }
});

gameArea3.addEventListener('touchstart', handleTouchStart3);
gameArea3.addEventListener('touchmove', handleTouchMove3);
gameArea3.addEventListener('touchend', handleTouchEnd3);

});
