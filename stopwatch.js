let timerInterval;
let elapsedTime = 0;
let isRunning = false;

// DOM Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapsList = document.getElementById('laps-list');

// Format time in HH:MM:SS
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return ${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')};
}

// Update display
function updateDisplay() {
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start Timer
startBtn.addEventListener('click', () => {
    if (isRunning) return;

    isRunning = true;
    const startTime = Date.now() - elapsedTime;

    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        updateDisplay();
    }, 1000);
});

// Pause Timer
pauseBtn.addEventListener('click', () => {
    if (!isRunning) return;

    clearInterval(timerInterval);
    isRunning = false;
});

// Reset Timer
resetBtn.addEventListener('click', () => {
    clearInterval(timerInterval);
    isRunning = false;
    elapsedTime = 0;
    updateDisplay();
    lapsList.innerHTML = '';
});

// Record Lap
lapBtn.addEventListener('click', () => {
    if (!isRunning) return;

    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = Lap ${lapsList.children.length + 1}: ${lapTime};
    lapsList.appendChild(lapItem);
});