const START_BUTTON = document.querySelector('.start');
const START_OVERLAY = document.querySelector('.start-overlay');

const QUOTE = document.querySelector('.quote');
const TEXTAREA = document.querySelector('textarea');
const TIMER = document.querySelector('.timer');

START_BUTTON.addEventListener('click', startGame);

TEXTAREA.value = "";
let timer;
let timerInterval;

async function startGame(){
    START_OVERLAY.style = "display:none";

    await getQuote();

    startTimer();
    TEXTAREA.placeholder = "Start typing...";

    let wordsArr = QUOTE.innerText.split('');
    QUOTE.innerText = "";
    wordsArr.forEach( letter => {
        let letterSpan = document.createElement('span');
        letterSpan.innerText = letter;
        letterSpan.classList.add("letterspan")
        QUOTE.appendChild(letterSpan);
    });
    let spanArr = document.querySelectorAll('.letterspan');
    
    spanArr[0].classList.add('current');
    TEXTAREA.addEventListener('input', checkLetter);
    function checkLetter(){
        let textareaArr = TEXTAREA.value.split('');
        let index = textareaArr.lastIndexOf(TEXTAREA.value[TEXTAREA.value.length -1]);

        if (textareaArr.length < spanArr.length){
            
            spanArr[index + 1].classList.add('current');
            spanArr[0].classList.remove('current');

            if(textareaArr[index] == spanArr[index].textContent ){
                spanArr[index].classList.remove('incorrect');
                spanArr[index].classList.add('correct');
            }
            else{
                spanArr[index].classList.remove('correct');
                spanArr[index].classList.add('incorrect');
            }
        }
        else{
            displayScore();
        };
        spanArr[index].classList.remove('current');
    }

}


async function getQuote(){
    const res = await fetch('https://api.quotable.io/random');
    const data = await res.json();

    await inner()

    function inner(){
        return new Promise((resolve, reject) =>{
            setTimeout(() => {
                resolve(QUOTE.innerText = data.content);
            }, 3000);
        })
    }
}

function startTimer(){
    timer = -1;
    timerInterval = setInterval(() => {
        timer += 1;
        TIMER.innerText = timer;
    }, 1000);
}

function displayScore(){
    clearInterval(timerInterval)
    const scoreOverlay = document.createElement('div');
    scoreOverlay.classList.add("score-overlay");
    document.body.appendChild(scoreOverlay);
    
    const score = document.createElement('p');
    score.classList.add("score");

    let quoteArr = "";
    document.querySelectorAll('.letterspan').forEach( (letter) => {quoteArr += letter.textContent});

    let wordLength = 0;
    quoteArr.split(" ").forEach((word) => {wordLength += word.length});
    let numberOfWords = quoteArr.split(" ").length;
    const averageWordLength = wordLength / numberOfWords

    const numberOfCorrectWords = Math.floor(document.querySelectorAll('.correct').length / averageWordLength);
    const numberOfIncorrectWords = Math.floor(document.querySelectorAll('.incorrect').length / averageWordLength);

    const scoreValue = Math.floor((document.querySelectorAll('.correct').length / (timer/60) ) / averageWordLength) ;
    score.innerHTML= `<span> Number of correct words : ${numberOfCorrectWords} <span> <br>
        <span> Number of Incorrect words : ${numberOfIncorrectWords} <span> <br>
        Your typing speed is <br> ${scoreValue} WPM`;

    scoreOverlay.appendChild(score);
}