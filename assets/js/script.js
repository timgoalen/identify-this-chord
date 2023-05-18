// Load game on page load
document.addEventListener("DOMContentLoaded", function () {
    startGame();
});

// Get elements from index.html
const playBtn = document.getElementById('play-btn');

const answerBtn1 = document.getElementById('answer-btn-1');
const answerBtn2 = document.getElementById('answer-btn-2');
const answerBtn3 = document.getElementById('answer-btn-3');
const answerBtn4 = document.getElementById('answer-btn-4');
const answerBtn5 = document.getElementById('answer-btn-5');

const resultsBlock1 = document.getElementById("results-block-1")
const resultsBlock2 = document.getElementById("results-block-2")
const resultsBlock3 = document.getElementById("results-block-3")
const resultsBlock4 = document.getElementById("results-block-4")
const resultsBlock5 = document.getElementById("results-block-5")

// Variables ('game state')

let randomAudioArray = [];
let audioIndex = 0;
let submittedAnswer = "";
let gameProgress = 0;
let score = 0;

// Start game

function startGame() {
    // Variables re-set
    randomAudioArray = [];
    audioIndex = 0;
    submittedAnswer = "";
    gameProgress = 0;
    score = 0;
    // Choose audio
    selectAudioForGame(audioArray);
    // Reset score colours
    resultsBlock1.classList.remove("correct-answer", "wrong-answer");
    resultsBlock2.classList.remove("correct-answer", "wrong-answer");
    resultsBlock3.classList.remove("correct-answer", "wrong-answer");
    resultsBlock4.classList.remove("correct-answer", "wrong-answer");
    resultsBlock5.classList.remove("correct-answer", "wrong-answer");
    resultsBlock1.innerHTML = "";
    resultsBlock2.innerHTML = "";
    resultsBlock3.innerHTML = "";
    resultsBlock4.innerHTML = "";
    resultsBlock5.innerHTML = "";
}

//Array of objects, with audio files and corresponding correct answers
// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [{
        question: "assets/audio/pp2-audio-test1.mp3",
        answer: "answer is 1"
    },
    {
        question: "assets/audio/pp2-audio-test2.mp3",
        answer: "answer is 2"
    },
    {
        question: "assets/audio/pp2-audio-test3.mp3",
        answer: "answer is 3"
    },
    {
        question: "assets/audio/pp2-audio-test4.mp3",
        answer: "answer is 4"
    },
    {
        question: "assets/audio/pp2-audio-test5.mp3",
        answer: "answer is 5"
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
    playAudio(); // (maybe combine with playAudio function)
})

// mix of these two...from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
// & https://stackoverflow.com/questions/52486241/show-array-increment-one-by-one-elements-upon-onclick-function
function playAudio() {
    let audio = new Audio(randomAudioArray[audioIndex].question);
    // audioIndex++;
    audio.load(); //(maybe not needed)
    audio.play();
}

// WIP of getting answers
answerBtn1.addEventListener('click', answer1);
answerBtn2.addEventListener('click', answer2);
answerBtn3.addEventListener('click', answer3);
answerBtn4.addEventListener('click', answer4);
answerBtn5.addEventListener('click', answer5);

function answer1() {
    submittedAnswer = "answer is 1";
    checkAnswer();
    audioIndex++;
}

function answer2() {
    submittedAnswer = "answer is 2";
    checkAnswer();
    audioIndex++;
}

function answer3() {
    submittedAnswer = "answer is 3";
    checkAnswer();
    audioIndex++;
}

function answer4() {
    submittedAnswer = "answer is 4";
    checkAnswer();
    audioIndex++;
}

function answer5() {
    submittedAnswer = "answer is 5";
    checkAnswer();
    audioIndex++;
}

function checkAnswer() {
    if (submittedAnswer == randomAudioArray[audioIndex].answer) {
        gameProgress++;
        score++;
        if (gameProgress == 1) {
            resultsBlock1.classList.add("correct-answer");
            resultsBlock1.innerHTML = "<p>:)</p>";
        } else if (gameProgress == 2) {
            resultsBlock2.classList.add("correct-answer");
            resultsBlock2.innerHTML = "<p>:)</p>";
        } else if (gameProgress == 3) {
            resultsBlock3.classList.add("correct-answer");
            resultsBlock3.innerHTML = "<p>:)</p>";
        } else if (gameProgress == 4) {
            resultsBlock4.classList.add("correct-answer");
            resultsBlock4.innerHTML = "<p>:)</p>";
        } else {
            resultsBlock5.classList.add("correct-answer");
            resultsBlock5.innerHTML = "<p>:)</p>";
            setTimeout(gameOver, 300);
        }
    } else {
        gameProgress++;
        if (gameProgress == 1) {
            resultsBlock1.classList.add("wrong-answer");
            resultsBlock1.innerHTML = "<p>X</p>";
        } else if (gameProgress == 2) {
            resultsBlock2.classList.add("wrong-answer");
            resultsBlock2.innerHTML = "<p>X</p>";
        } else if (gameProgress == 3) {
            resultsBlock3.classList.add("wrong-answer");
            resultsBlock3.innerHTML = "<p>X</p>";
        } else if (gameProgress == 4) {
            resultsBlock4.classList.add("wrong-answer");
            resultsBlock4.innerHTML = "<p>X</p>";
        } else {
            resultsBlock5.classList.add("wrong-answer");
            resultsBlock5.innerHTML = "<p>X</p>";
            setTimeout(gameOver, 100);
        }
    }
}

// Game over

gameOverTextResult = "";

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
        // showCancelButton: true,
        confirmButtonColor: '#3085d6',
        // cancelButtonColor: '#d33',
        confirmButtonText: 'Play again!'
    }).then((result) => {
        if (result.isConfirmed) {
            startGame();
        }
    });
}