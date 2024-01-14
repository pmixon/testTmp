const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let ballX = canvas.width / 2;
let ballY = canvas.height / 2;
const ballRadius = 20;

const blueBalls = [];

let startTime;
let elapsedTime = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

function drawBall() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw red ball
    ctx.beginPath();
    ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2, false);
    ctx.fillStyle = 'red';
    ctx.fill();

    // Draw blue balls
    ctx.fillStyle = 'blue';
    for (const blueBall of blueBalls) {
        ctx.beginPath();
        ctx.arc(blueBall.x, blueBall.y, blueBall.radius, 0, Math.PI * 2, false);
        ctx.fill();
    }
}

function drawTimer() {
  ctx.font = '24px Arial';
  ctx.fillStyle = 'black';
  ctx.textAlign = 'center';
  ctx.fillText(`Time: ${elapsedTime.toFixed(2)}s`, canvas.width / 2, 20);
}

function drawWinMessage() {
  ctx.font = '60px Arial';
  ctx.fillStyle = 'green';
  ctx.textAlign = 'center';
  ctx.fillText('YOU WIN!', canvas.width / 2, canvas.height / 2);
}

// Generate blue balls at random positions
for (let i = 0; i < 10; i++) {
    blueBalls.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: 10,
    });
}

function distance(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y2 - y1, 2));
}

drawBall();
drawTimer();

window.addEventListener('keydown', function(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            ballX -= 5;
            break;
        case 38: // Up arrow
            ballY -= 5;
            break;
        case 39: // Right arrow
            ballX += 5;
            break;
        case 40: // Down arrow
            ballY += 5;
            break;
    }

    if (!startTime && event.keyCode >= 37 && event.keyCode <= 40) {
      startTime = performance.now();
    }

    // Check for collisions and update timer
    for (let i = 0; i < blueBalls.length; i++) {
        const blueBall = blueBalls[i];
        if (distance(ballX, ballY, blueBall.x, blueBall.y) < ballRadius + blueBall.radius) {
            blueBalls.splice(i, 1);
            blueBall.x = canvas.width + blueBall.radius; // move off-screen
        }
    }

// Sources:
// 1. https://medium.com/samsung-internet-dev/making-an-ar-game-with-aframe-529e03ae90cb