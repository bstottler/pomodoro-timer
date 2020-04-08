//global variables
var seconds = 0;
var workMinutes = 25;
var breakMinutes = 5;
var timeInterval;
var ding = document.getElementById('ding');
var workTime = document.getElementById('workTime');
var breakTime = document.getElementById('breakTime');
var working = false;
var breaking = false;
workTime.textContent = workMinutes + ':00';
breakTime.textContent = breakMinutes + ':00';


//create incrementing function; puts timer value in title as well as 'working' or 'breaking';
//incrementing function clears interval count when time is up; plays noise
function increment() {
    seconds--;
    var minDisplay = Math.floor(seconds / 60) ;
    var secDisplay = seconds % 60;
    if (secDisplay < 10) {
    workTime.textContent = minDisplay + ':0' + secDisplay;
    }else{workTime.textContent = minDisplay + ':' + secDisplay;}
    if (!seconds) {
        clearInterval(timeInterval);
        ding.play();
    }
}
function pomodoro(mins) {
    seconds = mins*60 || 0;
    timeInterval = setInterval(increment, 1000)
}
if(working==true){
pomodoro(workMinutes);
}
if(breaking==true){
pomodoro(breakMinutes);
}

//add functionality to change break time and work time


//add functionality to start, pause, stop, and reset buttons