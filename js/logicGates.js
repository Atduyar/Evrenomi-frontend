let and, or;
function preload() {
    and = loadImage('/assets/and.png');
}
let activeWire;
let passiveWire;
 
let mouse;
let ww;
let rootG = [];
function setup() { 
    activeWire = color(100,255,0);
    passiveWire = color(255);
    mouse = new Node(mouseX,mouseY);
  
    createCanvas(windowWidth, windowHeight);
    rootG.push(new And(100,100));
    rootG.push(new And(200,200));
    ww = new Wire(rootG[0].out1,rootG[1].in1);
} 

function draw() {
    background(255);
    mouse.move(mouseX,mouseY);
  
    ww.draw();
    for(var i = 0;i<rootG.length;i++){
        rootG[i].draw();
    }
    //rootG[1].move(mouseX,mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Node{
	constructor(x,y,r,h=true){
    	this.x=x;
        this.y=y;
        this.r=r;
        this.h=h;//horizontal
    }
    move(x,y){
    	this.x=x;
        this.y=y;
    }
    draw(){
        strokeWeight(1);
        fill(255)//beyaz iç
        stroke(0);//siyah dıs
        circle(this.x, this.y, this.r);
    }
}

class Gate{
	constructor(x,y,p=0){
    	this.x=x;
        this.y=y;
        this.p=p;// 0→  1↓  2←  3↑
        this.h=(p%2==0);// horizontal
    }
    move(x,y){
        throw new Error("Gate implemense edilmemis");
    }
    draw(){
        throw new Error("Gate implemense edilmemis");
    }
}

class And extends Gate{
	constructor(x,y,p=0){
        super(x,y,p);
        this.in1 = new Node(x-25,y+8,10,super.h);
        this.in2 = new Node(x-25,y-8,10,super.h);
        this.out1 = new Node(x+25,y,10,super.h);
    }
    move(x,y){
        this.x = x;
        this.y = y;
        this.in1.move(x-25,y+8);
        this.in2.move(x-25,y-8);
        this.out1.move(x+25,y);
    }
    draw(){
        image(and, this.x-25, this.y-25, 50, 50);
        this.in1.draw();
        this.in2.draw();
        this.out1.draw();
    }
}






class Wire{
	constructor(from,to){
    	this.from=from;
        this.to=to;
        this.status=0;// 0 = normal  1 = aktif
        this.rendered=false;// 0 = normal  1 = aktif
        this.color=passiveWire;
    }
    draw(){
        drawWire(this.color,this.from.x, this.from.y, this.to.x, this.to.y, this.from.h, this.to.h, true);
    }
}

function drawWire(c,x1,y1,x2,y2,h1=true,h2=true,re=true){
    h = x1 - x2;
    w = y1 - y2;
    noFill();
    if(re){
        strokeWeight(5);
        stroke(0, 0, 0);
    }
    else{
        strokeWeight(3);
        stroke(c);
    }
    beginShape();
    if(h1){
        curveVertex(x1+h, y1-w);
    }
    else{
        curveVertex(x1-h, y1+w);
    }
    curveVertex(x1, y1);
    
    curveVertex(x2, y2);
    if(h2){
        curveVertex(x2-h, y2+w);
    }
    else{
        curveVertex(x2+h, y2-w);
    }
    endShape();
    
    if(re){
        drawWire(c,x1,y1,x2,y2,h1,h2,false);
    }
}