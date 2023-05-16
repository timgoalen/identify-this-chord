document.addEventListener("DOMContentLoaded", function () {
    selectAudioForGame(audioArray);
});

// get elements from html & create an audio object
const playBtn = document.getElementById('play-btn');
const audio = new Audio();

// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [
    "assets/audio/pp2-audio-test1.mp3",
    "assets/audio/pp2-audio-test2.mp3",
    "assets/audio/pp2-audio-test3.mp3",
    "assets/audio/pp2-audio-test4.mp3",
    "assets/audio/pp2-audio-test5.mp3"
];

let randomAudioArray = [];

// https://github.com/tanisecarvalho/horns-on-fire/blob/main/assets/js/script.js
function selectAudioForGame() {
    let safeArrayCopy = audioArray.slice();
    for (let i = 0; i < 5; i++) {
        let randomIndex = Math.floor(Math.random() * safeArrayCopy.length);
        randomAudioArray.push(safeArrayCopy.splice(randomIndex, 1)[0]);
    }
}

playBtn.addEventListener('click', function () {
    audio.play();
    // playNextChord();
    // playRandomAudio();
})