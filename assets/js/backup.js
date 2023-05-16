document.addEventListener("DOMContentLoaded", function () {
    selectChordsAudio();
});


// get elements from html & create an audio object
const playBtn = document.getElementById('play-btn');
const audio = new Audio();

// play audio with button
playBtn.addEventListener('click', function () {
    audio.play();
    // playNextChord();
    // playRandomAudio();
})

// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [
    "assets/audio/pp2-audio-test1.mp3",
    "assets/audio/pp2-audio-test2.mp3",
    "assets/audio/pp2-audio-test3.mp3",
    "assets/audio/pp2-audio-test4.mp3",
    "assets/audio/pp2-audio-test5.mp3"
];

let randomChords = [];

// function playRandomAudio() {
//     let audioIndex = Math.floor(Math.random() * audioArray.length);
//     let audio = new Audio(audioArray[audioIndex]);
//     audio.load();
//     audio.play();
// }
function playRandomAudio() {
    let audioIndex = Math.floor(Math.random() * randomChords.length);
    let audio = new Audio(randomChords[audioIndex]);
    audio.load();
    audio.play();
}

function selectChordsAudio(audioArray) {
    let safeArrayCopy = audioArray.slice();
    for (let i = 0; i < 5; i++) {
        let newChord = Math.floor(Math.random() * safeArrayCopy.length);
        randomChords.push(safeArrayCopy.splice(newChord, 1)[0]);
    }
}
