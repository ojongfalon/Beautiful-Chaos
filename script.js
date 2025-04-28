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

// Enhanced video loading function
const loadAndPlayVideo = async () => {
  try {
    // Force video reload
    video.load();
    
    // Wait for video to be ready
    await new Promise((resolve, reject) => {
      video.oncanplay = resolve;
      video.onerror = reject;
    });
    
    // Attempt to play
    const playPromise = video.play();
    if (playPromise !== undefined) {
      await playPromise;
    }
  } catch (err) {
    console.error('Video playback failed:', err);
    // Fallback: Try playing without user interaction
    video.play().catch(e => console.error('Fallback playback failed:', e));
  }
};

// Theme Toggle
themeBtn.addEventListener('click', () => {
  isDay = !isDay;
  body.classList.toggle('day-mode', isDay);

  // Swap video source
  source.src = isDay ? 'video/day.mp4' : 'video/background.mp4';
  loadAndPlayVideo();

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

// Initial video load
document.addEventListener('DOMContentLoaded', () => {
  loadAndPlayVideo();
  
  // Make sure poem animates in
  setTimeout(() => {
    poemContainer.classList.add('visible');
  }, 500);
});

// Handle page visibility changes
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    video.pause();
  } else {
    loadAndPlayVideo();
  }
});