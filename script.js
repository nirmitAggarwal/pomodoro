const timerDisplay = document.getElementById('timer-display');
const startButton = document.getElementById('start-button');
const resetButton = document.getElementById('reset-button');
const focusTimeInput = document.getElementById('focus-time-input');
const breakTimeInput = document.getElementById('break-time-input');
const audioElement = document.getElementById('audio-element');

let timer;
let focusTimeInSeconds = parseInt(focusTimeInput.value) * 60;
let breakTimeInSeconds = parseInt(breakTimeInput.value) * 60;
let isRunning = false;
let isFocusTime = true;

function updateTimerDisplay(timeInSeconds) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

function startTimer() {
  if (!isRunning) {
    isRunning = true;
    startButton.textContent = 'Pause';
    
    if (isFocusTime) {
      audioElement.play();
    }
    
    timer = setInterval(() => {
      if (isFocusTime) {
        if (focusTimeInSeconds > 0) {
          focusTimeInSeconds--;
          updateTimerDisplay(focusTimeInSeconds);
        } else {
          clearInterval(timer);
          isFocusTime = false;
          updateTimerDisplay(breakTimeInSeconds);
          
          if (!isRunning) {
            audioElement.pause();
            audioElement.currentTime = 0;
          }
          
          timer = setInterval(() => {
            if (breakTimeInSeconds > 0) {
              breakTimeInSeconds--;
              updateTimerDisplay(breakTimeInSeconds);
            } else {
              clearInterval(timer);
              isRunning = false;
              startButton.textContent = 'Start';
              isFocusTime = true;
              updateTimerDisplay(focusTimeInSeconds);
              
              if (!isRunning) {
                audioElement.pause();
                audioElement.currentTime = 0;
              }
            }
          }, 1000);
        }
      } else {
        if (breakTimeInSeconds > 0) {
          breakTimeInSeconds--;
          updateTimerDisplay(breakTimeInSeconds);
        } else {
          clearInterval(timer);
          isRunning = false;
          startButton.textContent = 'Start';
          isFocusTime = true;
          updateTimerDisplay(focusTimeInSeconds);
          
          if (!isRunning) {
            audioElement.pause();
            audioElement.currentTime = 0;
          }
        }
      }
    }, 1000);
  } else {
    clearInterval(timer);
    isRunning = false;
    startButton.textContent = 'Resume';
    audioElement.pause();
  }
}

function resetTimer() {
  clearInterval(timer);
  isRunning = false;
  startButton.textContent = 'Start';
  isFocusTime = true;
  focusTimeInSeconds = parseInt(focusTimeInput.value) * 60;
  breakTimeInSeconds = parseInt(breakTimeInput.value) * 60;
  updateTimerDisplay(focusTimeInSeconds);
  audioElement.pause();
  audioElement.currentTime = 0;
}

startButton.addEventListener('click', startTimer);
resetButton.addEventListener('click', resetTimer);

updateTimerDisplay(focusTimeInSeconds);
