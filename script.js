document.addEventListener('DOMContentLoaded', function () {
    setTimeout(function () {
        document.querySelector('.loader-wrapper').style.display = 'none';
        document.querySelector('.main').style.display = 'flex';
    }, 1000);

    const belki = new Audio('/music/belki.mp3');
    const doja = new Audio('/music/mission_impossible.mp3');
    const haza = new Audio('/music/haza salam.mp3');
    const ponk = new Audio('/music/etern.mp3');
    const crystal = new Audio('/music/crystal.mp3');

    const prebtn = document.getElementById("prev");
    const playbtn = document.getElementById("pla");
    const forwbtn = document.getElementById("forw");
    const songTitle = document.querySelector('.song-name');
    const playPush = document.getElementById("play-push");
    const timeSlider = document.getElementById('timeSlider');
    const currentTimeDisplay = document.getElementById('currentTime');
    const durationTimeDisplay = document.getElementById('durationTime');
    const songImage = document.getElementById('song-image');

    const songs = [
        { path: belki, songName: 'Belki - Akustik(Dedublüman)', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS6cT7CyvXQTmn5ksHVbbrL9ncLWozzDEDzxQ&s' },
        { path: doja, songName: 'mission_impossible– Ghost Protocol ', image: 'https://assets-prd.ignimgs.com/2023/05/17/mission-impossible-dead-reckoning-part-one-ver2-button-1684350230547.jpg?width=300&auto=webp' },
        { path: haza, songName: 'Haza Salam | هذا سلام |English & Arabic lyrics | Slowed and Reverb', image: 'https://source.boomplaymusic.com/group10/M00/03/16/d2323ee1d8954155a2a41e5d6b91ba6c_464_464.jpg' },
        { path: ponk, songName: 'Eternxlkz - ENOUGH! | Extended Version', image: 'https://source.boomplaymusic.com/group10/M00/07/03/26c1a65d653544d88592ec77762b2dc1_464_464.jpg' },
        { path: crystal, songName: 'Crystal Castles - Transgender', image: 'https://i1.sndcdn.com/artworks-k9TfzcIIwgXWRF3Y-CmHUtA-t500x500.jpg' }
    ];

    let current = 0;
    let currentSong = songs[current].path;

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? '0' : ''}${secs}`;
    };

    const updateSongInfo = () => {
        songTitle.textContent = songs[current].songName;
        songImage.src = songs[current].image;
        currentSong.addEventListener('loadedmetadata', onLoadedMetadata);
    };

    const onLoadedMetadata = () => {
        timeSlider.max = currentSong.duration;
        durationTimeDisplay.textContent = formatTime(currentSong.duration);
    };

    const attachTimeUpdateEvent = () => {
        currentSong.addEventListener('timeupdate', updateTime);
    };

    const detachTimeUpdateEvent = () => {
        currentSong.removeEventListener('timeupdate', updateTime);
    };

    const updateTime = () => {
        timeSlider.value = currentSong.currentTime;
        currentTimeDisplay.textContent = formatTime(currentSong.currentTime);
    };

    const updateSong = (action) => {
        currentSong.pause();
        detachTimeUpdateEvent();

        if (action === 'next') {
            current = (current + 1) % songs.length;
        } else if (action === 'prev') {
            current = (current - 1 + songs.length) % songs.length;
        }

        currentSong = songs[current].path;
        currentSong.currentTime = 0;
        timeSlider.value = 0;
        currentTimeDisplay.textContent = '0:00';
        durationTimeDisplay.textContent = '0:00';

        updateSongInfo();
        attachTimeUpdateEvent();

        if (!currentSong.paused) {
            currentSong.play();
            playPush.className = 'fas fa-pause';
        } else {
            playPush.className = 'fas fa-play';
        }
    };

    playbtn.addEventListener('click', () => {
        if (currentSong.paused) {
            currentSong.play();
            playPush.className = 'fas fa-pause';
        } else {
            currentSong.pause();
            playPush.className = 'fas fa-play';
        }
    });

    forwbtn.addEventListener('click', () => {
        updateSong('next');
        currentSong.play();
        playPush.className = 'fas fa-pause';
    });

    prebtn.addEventListener('click', () => {
        updateSong('prev');
        currentSong.play();
        playPush.className = 'fas fa-pause';
    });

    timeSlider.addEventListener('input', () => {
        currentSong.currentTime = timeSlider.value;
    });

    updateSongInfo();
    attachTimeUpdateEvent();
});
