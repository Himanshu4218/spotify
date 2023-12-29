const songlist = document.querySelector(".songlist");
const masterPlay = document.getElementById("play");
const progressbar = document.getElementById("progressbar");

for (let i = 0; i < 10; ++i) {
  let songContainer = document.createElement("div");
  songContainer.className = "song";

  let songDetails = document.createElement("div");
  songDetails.className = "songdetails";

  let imageElement = document.createElement("img");
  imageElement.src = `covers/${i + 1}.jpg`;
  imageElement.alt = "";

  let spanElement = document.createElement("span");
  spanElement.textContent = `Audio ${i+1}`;

  songDetails.appendChild(imageElement);
  songDetails.appendChild(spanElement);

  let playIcon = document.createElement("i");
  playIcon.className = "fa-regular fa-circle-play";

  songContainer.appendChild(songDetails);
  songContainer.appendChild(playIcon);
  songlist.appendChild(songContainer);
}

const audio = new Audio("songs/1.mp3");
const gif = document.getElementById("gif");
const songname = document.getElementById("songname");
let currentPlayingIndex = -1;
Array.from(songlist.children).forEach((song, index) => {
  const playbutton = song.children[1];
  playbutton.addEventListener("click", function () {
    if (index !== currentPlayingIndex) {
      audio.src = `songs/${index + 1}.mp3`;
      songname.textContent = `Audio ${index+1}`;
      currentPlayingIndex = index;
    }

    if (audio.paused) {
      audio.play();
      resetPlayButtons();
      gif.style.opacity = 1;
      songname.style.opacity = 1;
      playbutton.classList.add("fa-circle-pause");
      playbutton.classList.remove("fa-circle-play");
      masterPlay.classList.add("fa-circle-pause");
      masterPlay.classList.remove("fa-circle-play");
    } else {
      audio.pause();
      gif.style.opacity = 0;
      songname.style.opacity = 0;
      playbutton.classList.remove("fa-circle-pause");
      playbutton.classList.add("fa-circle-play");
      masterPlay.classList.remove("fa-circle-pause");
      masterPlay.classList.add("fa-circle-play");
    }
  });
});

function resetPlayButtons() {
  Array.from(songlist.children).forEach((song) => {
    const playbutton = song.children[1];
    playbutton.classList.remove("fa-circle-pause");
    playbutton.classList.add("fa-circle-play");
  });
}

masterPlay.addEventListener("click", () => {
  if (audio.paused) {
    audio.play();
    gif.style.opacity = 1;
    songname.style.opacity = 1;
    masterPlay.classList.add("fa-circle-pause");
    masterPlay.classList.remove("fa-circle-play");
  } else {
    audio.pause();
    gif.style.opacity = 0;
    songname.style.opacity = 0;
    masterPlay.classList.remove("fa-circle-pause");
    masterPlay.classList.add("fa-circle-play");
  }
});

audio.addEventListener("timeupdate", () => {
  progress = parseInt((audio.currentTime / audio.duration) * 100);
  progressbar.value = progress;
});

progressbar.addEventListener("change", () => {
  audio.currentTime = (progressbar.value * audio.duration) / 100;
});

document.getElementById("next").addEventListener("click", () => {
  if (currentPlayingIndex >= 9) {
    currentPlayingIndex = 0;
  } else {
    currentPlayingIndex += 1;
  }
  audio.src = `songs/${currentPlayingIndex + 1}.mp3`;
  audio.currentTime = 0;
  audio.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});

document.getElementById("previous").addEventListener("click", () => {
  if (currentPlayingIndex <= 0) {
    currentPlayingIndex = 0;
  } else {
    currentPlayingIndex -= 1;
  }
  audio.src = `songs/${currentPlayingIndex + 1}.mp3`;
  audio.currentTime = 0;
  audio.play();
  masterPlay.classList.remove("fa-circle-play");
  masterPlay.classList.add("fa-circle-pause");
});
