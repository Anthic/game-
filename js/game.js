const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Define constants for the game
const boxSize = 20; // Size of each snake segment and food box
const canvasSize = 400; // Canvas width and height
let direction = "RIGHT"; // Initial direction

// Initial snake body (array of segments)
let snake = [{ x: 200, y: 200 }];
let food = { x: 0, y: 0 };
let score = 0;

// Place food randomly
function spawnFood() {
  food.x = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
  food.y = Math.floor(Math.random() * (canvasSize / boxSize)) * boxSize;
}

spawnFood();

document.addEventListener("keydown", changeDirection);

function changeDirection(event) {
  const keyPressed = event.keyCode;

  if (keyPressed === 37 && direction !== "RIGHT") direction = "LEFT";
  else if (keyPressed === 38 && direction !== "DOWN") direction = "UP";
  else if (keyPressed === 39 && direction !== "LEFT") direction = "RIGHT";
  else if (keyPressed === 40 && direction !== "UP") direction = "DOWN";
}

function update() {
  // Get the head position
  const head = { x: snake[0].x, y: snake[0].y };

  // Move the snake in the current direction
  if (direction === "LEFT") head.x -= boxSize;
  if (direction === "UP") head.y -= boxSize;
  if (direction === "RIGHT") head.x += boxSize;
  if (direction === "DOWN") head.y += boxSize;

  // Check for wall collisions
  if (
    head.x < 0 ||
    head.x >= canvasSize ||
    head.y < 0 ||
    head.y >= canvasSize ||
    checkCollision(head)
  ) {
    alert(`Game Over! Your score: ${score}`);
    document.location.reload();
  }

  // Check if the snake has eaten the food
  if (head.x === food.x && head.y === food.y) {
    score++;
    spawnFood(); // Spawn new food
  } else {
    snake.pop(); // Remove the last segment if no food was eaten
  }

  // Add new head position
  snake.unshift(head);
}
function draw() {
  // Clear the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Draw the snake
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, boxSize, boxSize);
  });

  // Draw the food
  ctx.fillStyle = "red";
  ctx.fillRect(food.x, food.y, boxSize, boxSize);

  // Display the score
  ctx.fillStyle = "#000";
  ctx.font = "20px Arial";
  ctx.fillText("Score: " + score, 10, canvas.height - 10);
}

function checkCollision(head) {
  // Check if the snake head collides with any body segment
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      return true;
    }
  }
  return false;
}
function gameLoop() {
  update();
  draw();
}

setInterval(gameLoop, 100); // Run the game every 100 milliseconds
