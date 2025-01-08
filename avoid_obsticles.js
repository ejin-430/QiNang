// Get the canvas
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Load hero and rock images
const hero = new Image();
hero.src = './hero.png';  // Replace with your hero image path
const rockImage = new Image();
rockImage.src = './rock.png';  // Replace with your rock image path

// Initial values
let x = 100;
let y = 100;
let rocks = [];
let startTime = Date.now();
let gameOver = false;
const heroSize = 50;
const speed = 5;

// Track if the text box is showing
let showTextBox = true;

// Draw background
function drawBackground() {
    ctx.fillStyle = '#87CEEB';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

// Draw text box
function drawTextBox() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
    ctx.fillRect(50, 450, 700, 100);
    ctx.fillStyle = 'white';
    ctx.font = '20px Arial';
ctx.fillText('Avoid QiNang\'s! Use arrow keys to move, press space to continue', 60, 500);
}

// Create a rock with random position and size
function createRock() {
    const size = Math.random() * 30 + 20;
    const x = Math.random() * (canvas.width - size);
    rocks.push({ x: x, y: 0, size: size, speed: Math.random() * 2 + 2 });
}

// Draw rocks using the rock image
function drawRocks() {
    rocks.forEach(rock => {
        ctx.drawImage(rockImage, rock.x, rock.y, rock.size, rock.size);
    });
}

// Update rock positions and remove those off-screen
function updateRocks() {
    rocks.forEach(rock => {
        rock.y += rock.speed;
    });
    rocks = rocks.filter(rock => rock.y < canvas.height);
}

// Check for collisions between the hero and rocks
function checkCollisions() {
    for (let rock of rocks) {
        if (x < rock.x + rock.size && x + heroSize > rock.x &&
            y < rock.y + rock.size && y + heroSize > rock.y) {
            gameOver = true;
            alert('You lose! The QiNang hit you.');
            return;
        }
    }
}

// Check if the player survives for 60 seconds
function checkWinCondition() {
    const elapsed = (Date.now() - startTime) / 1000;
    if (elapsed >= 60) {
        gameOver = true;
        alert('You win! You survived for 1 minute.');
    }
}

// Handle key events for movement and hiding text box
window.addEventListener('keydown', (event) => {
    if (event.key === ' ') {
        showTextBox = false;
    }
    if (!showTextBox) {
        if (event.key === 'ArrowUp') y -= speed;
        if (event.key === 'ArrowDown') y += speed;
        if (event.key === 'ArrowLeft') x -= speed;
        if (event.key === 'ArrowRight') x += speed;
    }
});

// Main game loop
function gameLoop() {
    if (gameOver) return;
    
    drawBackground();
    if (showTextBox) {
        drawTextBox();
    } else {
        ctx.drawImage(hero, x, y, heroSize, heroSize);
        updateRocks();
        drawRocks();
        checkCollisions();
        checkWinCondition();
    }
    requestAnimationFrame(gameLoop);
}

// Start the game after images load
hero.onload = () => {
    rockImage.onload = () => {
        gameLoop();
    };
};

// Create new rocks every 2 seconds
setInterval(createRock, 2000);
