document.addEventListener("DOMContentLoaded", function () {
    selectAudioForGame(audioArray);
});

// get elements from html
const playBtn = document.getElementById('play-btn');

const answerBtn1 = document.getElementById('answer-btn-1');
const answerBtn2 = document.getElementById('answer-btn-2');
const answerBtn3 = document.getElementById('answer-btn-3');
const answerBtn4 = document.getElementById('answer-btn-4');
const answerBtn5 = document.getElementById('answer-btn-5');

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

let randomAudioArray = [];
let audioIndex = 0;

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

let returnedAnswer = "";

// WIP of getting answers
answerBtn1.addEventListener('click', answer1);
answerBtn2.addEventListener('click', answer2);
answerBtn3.addEventListener('click', answer3);
answerBtn4.addEventListener('click', answer4);
answerBtn5.addEventListener('click', answer5);


function answer1() {
    returnedAnswer = "answer is 1";
    checkAnswer();
    audioIndex++;
}

function answer2() {
    returnedAnswer = "answer is 2";
    checkAnswer();
    audioIndex++;
}

function answer3() {
    returnedAnswer = "answer is 3";
    checkAnswer();
    audioIndex++;
}

function answer4() {
    returnedAnswer = "answer is 4";
    checkAnswer();
    audioIndex++;
}

function answer5() {
    returnedAnswer = "answer is 5";
    checkAnswer();
    audioIndex++;
}

function checkAnswer() {
    if (returnedAnswer == randomAudioArray[audioIndex].answer) {
        alert("CORRECT!");
    } else {
        alert("INCORRECT!");
    }
}

