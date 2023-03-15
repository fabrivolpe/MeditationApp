const app = () => {
    //Define variables
    const song = document.querySelector(".song");
    const play = document.querySelector(".play");
    const outline = document.querySelector(".moving-outline circle");
    const video = document.querySelector(".video-container video");
    const sounds = document.querySelectorAll(".sound-picker button");
    const timeDisplay = document.querySelector(".time-display");
    const timeSelect = document.querySelectorAll(".time-select button")
    const outlineLength = outline.getTotalLength();
    let fakeDuration = 120;

    //Set up progress animation
    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    //Change sounds
    sounds.forEach(sound => {
        sound.addEventListener("click", function () {
            song.src = this.getAttribute("data-sound");
            video.src = this.getAttribute("data-video");
            checkPlaying(song);
        })
    })

    //Start song
    play.addEventListener("click", () => {
        checkPlaying(song);
    });

    //Select amount for timer
    timeSelect.forEach(option => {
        option.addEventListener("click", function () {
            fakeDuration = this.getAttribute("data-time");
            timeDisplay.textContent = `${Math.floor(fakeDuration / 60)}:${Math.floor(fakeDuration % 60)}`;
        });
    });

    //Check if song is playing or paused
    function checkPlaying(song) {
        if (song.paused) {
            song.play();
            video.play();
            play.src = "./svg/pause.svg"
        } else {
            song.pause();
            video.pause();
            play.src = "./svg/play.svg"
        }
    };

    //As song plays, check if timer is done and, if not, update progress both on the timer and on the progress circle
    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsedTime = fakeDuration - currentTime;
        let seconds = Math.floor(elapsedTime % 60);
        let minutes = Math.floor(elapsedTime / 60);
        let progress = outlineLength - (currentTime / fakeDuration) * outlineLength;
        outline.style.strokeDashoffset = progress;
        timeDisplay.textContent = `${minutes}:${seconds}`;
        if (currentTime >= fakeDuration) {
            song.pause();
            song.currentTime = 0;
            play.src = "./svg/play.svg";
            video.pause();
        }
    };
};

app();