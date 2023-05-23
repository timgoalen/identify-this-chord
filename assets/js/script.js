// Load game on page load
document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

// Get elements from index.html

const playBtn = document.getElementById('play-btn');

const answerButtons = document.getElementsByClassName('answer-btn');

const answerBtn1 = document.getElementById('answer-btn-1');
const answerBtn2 = document.getElementById('answer-btn-2');
const answerBtn3 = document.getElementById('answer-btn-3');
const answerBtn4 = document.getElementById('answer-btn-4');
const answerBtn5 = document.getElementById('answer-btn-5');

const resultsSquares = document.getElementsByClassName('results-squares');

const resultsBlock1 = document.getElementById("results-block-1");
const resultsBlock2 = document.getElementById("results-block-2");
const resultsBlock3 = document.getElementById("results-block-3");
const resultsBlock4 = document.getElementById("results-block-4");
const resultsBlock5 = document.getElementById("results-block-5");

// Variables ('game state')

let randomAudioArray = [];
let audioIndex = 0;
let submittedAnswer = "";
let gameProgress = 0;
let score = 0;

// Start game

function startGame() {
    // Reset variables
    randomAudioArray = [];
    audioIndex = 0;
    submittedAnswer = "";
    gameProgress = 0;
    score = 0;
    // Choose audio
    selectAudioForGame(audioArray);
    // Reset result blocks colours and icons
    for (let square of resultsSquares) {
        square.classList.remove("correct-answer", "wrong-answer");
        square.innerHTML = "";
    }
    // Disable answer buttons (until 'Play Chord' has been clicked on)
    disableAnswerButtons();
}

//Array of objects, with audio files and corresponding correct answers
// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [{
        question: "assets/audio/audio-q-maj.mp3",
        answer: "major"
    },
    {
        question: "assets/audio/audio-q-min.mp3",
        answer: "minor"
    },
    {
        question: "assets/audio/audio-q-dom7.mp3",
        answer: "dom7"
    },
    {
        question: "assets/audio/audio-q-maj7.mp3",
        answer: "maj7"
    },
    {
        question: "assets/audio/audio-q-min7.mp3",
        answer: "min7"
    },
];

// https://github.com/tanisecarvalho/horns-on-fire/blob/main/assets/js/script.js
function selectAudioForGame() {
    let safeArrayCopy = audioArray.slice();
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * safeArrayCopy.length);
        randomAudioArray.push(safeArrayCopy.splice(randomIndex, 1)[0]);
    }
}

playBtn.addEventListener('click', function () {
    playAudio();
});

// mix of these two...from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
// & https://stackoverflow.com/questions/52486241/show-array-increment-one-by-one-elements-upon-onclick-function
function playAudio() {
    // disables answer buttons
    for (let button of answerButtons) {
        button.disabled = false;
    }
    // creates and plays a new audio object (playing over each other, for a smoother sound experience)
    let audio = new Audio(randomAudioArray[audioIndex].question);
    audio.play();
}

function disableAnswerButtons() {
    for (let answerButton of answerButtons) {
        answerButton.disabled = true;
    }
}

function enableAnswerButtons() {
    for (let answerButton of answerButtons) {
        answerButton.disabled = false;
    }
}

// Retreive user answer

for (let answerButton of answerButtons) {
    answerButton.addEventListener('click', function () {
        submittedAnswer = answerButton.dataset.id;
        submitAnswer();
    })
}

// Submit user answer

function submitAnswer() {
    checkAnswer();
    disableAnswerButtons();
    audioIndex++;
}

// Check user answer and advance game

function checkAnswer() {
    gameProgress++;
    // Correct answer
    if (submittedAnswer === randomAudioArray[audioIndex].answer) {
        score++;
        resultsSquares[gameProgress - 1].classList.add("correct-answer"); // '-1' is used because the array starts at '0'
        resultsSquares[gameProgress - 1].innerHTML = `<i class="fa-solid fa-heart fa-xl"></i>`;
    // Wrong answer
    } else {
        resultsSquares[gameProgress - 1].classList.add("wrong-answer"); // '-1' is used because the array starts at '0'
        resultsSquares[gameProgress - 1].innerHTML = `<i class="fa-solid fa-heart-crack fa-xl"></i>`;
    }
    // Run gameOver function after 5 rounds
    if (gameProgress === 5) {
        setTimeout(gameOver, 200);
    }
}

// Game over

let gameOverTextResult = "";

function gameOver() {
    if (score == 5) {
        gameOverTextResult = "Perfect!";
    } else if (score == 4) {
        gameOverTextResult = "Excellent!";
    } else if (score == 3) {
        gameOverTextResult = "Well done!";
    } else if (score == 2) {
        gameOverTextResult = "Nice try!";
    } else {
        gameOverTextResult = "Unlucky!";
    }

    Swal.fire({
        title: gameOverTextResult,
        text: `You scored ${score}/5`,
        icon: 'success',
        confirmButtonColor: '#3085d6',
        confirmButtonText: 'Play again!'
    }).then((result) => {
        if (result.isConfirmed) {
            startGame();
        }
    });
}