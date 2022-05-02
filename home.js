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
    TEXTAREA.value = "";
    QUOTE.innerHTML = "<span class='loading'>Loading quote in 2 secs..</span>"
    START_OVERLAY.style = "display:none";

    await getQuote();

    startTimer();
    TEXTAREA.placeholder = "Start typing...";

    let wordsArr = QUOTE.innerText.split('');
    QUOTE.innerText = "";
    wordsArr.forEach( letter => {
        const letterSpan = document.createElement('span');
        letterSpan.innerText = letter;
        letterSpan.classList.add("letterspan")
        QUOTE.appendChild(letterSpan);
    });
    
    document.querySelectorAll('.letterspan')[0].classList.add('current');
    TEXTAREA.addEventListener('input', checkLetter);
    function checkLetter(){
        const textareaArr = TEXTAREA.value.split('');
        const index = textareaArr.lastIndexOf(TEXTAREA.value[TEXTAREA.value.length -1]);

        if (textareaArr.length < document.querySelectorAll('.letterspan').length){

            document.querySelectorAll('.letterspan')[index + 1].classList.add('current');
            document.querySelectorAll('.letterspan')[0].classList.remove('current');

            if(textareaArr[index] == document.querySelectorAll('.letterspan')[index].textContent ){
                document.querySelectorAll('.letterspan')[index].classList.remove('incorrect');
                document.querySelectorAll('.letterspan')[index].classList.add('correct');
            }
            else{
                document.querySelectorAll('.letterspan')[index].classList.remove('correct');
                document.querySelectorAll('.letterspan')[index].classList.add('incorrect');
            }
        }
        else{
            displayScore();
        };
        document.querySelectorAll('.letterspan')[index].classList.remove('current');
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
            }, 2000);
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
    document.querySelector('textarea').readOnly = true;

    let scoreOverlay = document.createElement('div');
    scoreOverlay.classList.add("score-overlay");
    
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
    score.innerHTML= `<span> Number of correct words : <br> <span>${numberOfCorrectWords}</span> </span>
        <span> Number of Incorrect words : <br> <span>${numberOfIncorrectWords}</span> </span>
        <span> Your typing speed is <br> <span>${scoreValue} WPM </span> </span>`;
    
    const close = document.createElement('button');
    close.innerText = "X";
    close.classList.add("close");

    scoreOverlay.append(score, close);
    document.body.appendChild(scoreOverlay);

    close.addEventListener('click', closeScore);
    function closeScore(){
        document.querySelectorAll('.score-overlay').forEach((scoreOverlay) => scoreOverlay.remove());
        startGame();
        document.querySelector('textarea').readOnly = false;
        document.querySelector('textarea').placeholder = "Wait..";
        TIMER.innerText = 0;
    }
}