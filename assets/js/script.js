// get elements from html
const playBtn = document.getElementById('play-btn');
const nextBtn = document.getElementById('next-btn');
// const audio = document.getElementById('audio');

// play audio with button
playBtn.addEventListener('click', function () {
    // audio.play();
    // playNextChord();
    playRandomAudio();
})

// play next audio in array
// nextBtn.addEventListener('click', function () {
//     playNextChord();
// })

// from https://palettes.shecodes.io/athena/26906-how-to-play-a-random-audio-from-an-array-in-javascript
const audioArray = [
    "assets/audio/pp2-audio-test1.mp3", 
    "assets/audio/pp2-audio-test2.mp3", 
    "assets/audio/pp2-audio-test3.mp3", 
    "assets/audio/pp2-audio-test4.mp3", 
    "assets/audio/pp2-audio-test5.mp3"];

function playRandomAudio() {
    let audioIndex = Math.floor(Math.random() * audioArray.length);
    let audio = new Audio(audioArray[audioIndex]);
    audio.load();
    audio.play();
  }

// inspired by: https://www.section.io/engineering-education/how-to-build-a-music-player-with-vanilla-javascript/

// audio file titles array
// let audioTitles = [
//     'pp2-audio-test1',
//     'pp2-audio-test2',
//     'pp2-audio-test3',
//     'pp2-audio-test4',
//     'pp2-audio-test5'
// ]

// let audioIndex = 0;

// loadAudio(audioTitles[audioIndex]);

// function loadAudio(AudioFile) {
//     audio.src = `assets/audio/${AudioFile}.mp3`;
// }

// function playNextChord() {
//     audioIndex++;

//     if (audioIndex > audioTitles.length - 1) {
//         audioIndex = 0;
//     }

//     loadAudio(audioTitles[audioIndex]);
//     audio.play();
// }