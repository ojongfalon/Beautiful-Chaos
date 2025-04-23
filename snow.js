const canvas = document.getElementById('snow-canvas');
const ctx = canvas.getContext('2d');

// Resize canvas to fit the window
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas);
resizeCanvas();

// Snowflake particles
const flakes = [];
const maxFlakes = 150;

// Function to create a snowflake
function createFlake() {
  return {
    x: Math.random() * canvas.width, // Random x position
    y: Math.random() * canvas.height, // Random y position
    r: 3 + Math.random() * 5, // Radius (size of the flake)
    d: 1 + Math.random() * 2 // Density (fall speed)
  };
}

// Initialize flakes
for (let i = 0; i < maxFlakes; i++) {
  flakes.push(createFlake());
}

// Draw snowflakes on the canvas
function drawFlakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = 'rgba(255,255,255,0.9)';
  ctx.beginPath();
  flakes.forEach(f => {
    ctx.moveTo(f.x, f.y);
    ctx.arc(f.x, f.y, f.r, 0, Math.PI * 2, true);
  });
  ctx.fill();
  moveFlakes();
}

// Move snowflakes
function moveFlakes() {
  flakes.forEach(f => {
    f.y += f.d; // Move down
    f.x += Math.sin(f.y * 0.01); // Slight horizontal sway
    if (f.y > canvas.height) {
      // Reset flake to the top when it falls off the bottom
      Object.assign(f, createFlake(), { y: -10 });
    }
  });
}

// Animate snowflakes
function animateSnow() {
  drawFlakes();
  requestAnimationFrame(animateSnow);
}
animateSnow();