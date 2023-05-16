document.addEventListener("DOMContentLoaded", function () {
    selectAudioForGame(audioArray);
});

// get elements from html
const playBtn = document.getElementById('play-btn');

// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [
    "assets/audio/pp2-audio-test1.mp3",
    "assets/audio/pp2-audio-test2.mp3",
    "assets/audio/pp2-audio-test3.mp3",
    "assets/audio/pp2-audio-test4.mp3",
    "assets/audio/pp2-audio-test5.mp3"
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
    let audio = new Audio(randomAudioArray[audioIndex]);
    audioIndex++;
    audio.load(); //(maybe not needed)
    audio.play();
}