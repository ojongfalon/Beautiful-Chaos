// Elements
const body = document.body;
const video = document.getElementById('bgVideo'); // Reference the video element
const source = document.getElementById('bgSource');
const themeBtn = document.getElementById('toggle-theme');
const audioBtn = document.getElementById('toggle-audio');
const audio = document.getElementById('bgAudio'); // Reference the audio element
const poemContainer = document.getElementById('poem-container');

let isDay = false;
let isAudioPlaying = false;

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

  // Apply transition effect to the poem
  console.log('Hiding poem...')
  poemContainer.classList.remove('visible'); // Hide the poem
  
  // Wait for video to be ready before showing poem again
  video.oncanplay = () => {
    console.log('showing poem...')
    setTimeout(() => {
      poemContainer.classList.add('visible');
    }, 300); // Short delay for better visual transition
  };
});

// Audio Toggle
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

// Video Playback
video.addEventListener('loadedmetadata', () => {
  video.play().catch((err) => {
    console.error('Video playback failed:', err);
  });
});

// Make sure poem animates in on page load
document.addEventListener('DOMContentLoaded', () => {
  // Small delay to ensure everything is ready
  setTimeout(() => {
    poemContainer.classList.add('visible');
  }, 500);
});