let timer;
let elapsedTime = 0;
let isRunning = false;

// Elements
const display = document.getElementById('display');
const startPauseButton = document.getElementById('startPause');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapTimesList = document.getElementById('lapTimes');

// Update the display
function updateDisplay() {
    const hours = Math.floor(elapsedTime / 3600000);
    const minutes = Math.floor((elapsedTime % 3600000) / 60000);
    const seconds = Math.floor((elapsedTime % 60000) / 1000);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}

// Pad single digit numbers with a leading zero
function pad(number) {
    return number < 10 ? '0' + number : number;
}

// Start or pause the stopwatch
startPauseButton.addEventListener('click', function() {
    if (isRunning) {
        clearInterval(timer);
        startPauseButton.textContent = 'Start';
        isRunning = false;
    } else {
        timer = setInterval(function() {
            elapsedTime += 1000;
            updateDisplay();
        }, 1000);
        startPauseButton.textContent = 'Pause';
        isRunning = true;
    }
    resetButton.disabled = !isRunning && elapsedTime === 0;
    lapButton.disabled = !isRunning;
});

// Reset the stopwatch
resetButton.addEventListener('click', function() {
    clearInterval(timer);
    elapsedTime = 0;
    updateDisplay();
    startPauseButton.textContent = 'Start';
    resetButton.disabled = true;
    lapButton.disabled = true;
    lapTimesList.innerHTML = '';
    isRunning = false;
});

// Record a lap time
lapButton.addEventListener('click', function() {
    const lapTime = document.createElement('li');
    lapTime.textContent = display.textContent;
    lapTimesList.appendChild(lapTime);
});

// Initialize display
updateDisplay();