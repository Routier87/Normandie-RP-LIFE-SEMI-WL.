// Script audio complet pour Normandie RP

const audio = document.getElementById("bg-music");
const toggleBtn = document.getElementById("toggle-music");
const volUp = document.getElementById("volume-up");
const volDown = document.getElementById("volume-down");
const volumeBar = document.getElementById("volume-bar");
const titleBox = document.getElementById("current-track");

// Nom de votre musique (modifiable)
let musicName = "musique.mp3";
titleBox.textContent = musicName;

// Lecture auto
audio.volume = 0.5;
audio.play();

// Play / Pause
toggleBtn.addEventListener("click", () => {
    if (audio.paused) {
        audio.play();
        toggleBtn.textContent = "⏸️ Pause";
    } else {
        audio.pause();
        toggleBtn.textContent = "▶️ Play";
    }
});

// Volume +
volUp.addEventListener("click", () => {
    audio.volume = Math.min(1, audio.volume + 0.1);
    volumeBar.value = audio.volume;
});

// Volume -
volDown.addEventListener("click", () => {
    audio.volume = Math.max(0, audio.volume - 0.1);
    volumeBar.value = audio.volume;
});

// Barre de volume
volumeBar.addEventListener("input", () => {
    audio.volume = volumeBar.value;
});
