//BUILDING WEB-BASED DRAWING INSTRUMENTS TEMPLATE
//BY GALO CANIZARES

// ________DECLARE VARIABLES_______

var spot = {
x:50,
y: 50,
};

var tempLineData = {
  x1: 0,
  y1: 0,
  x2: 0,
  y2: 0
}

const maxConnections = 3;
var ptcol = {
	r:255,
	g:255,
	b:255,
};

var ptArray = []
var lineStorage = [];


// ________SETUP CANVAS___________

function setup() {
  createCanvas(600, 600);
  background(0);
}

// ___________DRAW__________
function draw() {
  background(0);
    for(var i = 0; i < lineStorage.length; i++) {
    lineStorage[i].render();
    }
  const lineColor = color(255, 255, 255)

  //mouse pointer
  ellipse(mouseX, mouseY, 20, 20);


  if(ptArray.length < 500)
    {
      var p = new myPoint
      (random (0, width),
       random (0, height),
       random (100, 255), 0,
       random (100, 200));
       ptArray.push(p);
    }

  //console.log(ptArray)

  for (var i = 0; i < ptArray.length; i++){
    var jitter = random(-1, 1);
    ptArray[i].j = jitter;
    ptArray[i].show();
  }

  for (let i = 0; i < ptArray.length - 1; i++) {

        let current = ptArray[i];
        let affected = [];

        for (let j = 0; j < ptArray.length; j++) {
            if (ptArray[j] != current) {
                let distance = dist(ptArray[j].x,ptArray[j].y, mouseX, mouseY );
                if (distance <= 5){
                    affected.push(ptArray[j]);
                }
            }
        }

        for (let a = 0; a < affected.length; a++) {
            stroke(red(lineColor), green(lineColor), blue(lineColor));
            //smooth();
            line(current.x, current.y, affected[a].x, affected[a].y);
        }


    }
}


// ________MAKE POINTS________
function myPoint(x, y, r, g, b, j) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.g = g;
  this.b = b;
  this.j = j;

  this.show = function() {
    noStroke();

	fill (this.r, this.g, this.b, 120);
    ellipse (this.x + this.j, this.y + this.j, 8, 8);
  }
}

// ________MAKE LINES________
function myLine(startX, startY, endX, endY, r, g, b)

{
  this.x1 = startX;
  this.y1 = startY;
  this.x2 = endX;
  this.y2 = endY;
  this.r = r;
  this.g = g;
  this.b = b;

  this.render = function() {
    stroke(this.r, this.g, this.b);
    line(this.x, this.y, this.x , this.y);
  }
}

// While mouse is pressed, make lines between all points that lie in the radius
function mousePressed() {

  tempLineData.x1 = mouseX;
  tempLineData.y1 = mouseY;

  lineStorage.push(new myLine(tempLineData.x1, tempLineData.y1, tempLineData.x2, tempLineData.y2, random(255), random(255), random(255)));
}

function windowResized() {
  resizeCanvas(window.windowWidth, window.windowHeight);
  resetCanvas();
}
