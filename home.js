const START_BUTTON = document.querySelector('.start');
const START_OVERLAY = document.querySelector('.start-overlay');

const QUOTE = document.querySelector('.quote');
const TEXTAREA = document.querySelector('textarea');
const TIMER = document.querySelector('.timer');

START_BUTTON.addEventListener('click', startGame);

TEXTAREA.value = "";
let timer;

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
    
    TEXTAREA.addEventListener('input', checkLetter);
    function checkLetter(){
        let textareaArr = TEXTAREA.value.split('');
        let index = textareaArr.lastIndexOf(TEXTAREA.value[TEXTAREA.value.length -1]);

        if (textareaArr.length < spanArr.length){
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
            // displayScore();
        }


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
    setInterval(() => {
        timer += 1;
        TIMER.innerText = timer;
    }, 1000);
}
