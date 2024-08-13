
document.addEventListener('DOMContentLoaded', () => {

    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('flipped');
        });
    });
    
    // Riferimenti agli elementi
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    const shareButton = document.querySelector('.share-button');

    // Gestione del clic per il menu ad hamburger
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Gestione del clic per il pulsante di condivisione
    shareButton.addEventListener('click', () => {
        // Aggiungi il codice per la condivisione qui
        alert('Condividi la tua pagina!');
    });
});

// Aggiorna l'anno corrente nel documento quando il documento è completamente carico
document.addEventListener('DOMContentLoaded', () => {
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;
});


// game1

document.addEventListener("DOMContentLoaded", () => {
    const startButton = document.getElementById("start-game1");
    const counterValue = document.getElementById('counter-value');
    const timeRemaining = document.getElementById('time-remaining');
    const gameMessage = document.getElementById('game-message');
    const gameArea = document.getElementById('game-area');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const restartButton = document.getElementById('restart-button');

    let counter = 0; 
    let timeLeft = 30;

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
        star.addEventListener('click', function() {
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

    let timer;
    let spawnTimer;

    function startGame() {
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

    startButton.addEventListener('click', startGame);

    incrementButton.addEventListener('click', () => {
        counter++;
        updateCounter();
    });

    decrementButton.addEventListener('click', () => {
        counter--;
        updateCounter();
    });

    restartButton.addEventListener('click', startGame);

    updateCounter();
    updateTime();
});

// game2

document.addEventListener("DOMContentLoaded", () => {


    const startButton = document.getElementById("start-game2");
    const game2Area = document.getElementById("game2-area");
    const game2Message = document.getElementById("game2-message");
    const timerElement = document.getElementById("game2-timer");
    
    if (!startButton || !game2Area || !game2Message || !timerElement) {
        console.error('Uno o più elementi necessari non sono presenti nel DOM.');
        return;
    }

    let timer;
    let spawnInterval;
    let timeRemaining = 30; // Tempo in secondi
    const numAliens = 10; // Numero iniziale di alieni
    const spawnRate = 500; // Intervallo di tempo per spawnare nuovi alieni (in millisecondi)

    const createAlien = () => {
        const alien = document.createElement("div");
        alien.className = "alien";
        alien.style.left = `${Math.random() * (game2Area.offsetWidth - 80)}px`;
        alien.style.top = `${Math.random() * (game2Area.offsetHeight - 80)}px`;
        alien.addEventListener("click", () => {
            alien.remove();
            if (document.querySelectorAll(".alien").length === 0) {
                game2Message.textContent = "Hai catturato tutti gli alieni!";
                clearInterval(timer);
                clearInterval(spawnInterval);
            }
        });
        game2Area.appendChild(alien);
    };

    const startGame = () => {
        game2Area.innerHTML = ''; // Pulisci l'area del gioco
        game2Message.textContent = '';
        timeRemaining = 30; // Reset del tempo rimanente
        timerElement.textContent = `Tempo rimanente: ${timeRemaining} secondi`;

        // Crea il numero iniziale di alieni
        for (let i = 0; i < numAliens; i++) {
            createAlien();
        }

        // Crea nuovi alieni durante il gioco
        spawnInterval = setInterval(createAlien, spawnRate);

        timer = setInterval(() => {
            timeRemaining--;
            timerElement.textContent = `Tempo rimanente: ${timeRemaining} secondi`;
            if (timeRemaining <= 0) {
                clearInterval(timer);
                clearInterval(spawnInterval);
                game2Message.textContent = "Tempo scaduto! Hai perso.";
            }
        }, 1000);
    };

    startButton.addEventListener("click", startGame);
});

// game3

document.addEventListener('DOMContentLoaded', () => {
    const gameArea = document.getElementById('game3-area');
    const startButton = document.getElementById('start-game3');
    const timerDisplay = document.getElementById('game3-timer');
    const messageDisplay = document.getElementById('game3-message');

    const player = document.createElement('div');
    player.classList.add('player');
    gameArea.appendChild(player);

    let aliens = [];
    let bullets = [];
    let alienSpeed = 2;
    let gameInterval, bulletInterval, timerInterval;
    let timeLeft = 60;
    let gameActive = false;
    let touchStartX = 0;

    function createAliens() {
        for (let i = 0; i < 6; i++) {
            const alien = document.createElement('div');
            alien.classList.add('alien');
            alien.style.top = '0px'; // Posizione iniziale
            alien.style.left = `${i * (gameArea.clientWidth / 6)}px`; // Posiziona gli alieni orizzontalmente
            gameArea.appendChild(alien);
            aliens.push(alien);
        }
    }

    function moveAliens() {
        aliens.forEach(alien => {
            let currentTop = parseInt(alien.style.top);
            alien.style.top = `${currentTop + alienSpeed}px`;

            if (currentTop + alienSpeed > (gameArea.clientHeight - player.clientHeight * 2)) {
                endGame('Hai perso! Gli alieni sono atterrati.');
            }
        });
    }

    function movePlayer(e) {
        let currentLeft = parseInt(player.style.left);

        if (e.key === 'ArrowLeft' && currentLeft > 0) {
            player.style.left = `${currentLeft - player.clientWidth}px`;
        } else if (e.key === 'ArrowRight' && currentLeft < (gameArea.clientWidth - player.clientWidth)) {
            player.style.left = `${currentLeft + player.clientWidth}px`;
        }
    }

    function shootBullet() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${parseInt(player.style.left) + (player.clientWidth / 2) - (bullet.clientWidth / 2)}px`;
        bullet.style.top = `${player.offsetTop - bullet.clientHeight}px`;
        gameArea.appendChild(bullet);
        bullets.push(bullet);
    }

    function moveBullets() {
        bullets.forEach((bullet, index) => {
            let currentTop = parseInt(bullet.style.top);
            bullet.style.top = `${currentTop - 5}px`;

            if (currentTop < 0) {
                bullet.remove();
                bullets.splice(index, 1);
            }

            aliens.forEach((alien, alienIndex) => {
                if (checkCollision(bullet, alien)) {
                    alien.remove();
                    bullet.remove();
                    aliens.splice(alienIndex, 1);
                    bullets.splice(index, 1);

                    if (aliens.length === 0) {
                        endGame('Hai vinto! Tutti gli alieni sono stati distrutti.');
                    }
                }
            });
        });
    }

    function checkCollision(bullet, alien) {
        const bulletRect = bullet.getBoundingClientRect();
        const alienRect = alien.getBoundingClientRect();

        return (
            bulletRect.left < alienRect.right &&
            bulletRect.right > alienRect.left &&
            bulletRect.top < alienRect.bottom &&
            bulletRect.bottom > alienRect.top
        );
    }

    function startGame() {
        if (gameActive) return;
        gameActive = true;
        messageDisplay.textContent = '';
        timeLeft = 60;
        aliens = [];
        bullets = [];
        alienSpeed = 2;
        player.style.left = '45%';
        gameArea.querySelectorAll('.alien, .bullet').forEach(e => e.remove());

        createAliens();

        gameInterval = setInterval(moveAliens, 100);
        bulletInterval = setInterval(moveBullets, 50);
        timerInterval = setInterval(updateTimer, 1000);
    }

    function updateTimer() {
        timeLeft--;
        timerDisplay.textContent = `Tempo rimanente: ${timeLeft} secondi`;

        if (timeLeft <= 0) {
            endGame('Tempo scaduto! Hai perso.');
        }
    }

    function endGame(message) {
        clearInterval(gameInterval);
        clearInterval(bulletInterval);
        clearInterval(timerInterval);
        gameActive = false;
        messageDisplay.textContent = message;
    }

    function handleTouchStart(e) {
        touchStartX = e.touches[0].clientX;
    }

    function handleTouchMove(e) {
        const touchX = e.touches[0].clientX;
        const deltaX = touchX - touchStartX;
        touchStartX = touchX;

        let currentLeft = parseInt(player.style.left);
        currentLeft += deltaX;

        if (currentLeft < 0) {
            currentLeft = 0;
        } else if (currentLeft > (gameArea.clientWidth - player.clientWidth)) {
            currentLeft = gameArea.clientWidth - player.clientWidth;
        }

        player.style.left = `${currentLeft}px`;
    }

    function handleTouchEnd(e) {
        shootBullet();
    }

    startButton.addEventListener('click', startGame);
    document.addEventListener('keydown', movePlayer);
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            shootBullet();
        }
    });

    gameArea.addEventListener('touchstart', handleTouchStart);
    gameArea.addEventListener('touchmove', handleTouchMove);
    gameArea.addEventListener('touchend', handleTouchEnd);
});