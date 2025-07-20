const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const bird = new Image();
const pipeNorth = new Image();
const pipeSouth = new Image();
const bg = new Image();

bird.src = 'bird.png';
pipeNorth.src = 'pipe.png';
pipeSouth.src = 'pipe.png';
bg.src = 'background.png';

const gap = 120;
let constant;

let birdX = 50;
let birdY = 150;

let gravity = 1.5;
let lift = -25;
let velocity = 0;

let pipes = [];

let score = 0;

pipes[0] = {
  x: canvas.width,
  y: Math.floor(Math.random() * (-pipeNorth.height)) + 1
};

// **यहाँ ध्यान दें — दो event listeners add करें जो jump कराएंगे:**

document.addEventListener('keydown', function(event) {
  // स्पेस या ऊपर की एरो दबाने पर jump होगा
  if(event.code === 'Space' || event.code === 'ArrowUp') {
    velocity = lift;
  }
});

document.addEventListener('touchstart', function() {
  velocity = lift;
});

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.drawImage(bg, 0, 0, canvas.width, canvas.height);

  for (let i = 0; i < pipes.length; i++) {
    constant = pipeNorth.height + gap;
    ctx.drawImage(pipeNorth, pipes[i].x, pipes[i].y);
    ctx.drawImage(pipeSouth, pipes[i].x, pipes[i].y + constant);

    pipes[i].x--;

    if (pipes[i].x === 150) {
      pipes.push({
        x: canvas.width,
        y: Math.floor(Math.random() * (-pipeNorth.height)) + 1
      });
    }

    // Collision detection
    if (
      birdX + bird.width >= pipes[i].x &&
      birdX <= pipes[i].x + pipeNorth.width &&
      (birdY <= pipes[i].y + pipeNorth.height ||
        birdY + bird.height >= pipes[i].y + constant)
    ) {
      location.reload(); // Game over, reload page
    }

    if (pipes[i].x + pipeNorth.width === birdX) {
      score++;
    }
  }

  ctx.drawImage(bird, birdX, birdY);

  velocity += gravity;
  birdY += velocity;

  if (birdY + bird.height >= canvas.height || birdY <= 0) {
    location.reload(); // Game over
  }

  ctx.fillStyle = '#fff';
  ctx.font = '20px Arial';
  ctx.fillText('Score: ' + score, 10, canvas.height - 20);

  requestAnimationFrame(draw);
}

draw();
