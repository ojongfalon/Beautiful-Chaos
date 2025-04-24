// Elements
const body = document.body;
const video = document.getElementById('bgVideo');
const source = document.getElementById('bgSource');
const themeBtn = document.getElementById('toggle-theme');
const audio = document.getElementById('bgAudio'); // Reference the audio element
const audioBtn = document.getElementById('toggle-audio');


let isDay = false;

// Theme Toggle
themeBtn.addEventListener('click', () => {
  isDay = !isDay;
  body.classList.toggle('day-mode', isDay);

  // Swap video source
  source.src = isDay ? 'video/day.mp4' : 'video/background.mp4';
  video.load();
  video.play().catch((err) => {
    console.error('Video playback failed:', err);
  });

  // Play or pause audio based on theme
  if (isDay) {
    audio.pause(); // Pause audio during the day
  } else {
    audio.play().catch((err) => {
      console.error('Audio playback failed:', err);
    });
  }
});

// Optional: Add audio toggle button functionality (if needed)
if (audioBtn) {
  let isAudioPlaying = false;

  audioBtn.addEventListener('click', () => {
    if (isAudioPlaying) {
      audio.pause();
      audioBtn.textContent = 'Play Music';
    } else {
      audio.play().catch((err) => {
        console.error('Audio playback failed:', err);
      });
      audioBtn.textContent = 'Pause Music';
    }
    isAudioPlaying = !isAudioPlaying;
  });
}