const progressBar = document.querySelector('.circular_progressbar');

const saveBTN = document.querySelector('.saveBtn');

const pomodoroTimeValue = document.querySelector('#pTime');
const sBreakTimeValue = document.querySelector('#sBreak');
const lBreakTimeValue = document.querySelector('#lBreak');

let pTime = 25;
let sBreak = 5;
let lBreak = 10;

let cycleCounter = 1;

const alarmList = document.querySelector('#alarmList');

let alarmSound = alarmList.value;
let audio = new Audio(`${alarmSound}`);

if(localStorage.getItem('pTime')){
    pTime=localStorage.getItem('pTime');
    pomodoroTimeValue.value=pTime;
} 
if(localStorage.getItem('sBreak')){
    sBreak=localStorage.getItem('sBreak');
    sBreakTimeValue.value=sBreak;
}
if(localStorage.getItem('lBreak')){
    lBreak=localStorage.getItem('lBreak');
    lBreakTimeValue.value=lBreak;
}
if(localStorage.getItem('alarmSound')){
    alarmSound=localStorage.getItem('alarmSound');
    alarmList.value = alarmSound;
    audio = new Audio(`${alarmSound}`);
}

function saveTimes(){
    pTime = pomodoroTimeValue.value;
    sBreak = sBreakTimeValue.value;
    lBreak = lBreakTimeValue.value;
    alarmSound=alarmList.value;
    audio = new Audio(`${alarmSound}`);
    localStorage.setItem('pTime', pTime);
    localStorage.setItem('sBreak', sBreak);
    localStorage.setItem('lBreak', lBreak);
    localStorage.setItem('alarmSound', alarmSound);
    if(activePomodoro.className.includes('active')){
        minutes=pTime;
        if(pTime<10) timeDisplay.textContent = `0${pTime} : 00`;
        else timeDisplay.textContent = `${pTime} : 00`;
    }
    if(activeShortBreak.className.includes('active')){
        minutes=sBreak;
        if(sBreak<10) timeDisplay.textContent = `0${sBreak} : 00`;
        else timeDisplay.textContent = `${sBreak} : 00`;
    }
    if(activeLongBreak.className.includes('active')){
        minutes=lBreak;
        if(lBreak<10) timeDisplay.textContent = `0${lBreak} : 00`;
        else timeDisplay.textContent = `${lBreak} : 00`;
    }
}

saveBTN.addEventListener('click', function(){
    saveTimes();
})


const activePomodoro = document.querySelector('#pomodoro');
const activeShortBreak= document.querySelector('#shortBreak');
const activeLongBreak = document.querySelector('#longBreak');
const timeDisplay = document.querySelector('#timeLeft');

//pomodoro timer

let seconds=0;
let minutes = pTime;
let IntervalDeg = 360/(minutes*60);
if(pTime<10) timeDisplay.textContent = `0${pTime} : 00`;
else timeDisplay.textContent = `${pTime} : 00`;

activePomodoro.addEventListener('click', function(){
    clearInterval(timeout);
    startBtn.classList = 'fa-solid fa-play';
    seconds=0;
    click++;
    progressBar.style.background = `conic-gradient(var(--accentColor) 0deg, var(--background) 0deg)`;
    activePomodoro.classList='active';
    activeShortBreak.classList='';
    activeLongBreak.classList='';
    minutes=pTime;
    if(pTime<10) timeDisplay.textContent = `0${pTime} : 00`;
    else timeDisplay.textContent = `${pTime} : 00`;
    IntervalDeg = 360/(minutes*60);
    deg=IntervalDeg;
    
})
activeShortBreak.addEventListener('click', function(){
    clearInterval(timeout);
    startBtn.classList = 'fa-solid fa-play';
    seconds=0;
    click++;
    progressBar.style.background = `conic-gradient(var(--accentColor) 0deg, var(--background) 0deg)`;
    activePomodoro.classList='';
    activeShortBreak.classList='active';
    activeLongBreak.classList='';
    minutes=sBreak;
    if(sBreak<10) timeDisplay.textContent = `0${sBreak} : 00`;
    else timeDisplay.textContent = `${sBreak} : 00`;
    IntervalDeg = 360/(minutes*60);
    deg=IntervalDeg;
})
activeLongBreak.addEventListener('click', function(){
    clearInterval(timeout);
    startBtn.classList = 'fa-solid fa-play';
    seconds=0;
    click++;
    progressBar.style.background = `conic-gradient(var(--accentColor) 0deg, var(--background) 0deg)`;
    activePomodoro.classList='';
    activeShortBreak.classList='';
    activeLongBreak.classList='active';
    minutes=lBreak;
    if(lBreak<10) timeDisplay.textContent = `0${lBreak} : 00`;
    else timeDisplay.textContent = `${lBreak} : 00`;
    IntervalDeg = 360/(minutes*60);
    deg=IntervalDeg;
})

let deg = IntervalDeg;

let timeout;
const startBtn = document.querySelector('#start');

let displayMin = 0;
let displaySec = 0;


const alarmMsg = document.querySelector('#alarmMsg');

const alarmDiv = document.querySelector('#alarm');
const alramBtn = document.querySelector('.alarmBtn');
function alarm_stop(){
    cycleCounter++;
    audio.pause();
    alarmDiv.close();
}
alramBtn.addEventListener('click', function(){
    alarm_stop();
})
// let audio2 = new Audio('../audio/Summer Forest.mp3');
function play_alarm(){
    if(cycleCounter%4==0) alarmMsg.textContent = 'Time for long break!';
    else if(cycleCounter%2==0) alarmMsg.textContent = 'Time for work!';
    else alarmMsg.textContent = 'Time for break!';
    alarmDiv.showModal();
    progressBar.style.background = `conic-gradient(var(--accentColor) 0deg, var(--background) 0deg)`;
    deg=0;
    audio.play();
    if(activePomodoro.className.includes('active')){
        minutes=pTime;
        if(pTime<10) timeDisplay.textContent = `0${pTime} : 00`;
        else timeDisplay.textContent = `${pTime} : 00`;
    }
    if(activeShortBreak.className.includes('active')){
        minutes=sBreak;
        if(sBreak<10) timeDisplay.textContent = `0${sBreak} : 00`;
        else timeDisplay.textContent = `${sBreak} : 00`;
    }
    if(activeLongBreak.className.includes('active')){
        minutes=lBreak;
        if(lBreak<10) timeDisplay.textContent = `0${lBreak} : 00`;
        else timeDisplay.textContent = `${lBreak} : 00`;
    }
    startBtn.classList = 'fa-solid fa-play';
}

function pomodoro(){
    if(deg>=360){
        clearInterval(timeout)
        play_alarm();
    } 
    else{
        if(minutes<0){
            clearInterval(timeout);
        }else{
            if(seconds==0){
                minutes--;
                seconds=59;
            }
            if(seconds<10) displaySec="0"+seconds;
            else displaySec=seconds;
            if(minutes<10) displayMin="0"+minutes;
            else displayMin=minutes;
            seconds--;
            timeDisplay.textContent = `${displayMin} : ${displaySec}`;
            progressBar.style.background = `conic-gradient(var(--accentColor) ${deg}deg, var(--background) 0deg)`;
            deg+=IntervalDeg;
            timeout = setTimeout("pomodoro()", 1000);
        }
    }
}


let click = 0;
startBtn.addEventListener('click', function(){
    if(click%2==0){
        pomodoro();
        startBtn.classList = 'fa-solid fa-pause';
    }
    else{
        startBtn.classList = 'fa-solid fa-play';
        clearTimeout(timeout);

    }
    click++
})