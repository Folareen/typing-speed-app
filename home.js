// add speed func too

const START_BUTTON = document.querySelector('.start');
const START_OVERLAY = document.querySelector('.start-overlay');

const QUOTE = document.querySelector('.quote');
const TEXTAREA = document.querySelector('textarea');
const TIMER = document.querySelector('.timer');

START_BUTTON.addEventListener('click', startGame);

function startGame(){
    START_OVERLAY.style = "display:none";

    getQuote();

    startTimer();
}


async function getQuote(){
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();

    QUOTE.innerText = data.content;
}

function startTimer(){
    let timer = 0;
    setInterval(() => {
        timer += 1;
        TIMER.innerText = timer;
    }, 1000);
}