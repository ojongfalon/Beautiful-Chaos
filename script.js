// elements
const body      = document.body;
const video     = document.getElementById('bgVideo');
const source    = document.getElementById('bgSource');
const audio     = document.getElementById('bgAudio');
const themeBtn  = document.getElementById('toggle-theme');
const audioBtn  = document.getElementById('toggle-audio');

let isDay = false;
let audioPlaying = false;

// theme toggle
themeBtn.addEventListener('click', () => {
  isDay = !isDay;
  body.classList.toggle('day-mode', isDay);

  // swap video source
  source.src = isDay ? 'video/day.mp4' : 'video/background.mp4';
  video.load();

  // Ensure video plays after loading
  video.addEventListener('loadeddata', () => {
    video.play();
  }, { once: true });
});

// audio toggle
audioBtn.addEventListener('click', () => {
  if (!audioPlaying) {
    // Ensure audio is loaded before playing
    audio.load();
    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
    });
    audioBtn.textContent = 'Pause Music';
    audioBtn.setAttribute('aria-label', 'Pause background music');
  } else {
    audio.pause();
    audioBtn.textContent = 'Play Music';
    audioBtn.setAttribute('aria-label', 'Play background music');
  }
  audioPlaying = !audioPlaying;
});