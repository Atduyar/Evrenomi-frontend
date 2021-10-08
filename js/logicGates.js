let and, or;
function preload() {
    and = loadImage('assets/and.png');
}

function setup() { 
    createCanvas(windowWidth, windowHeight);
} 

function draw() {
    if (mouseIsPressed) {
        fill(0);
    } else {
        fill(255);
    }
    ellipse(mouseX, mouseY, 80, 80);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}