// GLOBAL CONSTANTS

// The array that holds the quiz questions (audio) and answers
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

// Get elements from index.html
const playBtn = document.getElementById("play-btn");
const answerButtons = document.getElementsByClassName("answer-btn");
const resultsSquares = document.getElementsByClassName("results-squares");

// GLOBAL VARIABLES

let randomAudioArray = [];
let audioIndex = 0;
let submittedAnswer = "";
let gameProgress = 0;
let score = 0;
let gameOverTextResult = "";

// EVENT LISTENERS

// Starts game on page load
document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

// Plays audio file on click
playBtn.addEventListener("click", function () {
    playAudio();
});

// Retreives user answer
for (let answerButton of answerButtons) {
    answerButton.addEventListener("click", function () {
        submittedAnswer = answerButton.dataset.id;
        submitAnswer();
    })
}

// FUNCTIONS

/**
 * Loads the game.
 */
function startGame() {
    // Resets variables
    randomAudioArray = [];
    audioIndex = 0;
    submittedAnswer = "";
    gameProgress = 0;
    score = 0;
    // Chooses audio
    selectAudioForGame();
    // Resets result blocks colours and icons
    for (let square of resultsSquares) {
        square.classList.remove("correct-answer", "wrong-answer");
        square.innerHTML = "";
    }
    // Disable answer buttons (until 'Play Chord' has been clicked on)
    disableAnswerButtons();
}

/**
 * Creates a random non-repeating array from the main audioArray.
 * Inspired by: https://github.com/tanisecarvalho/horns-on-fire/blob/main/assets/js/script.js
 */
function selectAudioForGame() {
    let safeArrayCopy = audioArray.slice();
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * safeArrayCopy.length);
        randomAudioArray.push(safeArrayCopy.splice(randomIndex, 1)[0]);
    }
}

/**
 * Creates and plays a new audio object.
 * Inspired by: https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
 * and https://stackoverflow.com/questions/52486241/show-array-increment-one-by-one-elements-upon-onclick-function
 */
function playAudio() {
    enableAnswerButtons();
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

/**
 * Submits user answer. This function is called by the answerButtons event listener.
 */
function submitAnswer() {
    checkAnswer();
    disableAnswerButtons();
    audioIndex++;
}

/**
 * Checks user answer against correct answer, modifies the results blocks to show score, and increments the gameProgess. 
 */
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

/**
 * Ends game by displaying the score with Sweet Alerts,
 * and gives the user an opportunity to play the game again.
 */
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