/*
Template for IMA's Creative Coding Lab 

Project A: Generative Creatures
CCLaboratories Biodiversity Atlas 
*/

let y4 = 0;
let x4 = 0;
let destinationY = 100;
let destinationX = 100;
let ranX;
let ranY;
let sinInput = 0;
let speed = 0.005;
let cloudyColor;
let timeWithoutEating = 0;
let isHappy = true;
let angle = 0;
let cloudySize = 1;

function setup() {
  let canvas= createCanvas(800, 500);
 canvas.parent("p5-canvas-container");

  ranX = random(width - 100);
  ranY = random(height);

  cloudyColor = color(255, 255, 255, 30);
}

function draw() {
  // Blue color background
  fill(2, 13, 28);
  noStroke();
  rect(0, 0, 800, 350);

  // Green color background
  fill(37, 79, 1);
  noStroke();
  rect(0, 310, 800);

  drawFlower(200, 400, 10, color(171, 63, 96));
  drawFlower(130, 340, 20, color(105, 120, 120));
  drawFlower(270, 370, 18, color(50, 106, 117));
  drawFlower(400, 340, 12, color(163, 96, 150));
  drawFlower(600, 350, 15, color(155, 100, 100));
  drawFlower(460, 450, 22, color(105, 120, 170));
  drawFlower(330, 470, 11, color(163, 156, 150));
  drawFlower(520, 380, 14, color(77, 156, 75));
  drawFlower(560, 440, 13, color(116, 86, 140));
  drawFlower(365, 410, 19, color(116, 86, 140));
  drawFlower(670, 370, 10, color(92, 89, 171));

  // Bushes
  noStroke();
  fill(0);
  circle(20, 500, 220);
  circle(100, 500, 220);
  circle(0, 420, 220);
  circle(170, 530, 220);
  circle(690, 500, 220);
  circle(800, 420, 220);
  circle(750, 530, 220);

  // Tree trunks
  fill(15, 20, 35);
  rect(10, 0, 37, 310);
  rect(145, 0, 32, 310);
  rect(365, 0, 30, 310);
  rect(695, 0, 22, 310);

  // Back tree trunks
  fill(15, 28, 48);
  rect(50, 0, 25, 310);
  rect(180, 0, 32, 310);
  rect(400, 0, 41, 310);
  rect(515, 0, 23, 310);
  rect(630, 0, 63, 310);

  // Front tree trunks
  fill(48, 18, 4);
  for (let widthT = 30; widthT >= 10; widthT--) {
    rect(100, 0, widthT + 10, 310);
    rect(220, 0, widthT + 35, 310);
    rect(310, 0, widthT + 15, 310);
    rect(450, 0, widthT + 30, 310);
    rect(540, 0, widthT + 30, 310);
    rect(720, 0, widthT + 40, 310);
  }

  // "leaves" of trees (lol)
  fill(4, 51, 4);
  for (let i = 10; i < width; i += 30) {
    circle(i, 10, 50);
  }
  noStroke();
  fill(3, 207, 252, 70);
  let movementX1 = sin(angle) * 10;
  let movementY1 = cos(angle) * 10;
  drawFlame(ranX + movementX1, ranY + movementY1);

  // Blue flame with sin/cos
  noStroke();
  fill(3, 207, 252, 70);
  let movementX = sin(angle) * 10;
  let movementY = cos(angle) * 10;
  circle(ranX + movementX, ranY + movementY, 20);
  circle(ranX + movementX, ranY + movementY, 20);
  circle(ranX + movementX, ranY + movementY, 25);
  circle(ranX + movementX, ranY + movementY, 10);
  angle += 0.02;

  if (dist(x4, y4, ranX, ranY) < 54) {
    ranX = random(width - 100);
    ranY = random(height);
    cloudyColor = color( random(170, 255), random(172,       255), random(175, 255), 30);
    timeWithoutEating = 0;
    isHappy = true;
    
    cloudySize= 1;
  }
  if (dist(x4, y4, ranX, ranY) >= 54) {
    timeWithoutEating++;
  }
  // 60 fps * 7.5 secs= 450 
  if (timeWithoutEating > 450) {
    isHappy = false;
  }
  if (timeWithoutEating > 660) {
    isHappy = false;
     cloudySize -= 0.001;
  }
  if (cloudySize <= 0.3) {
    cloudySize = 0;
  }
  

  // Draw Cloudy
  drawCreature(x4, y4);
}
function drawFlame(x, y) {
  fill(0, 0, 255, 155); //dark blue
  ellipse(x, y - 5, 35, 50);

  fill(0, 142, 256, 181); // sky blue
  ellipse(x, y - 12, 30, 45);

  fill(136, 207, 251, 255); // lightest blue
  ellipse(x, y - 3, 15, 30);
}

function drawFlower(x, y, colorP, flowerColor) {
  fill(flowerColor);
  noStroke();

  // petals
  ellipse(x, y - 15 / 2, 15, 15);
  ellipse(x - 15 / 2, y, 15, 15);
  ellipse(x + 15 / 2, y, 15, 15);
  ellipse(x, y + 15 / 2, 15, 15);

  //  center
  fill(255, 255, 0);
  ellipse(x, y, 15 / 3, 15 / 3);
}

function drawCreature(x, y) {
  push();
  translate(x, y);

  let noiseValue = noise(frameCount * 0.003);
  let x2 = map(noiseValue, 0, 1, -100, 100);

  let noiseValue2 = noise(frameCount * 0.002);
  let y2 = map(noiseValue2, 0, 1, -100, 100);

  // Cloudy's body
  noStroke();
  for (let dia = 60 * cloudySize; dia >= 20 * cloudySize; dia--) {
    fill(cloudyColor, 30);
    circle(x2 - 18, y2, dia);
    circle(x2, y2 - 13, dia);
    circle(x2 + 15, y2, dia);
  }

  // Cloudy's eyes
  fill(0);
  circle(x2 + 15, y2 - 5, 5 * cloudySize);
  circle(x2 - 15, y2 - 5, 5 * cloudySize);
  stroke(0);
  strokeWeight(1 / 2);

  // Cloudy's mouth
  if (isHappy) {
    // Happy mouth
    curve(x2, y2 + 5* cloudySize, x2, y2 + 2* cloudySize, x2 - 10* cloudySize, y2 + 3, x2 + 5, y2 - 20);
    curve(x2, y2 + 5* cloudySize, x2, y2 + 2* cloudySize, x2 + 10* cloudySize, y2 + 3* cloudySize, x2 + 5* cloudySize, y2 - 20* cloudySize);
  } else {
    // Unhappy mouth
    curve(x2, y2 + 6* cloudySize, x2, y2 + 6* cloudySize, x2 - 10* cloudySize, y2 + 9* cloudySize, x2 + 5* cloudySize, y2 + 40* cloudySize);
    curve(x2, y2 + 6* cloudySize, x2, y2 + 6* cloudySize, x2 + 10* cloudySize, y2 + 9* cloudySize, x2 + 5* cloudySize, y2 + 40* cloudySize);
  }

  fill(250, 20);
  noStroke();

  // Cloudy's shadow
  ellipse(x2, y2 + 40, 60 * cloudySize, 20 * cloudySize);
  ellipse(x2, y2 + 40, 70 * cloudySize, 20 * cloudySize);
  ellipse(x2, y2 + 40, 80 * cloudySize, 20 * cloudySize);

  // Cloudy follows mouse movement
  y4 = lerp(y4, destinationY, 0.01);
  x4 = lerp(x4, destinationX, 0.01);

  if (mouseIsPressed == true) {
    destinationY = mouseY;
    destinationX = mouseX;
  }

  pop();
}