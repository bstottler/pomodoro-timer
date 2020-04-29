//global variables
var seconds;
var timeInterval;
var workTime = 25 * 60;
var workCount = workTime;
var breakTime = 5 * 60;
var breakCount = breakTime;
var workCycles = 0;
var working = false;
var breaking = false;
var isPaused = true;

//HTML elements
const play = document.getElementById('play');
const stop = document.getElementById('stop');
const moreWork = document.getElementById('moreWork');
const lessWork = document.getElementById('lessWork');
const moreBreak = document.getElementById('moreBreak');
const lessBreak = document.getElementById('lessBreak');
var ding = document.getElementById('ding');
var workTimer = document.getElementById('workTime');
var breakTimer = document.getElementById('breakTime');

//timer functions
function increment() {
    seconds--;
    if(working==true){workDisplay(seconds)}
    else if(breaking==true){breakDisplay(seconds)}
    if (!seconds) {
        clearInterval(timeInterval);
        ding.play();
        if (working == true && workCycles < 4) {checkmark()};
        working = !working;
        breaking = !breaking;
        workCount = workTime;
        isPaused = true;
        breakCount = breakTime;
        if (workCycles == 4) {
            removeChecks();
            breaking = true;
            working = false;
            breakCount = 15 * 60;
        }
        workDisplay(workCount);
        breakDisplay(breakCount);
    };
};

function pomodoro(mins) { 
    seconds = mins;
    timeInterval = setInterval(increment, 1000);
};

//time display functions
function workDisplay(seconds) {
    var minDisplay = Math.floor(seconds / 60);
    var secDisplay = seconds % 60;
    workCount = (minDisplay * 60) + secDisplay;
    const display = `${minDisplay < 10 ? '0' : ''}${minDisplay}:${secDisplay < 10 ? '0' : '' }${secDisplay}`;
    if(working==true){document.title = 'Work: ' + display + ' Pomodoro Work Timer';}
    workTimer.textContent = display;
};

function breakDisplay(seconds) {
    var minDisplay = Math.floor(seconds / 60) ;
    var secDisplay = seconds % 60;
    breakCount = (minDisplay * 60) + secDisplay;
    const display = `${minDisplay < 10 ? '0' : ''}${minDisplay}:${secDisplay < 10 ? '0' : '' }${secDisplay}`;
   if(breaking==true){document.title = 'Break: ' + display + ' Pomodoro Work Timer';}
    breakTimer.textContent = display;
};

//change break time and work time
moreWork.addEventListener('click', (e) => {
    if(working == false) {
    workTime += 60;
    workCount += 60;
    workDisplay(workTime)
    }
});
lessWork.addEventListener('click', (e) => {
    if(working == false) {
    if(workTime > 60) {
        workTime -= 60;
        workCount -= 60;
    }
    workDisplay(workTime)
    }
});
moreBreak.addEventListener('click', (e) => {
    if(breaking == false) {
    breakTime += 60;
    breakCount += 60;
    breakDisplay(breakTime);
    }
});
lessBreak.addEventListener('click', (e) => {
    if (breaking == false) {
    if(breakTime > 60) {
        breakTime -= 60;
        breakCount -= 60;
    }
    breakDisplay(breakTime);
    }
});

//play and stop buttons
play.addEventListener('click', (e) => {
    if(working == false && breaking == false) {
        working = true;
        pomodoro(workCount);
    }
    else if(isPaused == true) {
       if(working == true) {pomodoro(workCount);}
       else if(breaking == true) {pomodoro(breakCount);}
    }
    else if (isPaused == false) {
        clearInterval(timeInterval);
    }
    isPaused = !isPaused;
});
stop.addEventListener('click', (e) => {
    clearInterval(timeInterval);
    seconds = null;
    timeInterval = null;
    workTime = 25 * 60;
    breakTime = 5 * 60;
    workCycles = 0;
    working = false;
    breaking = false;
    isPaused = true;
    workDisplay(workTime);
    breakDisplay(breakTime);
    removeChecks();
    document.title = 'Pomodoro Work Timer';
});

//checkmark functions
function checkmark() {
    let container = document.querySelector('#checkmarks');
    let mark = document.createElement('div');
    mark.classList.add('marks');
    mark.innerHTML = "<img src='icons/icons8-checkmark-26.png' alt='checkmark'>";
    container.appendChild(mark);
    workCycles++;
}
function removeChecks() {
    let container = document.querySelector('#checkmarks');
    let marks = document.querySelectorAll('div.marks');
    for (i = marks.length; i > 0; i--) { 
        container.removeChild(container.childNodes[i-1]);
    }
    workCycles = 0;
}