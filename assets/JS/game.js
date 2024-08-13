document.addEventListener('DOMContentLoaded', () => {
    // Eventi per il flip delle card
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('click', () => {
            card.querySelector('.card-inner').classList.toggle('flipped');
        });
    });

    // Gestione del menu ad hamburger
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');

    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // Opzionale: Gestione della chiusura del menu se si clicca all'esterno
    document.addEventListener('click', (event) => {
        if (!menuToggle.contains(event.target) && !navMenu.contains(event.target)) {
            navMenu.classList.remove('active');
        }
    });

    // Gestione del pulsante di condivisione
    shareButton.addEventListener('click', () => {
        alert('Condividi la tua pagina!');
    });

    // Aggiornamento dell'anno corrente nel footer
    const currentYear = new Date().getFullYear();
    document.getElementById('current-year').textContent = currentYear;

    // Funzioni per il gioco 1
    const startButton1 = document.getElementById("start-game1");
    const counterValue = document.getElementById('counter-value');
    const timeRemaining1 = document.getElementById('time-remaining');
    const gameMessage1 = document.getElementById('game-message');
    const gameArea1 = document.getElementById('game-area');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');
    const restartButton1 = document.getElementById('restart-button');

    let counter = 0; 
    let timeLeft1 = 30;

    function updateCounter() {
        counterValue.textContent = counter;
    }

    function updateTime() {
        timeRemaining1.textContent = timeLeft1;
    }

    function endGame(message) {
        clearInterval(timer1);
        clearInterval(spawnTimer1);
        gameMessage1.textContent = message;
        document.querySelectorAll('.star').forEach(star => star.remove());
        restartButton1.style.display = 'inline-block';
    }

    function spawnStar() {
        const star = document.createElement('i');
        star.classList.add('fas', 'fa-star', 'star');
        star.style.left = Math.random() * (gameArea1.clientWidth - 30) + 'px';
        star.style.top = Math.random() * (gameArea1.clientHeight - 30) + 'px';
        star.addEventListener('click', function() {
            counter++;
            updateCounter();
            star.remove();
        });
        gameArea1.appendChild(star);

        setTimeout(() => {
            if (star.parentElement) {
                star.remove();
            }
        }, 3000);
    }

    let timer1;
    let spawnTimer1;

    function startGame1() {
        counter = 0;
        timeLeft1 = 30;
        gameMessage1.textContent = '';
        restartButton1.style.display = 'none';
        updateCounter();
        updateTime();

        clearInterval(timer1);
        clearInterval(spawnTimer1);

        timer1 = setInterval(() => {
            timeLeft1--;
            updateTime();
            if (timeLeft1 <= 0) {
                endGame('Time is up! You scored ' + counter + ' points.');
            }
        }, 1000);

        spawnTimer1 = setInterval(spawnStar, 1000);
    }

    startButton1.addEventListener('click', startGame1);
    incrementButton.addEventListener('click', () => {
        counter++;
        updateCounter();
    });

    decrementButton.addEventListener('click', () => {
        counter--;
        updateCounter();
    });

    restartButton1.addEventListener('click', startGame1);

    updateCounter();
    updateTime();

    // Funzioni per il gioco 2
    const startButton2 = document.getElementById("start-game2");
    const game2Area = document.getElementById("game2-area");
    const game2Message = document.getElementById("game2-message");
    const timerElement2 = document.getElementById("game2-timer");

    if (!startButton2 || !game2Area || !game2Message || !timerElement2) {
        console.error('Uno o più elementi necessari non sono presenti nel DOM.');
        return;
    }

    let timer2;
    let spawnInterval2;
    let timeRemaining2 = 30;
    const numAliens = 10;
    const spawnRate = 500;

    const createAlien2 = () => {
        const alien = document.createElement("div");
        alien.className = "alien";
        alien.style.left = `${Math.random() * (game2Area.offsetWidth - 80)}px`;
        alien.style.top = `${Math.random() * (game2Area.offsetHeight - 80)}px`;
        alien.addEventListener("click", () => {
            alien.remove();
            if (document.querySelectorAll(".alien").length === 0) {
                game2Message.textContent = "Hai catturato tutti gli alieni!";
                clearInterval(timer2);
                clearInterval(spawnInterval2);
            }
        });
        game2Area.appendChild(alien);
    };

    const startGame2 = () => {
        game2Area.innerHTML = '';
        game2Message.textContent = '';
        timeRemaining2 = 30;
        timerElement2.textContent = `Tempo rimanente: ${timeRemaining2} secondi`;

        for (let i = 0; i < numAliens; i++) {
            createAlien2();
        }

        spawnInterval2 = setInterval(createAlien2, spawnRate);

        timer2 = setInterval(() => {
            timeRemaining2--;
            timerElement2.textContent = `Tempo rimanente: ${timeRemaining2} secondi`;
            if (timeRemaining2 <= 0) {
                clearInterval(timer2);
                clearInterval(spawnInterval2);
                game2Message.textContent = "Tempo scaduto! Hai perso.";
            }
        }, 1000);
    };

    startButton2.addEventListener("click", startGame2);

    // Funzioni per il gioco 3
    const gameArea3 = document.getElementById('game3-area');
    const startButton3 = document.getElementById('start-game3');
    const timerDisplay3 = document.getElementById('game3-timer');
    const messageDisplay3 = document.getElementById('game3-message');

    const player = document.createElement('div');
    player.classList.add('player');
    gameArea3.appendChild(player);

    let aliens3 = [];
    let bullets = [];
    let alienSpeed = 2;
    let gameInterval3, bulletInterval3, timerInterval3;
    let timeLeft3 = 60;
    let gameActive = false;
    let touchStartX = 0;

    function createAliens3() {
        for (let i = 0; i < 6; i++) {
            const alien = document.createElement('div');
            alien.classList.add('alien');
            alien.style.top = '0px';
            alien.style.left = `${i * (gameArea3.clientWidth / 6)}px`;
            gameArea3.appendChild(alien);
            aliens3.push(alien);
        }
    }

    function moveAliens3() {
        aliens3.forEach(alien => {
            let currentTop = parseInt(alien.style.top);
            alien.style.top = `${currentTop + alienSpeed}px`;

            if (currentTop + alienSpeed > (gameArea3.clientHeight - player.clientHeight * 2)) {
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

    function shootBullet() {
        const bullet = document.createElement('div');
        bullet.classList.add('bullet');
        bullet.style.left = `${parseInt(player.style.left) + (player.clientWidth / 2) - (bullet.clientWidth / 2)}px`;
        bullet.style.top = `${player.offsetTop - bullet.clientHeight}px`;
        gameArea3.appendChild(bullet);
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

            aliens3.forEach((alien, alienIndex) => {
                if (checkCollision(bullet, alien)) {
                    alien.remove();
                    bullet.remove();
                    aliens3.splice(alienIndex, 1);
                    bullets.splice(index, 1);

                    if (aliens3.length === 0) {
                        endGame3('Hai vinto! Tutti gli alieni sono stati distrutti.');
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

    function startGame3() {
        if (gameActive) return;
        gameActive = true;
        messageDisplay3.textContent = '';
        timeLeft3 = 60;
        aliens3 = [];
        bullets = [];
        alienSpeed = 2;
        player.style.left = '45%';
        gameArea3.querySelectorAll('.alien, .bullet').forEach(e => e.remove());

        createAliens3();

        gameInterval3 = setInterval(moveAliens3, 100);
        bulletInterval3 = setInterval(moveBullets, 50);
        timerInterval3 = setInterval(updateTimer3, 1000);
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
        gameActive = false;
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
        shootBullet();
    }

    startButton3.addEventListener('click', startGame3);
    document.addEventListener('keydown', movePlayer3);
    document.addEventListener('keydown', (e) => {
        if (e.key === ' ') {
            shootBullet();
        }
    });

    gameArea3.addEventListener('touchstart', handleTouchStart3);
    gameArea3.addEventListener('touchmove', handleTouchMove3);
    gameArea3.addEventListener('touchend', handleTouchEnd3);
});
