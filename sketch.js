const fills =["#e5007d", "#27214d", "#00a7b5", "#d95702", "#d42450"];

let nextFill = 0;
let lastID = 1;

let shapes = [];
let points = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
}

function draw() {
  background(94,78,156);

  drawShapes();
  drawTrail();
}

function mouseClicked() {
  shapes.push({
    id: lastID,
    x: mouseX,
    y: mouseY,
    opacity: 250,
    size: 24,
    fill: fills[nextFill]
  });

  nextFill++;
  if (nextFill >= fills.length) { nextFill = 0; }
  lastID++;
}

function drawShapes() {
  shapes.forEach(function(shape, i) {
    noStroke();
    let thisColor = color(shape.fill);
    thisColor.setAlpha(shape.opacity);
    fill(thisColor);

    if (shape.id % 7 == 0) {
      triangle(shape.x, shape.y, shape.x+shape.size, shape.y-shape.size, shape.x+shape.size, shape.y);
    } else if (shape.id % 13 == 0) {
      rect(shape.x, shape.y, shape.size, shape.size, 20);
    } else {
      circle(shape.x, shape.y, shape.size);
    }

    shape.size++;

    if (shape.size > 100) {
      shape.opacity--;
    }

    if(shape.opacity < 0) {
      shapes.splice(i, 1);
    }

  });
}

function drawTrail() {
  strokeWeight(4);
  stroke("#c6e4e4");
  points.forEach(function(pt, i) {
    if (i == 0) {
      line(mouseX, mouseY, pt[0], pt[1]);
    } else {
      const lastPoint = points[i-1];
      line(pt[0], pt[1], lastPoint[0], lastPoint[1]);
    }
  });

  points.unshift([mouseX, mouseY]);
  points.splice(10);
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
