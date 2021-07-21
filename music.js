// document.addEventListener('DOMContentLoaded', () => {

let playButton = document.getElementById('play');
let pauseButton = document.getElementById('pause');
let prev = document.getElementById('prev');
let next = document.getElementById('next');
let audio = document.getElementById('audio');
let thumbnail = document.getElementById('img-container');
let artist = document.getElementById('artist');
let songName = document.getElementById('songName');
let playing = false;
let songIndex = 0;
let thumbnailIndex = 0;
let songArtitstIndex = 0;
let allSongsIndex = 0;
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const durationEle = document.getElementById('duration');
const currentTimeEle = document.getElementById('current-time');


songs = ['music/Billie Eilish - Bad Guy.mp3', 'music/Billie Eilish - all the good girls go to hell.mp3', 'music/Billie Eilish - i love you.mp3', 'music/Billie Eilish - lovely (with Khalid).mp3', 'music/Billie Eilish - ocean eyes.mp3', 'music/Billie Eilish - you should see me in a crown.mp3'];
thumbnails = ['images/music album 1.jpg', 'images/music album 2.jpg'];
songArtitst = ['Billie Eilish'];
allSongs = ['Bad Guy', 'all the good girls go to hell', 'i love you', 'lovely', 'ocean eyes', 'you should see me in a crown'];

function play_pause_Song() {
    if (!playing) {
        // alert('play');
        playing = true;
        audio.play();       // pausing song if play button click
        playButton.hidden = true;
        pauseButton.hidden = false;
    }
    else {
        // alert('pause');

        playing = false;
        playButton.hidden = false;
        pauseButton.hidden = true;

        audio.pause();      // playing song if play button click
    }
}

function playNextSong() {
    // alert('clicked');
    songIndex += 1;
    thumbnailIndex += 1;
    songArtitstIndex += 1;
    allSongsIndex += 1;

    if (songIndex == songs.length)
        songIndex = 0;
    if (thumbnailIndex == thumbnails.length)
        thumbnailIndex = 0;
    if (songArtitstIndex == songArtitst.length)
        songArtitstIndex = 0;
    if (allSongsIndex == allSongs.length)
        allSongsIndex = 0;


    // console.log("song index is "+ songIndex);
    // console.log("thumbnailIndex is "+ thumbnailIndex);
    // console.log("songArtitstIndex is "+ songArtitstIndex);
    // console.log("allSongsIndex is "+ allSongsIndex);

    audio.src = songs[songIndex];
    thumbnail.src = thumbnails[thumbnailIndex];
    artist.innerHTML = songArtitst[songArtitstIndex];
    songName.innerHTML = allSongs[allSongsIndex];

    playing = false;
    play_pause_Song();

}

function playPrevSong() {
    // alert('clicked');
    songIndex -= 1;
    thumbnailIndex -= 1;
    songArtitstIndex -= 1;
    allSongsIndex -= 1;

    if (songIndex < 0)
        songIndex = songs.length - 1;
    if (thumbnailIndex < 0)
        thumbnailIndex = thumbnails.length - 1;
    if (songArtitstIndex < 0)
        songArtitstIndex = songArtitst.length - 1;
    if (allSongsIndex < 0)
        allSongsIndex = allSongs.length - 1;


    // console.log("song index is " + songIndex);
    // console.log("thumbnailIndex is " + thumbnailIndex);
    // console.log("songArtitstIndex is " + songArtitstIndex);
    // console.log("allSongsIndex is " + allSongsIndex);

    audio.src = songs[songIndex];
    thumbnail.src = thumbnails[thumbnailIndex];
    artist.innerHTML = songArtitst[songArtitstIndex];
    songName.innerHTML = allSongs[allSongsIndex];

    playing = false;
    play_pause_Song();
}


function updateProgressBar(e) {

    if (playing) {
        const { duration, currentTime } = e.srcElement;
        // console.log(currentTime,duration);
        const progressPercent = (currentTime / duration) * 100;
        // console.log(progressPercent);
        progress.style.width = `${progressPercent}%`;

        // Updating current-time and duration

        const durationMinutes = Math.floor(duration / 60);
        let durationSeconds = Math.floor(duration % 60);
        // console.log(durationMinutes + "minutes : " + durationSeconds + " seconds");

        const currentTimeMinutes = Math.floor(currentTime / 60);
        let currentTimeSeconds = Math.floor(currentTime % 60);
        // console.log(currentTimeMinutes + "minutes : " + currentTimeSeconds + " seconds");

        if (durationSeconds < 10)
            durationSeconds = "0" + durationSeconds;
        if (currentTimeSeconds < 10)
            currentTimeSeconds = "0" + currentTimeSeconds;
        if (durationMinutes)
            durationEle.textContent = `${durationMinutes}:${durationSeconds}`;
        currentTimeEle.textContent = `${currentTimeMinutes}:${currentTimeSeconds}`;

    }
}

function slider(e) {
    // console.log(e);
    // console.log(e.offsetX);
    // console.log(progressContainer.offsetWidth);
    const totalWidthofProgressBar = progressContainer.offsetWidth;
    const clickedWidth = e.offsetX;
    const progressPercent = (clickedWidth / totalWidthofProgressBar) * 100;

    progress.style.width = `${progressPercent}%`;
    //console.log(audio.currentTime);
    audio.currentTime = audio.duration * progressPercent / 100;
}

function moveForwardTenSeconds() {
    console.log('forward');
    if (audio.currentTime + 10 < audio.duration)
        audio.currentTime += 10;
    else {
        audio.currentTime = audio.duration;
        playing = false;
        play_pause_Song();
    }

}

function moveBackwardTenSeconds() {
    console.log('backward');

    if (audio.currentTime - 10 > 0)
        audio.currentTime -= 10;
    else {
        audio.currentTime = 0;
        playing = false;
        play_pause_Song();
    }

}

function main() {
    playing = false;
    pauseButton.hidden = true;
    playButton.addEventListener('click', play_pause_Song);
    pauseButton.addEventListener('click', play_pause_Song);

    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 32) {
            play_pause_Song();
        }
    });
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 37) {
            moveBackwardTenSeconds();
        }
    });
    document.addEventListener('keypress', function (e) {
        if (e.keyCode === 39) {
            moveForwardTenSeconds();
        }
    });


    prev.addEventListener('click', playPrevSong);
    next.addEventListener('click', playNextSong);
    audio.addEventListener('ended', playNextSong);
    audio.addEventListener('timeupdate', updateProgressBar);
    progressContainer.addEventListener('click', slider);

                    // Other Features
    //Add Shuffle Button 
    //Add arrow keys
    // Add sign up form
    // Add DB
    // add forward backward button
}


main();
