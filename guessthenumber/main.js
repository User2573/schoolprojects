const startButton = document.getElementById('home-start');
const homeContainer = document.getElementById('home');
const gameContainer = document.getElementById('game');
const gameMessage = document.getElementById('game-message');
const gameInfo = document.getElementById('game-info');
const gameInput = document.getElementById('game-input');

const messages = {
    start: 'Start guessing',
    low: 'Too low',
    high: 'Too high',
    success: 'Wow you did it'
};

const settings = {
    min: 0,
    max: 100,
    maxHealth: 10,
    updateDisplay() {
        gameInfo.innerText = `${settings.min} - ${settings.max}`;
    }
};

const game = {
    currentValue: -1,
    health: settings.maxHealth
};



startButton.addEventListener('click', async () => {
    homeContainer.style.top = '0%';
    homeContainer.style.position = 'fixed';
    gameContainer.style.opacity = '0';
    gameContainer.style.display = '';
    gameMessage.innerText = messages.start;
    settings.updateDisplay();

    const animationProperties = {
        fill: 'forwards',
        duration: 1000,
        easing: 'cubic-bezier(0,.5,.5,1)'
    };
    await homeContainer.animate(
        { top: ['0%', '100%'] },
    animationProperties).finished;
    await gameContainer.animate(
        { opacity: ['0','1'] },
    animationProperties).finished;

    homeContainer.style.display = 'none';
    gameInput.focus();
})



gameInput.addEventListener('keydown', e => {
    // allow only digit
    const codes = [0,1,2,3,4,5,6,7,8,9].map(x => 'Digit' + x);
    const digit = codes.findIndex(code => code === e.code);
    if (digit < 0 && e.key.length === 1) {
        e.preventDefault();
    }

    

    if (e.code != 'Enter') return;

    const guess = parseInt(gameInput.value);
    if (guess === game.currentValue) {
        gameMessage.textContent = messages.success;
    }
    else {
        gameMessage.textContent = guess < game.currentValue ?
            messages.low : messages.high
    }
});