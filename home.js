// add speed func too

const START_BUTTON = document.querySelector('.start');
const START_OVERLAY = document.querySelector('.start-overlay');

const QUOTE = document.querySelector('.quote');
const TEXTAREA = document.querySelector('textarea');
const TIMER = document.querySelector('.timer');

START_BUTTON.addEventListener('click', startGame);
// TEXTAREA.addEventListener('focus', startTimer) 

async function startGame(){
    START_OVERLAY.style = "display:none";

    await getQuote();

    startTimer();

}


async function getQuote(){
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();

    await inner()

    function inner(){
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve(QUOTE.innerText = data.content);
            }, 2000);
        })
    }
}

function startTimer(){
    let timer = 0;
    setInterval(() => {
        timer += 1;
        TIMER.innerText = timer;
    }, 1000);
}

