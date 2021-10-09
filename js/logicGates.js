
// 0→  1↓  2←  3↑
const Direct = Object.freeze({
    "Right" : 0,
    "Down" : 1,
    "Left" : 2,
    "Up" : 3,
    "Horizontal" : 4,
    "Vertical" : 5,
    "Orijn" : 6,
    "flip" : (x)=>{
        switch(x){
            case 0:
                return 2;
            case 1:
                return 3;
            case 2:
                return 0;
            case 3:
                return 1;
            default:
                return x;
        }
    }
});

let mouse;
let and, or;
function preload() {
    and = loadImage('/assets/and.png');
}
let activeWire;
let passiveWire;
 
let rootG = [];
let rootW = [];
function setup() { 

    activeWire = color(100,255,0);
    passiveWire = color(255);
  
    createCanvas(windowWidth, windowHeight);
    rootG.push(new And(100,100));
    rootG.push(new And(200,200));
    rootG.push(new And(300,300));
    //rootW.push(new Wire(rootG[0].out1,rootG[1].in1));
  
    mouse = {
        node : new Node(mouseX,mouseY),
        status : 0,
        grap : null,
        temp : false,
        update : ()=>{
            mouse.node.move(mouseX,mouseY);
            if(mouse.status == 1){
                mouse.grap.move(mouse.node.x, mouse.node.y);
                if(!mouseIsPressed){
                    mouse.status = 0;
                }
            }
            else if(mouse.status == 2){
                rootW.push(new Wire(mouse.grap, mouse.node));
                mouse.status = 3;
            }
            else if(mouse.status == 4){
                rootW[rootW.length-1].to = mouse.grap;
                mouse.node.to = null;
                mouse.node.from = null;
                mouse.status = 5;
            }
            else if(mouse.status == 5){
                if(!mouseIsPressed){
                    mouse.status = 0;
                }
            }
        }
    }
} 

function draw() {
    background(255);
    mouse.update();
  
    for(var i = 0;i<rootW.length;i++){
        rootW[i].draw();
    }
  
    for(var i = 0;i<rootG.length;i++){
        rootG[i].draw();
    }
    for(var i = 0;i<rootG.length;i++){
        if(rootG[i].collision(mouseX,mouseY)){
            break;
        }
    }
  
    //drawMenu();
    //rootG[1].move(mouseX,mouseY);
}

function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}

class Node{
	constructor(x,y,r,p=Direct.Orijn){
    	this.x=x;
        this.y=y;
        this.r=r;
        this.p=p;//horizontal
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
    collision(x, y){
        if(pointCircle(x,y,this.x,this.y,this.r) && mouseIsPressed){
            if(mouse.grap != this && mouse.status == 3){
                mouse.grap = this;
                mouse.status = 4;
                return true;
            }
            else if(mouse.status == 0){
                mouse.grap = this;
                mouse.status = 2;
                return true;
            }
            return false;
        }
        return false;
    }
}

class Gate{
	constructor(x,y,p=0){
    	this.x=x;
        this.y=y;
        this.p=p;// 0→  1↓  2←  3↑
    }
    move(x,y){
        throw new Error("Gate implemense edilmemis");
    }
    draw(){
        throw new Error("Gate implemense edilmemis");
    }
    collision(x,y){
        throw new Error("Gate implemense edilmemis");
    }
}

class And extends Gate{
	constructor(x,y,p=0){
        super(x,y,p);
        this.in1 = new Node(x-25,  y+8,10, Direct.flip(this.p));
        this.in2 = new Node(x-25,  y-8,10, Direct.flip(this.p));
        this.out1 = new Node(x+25, y,10,   this.p);
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
        //rect(this.x-25, this.y-25, 50, 50);
    }
    collision(x, y){
        if(this.in1.collision(x,y)){
            return true;
        }
        else if(this.in2.collision(x,y)){
            return true;
        }
        else if(this.out1.collision(x,y)){
            return true;
        }
        else if(mouse.status == 0){
            if(x > this.x-25 && x < this.x-25 + 50 &&
               y > this.y-25 && y < this.y-25 + 50 &&
              mouseIsPressed){
                mouse.grap = this;
                mouse.status = 1;
                return true;
            }
        }
        return false;
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
        drawWire(this.color,this.from.x, this.from.y, this.to.x, this.to.y, this.from.p, this.to.p, true);
    }
}

function drawWire(c,x1,y1,x2,y2,h1=0,h2=0,re=true){
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
    switch(h1) {
        case 0:
            curveVertex(x1-(abs(h)*2+150), y1+w);
            break;
        case 1:
            curveVertex(x1+h, y1-(abs(w)*2+150));
            break;
        case 2:
            curveVertex(x1+(abs(h)*2+150), y1+w);
            break;
        case 3:
            curveVertex(x1+h, y1+(abs(w)*2+150));
            break;
        case 4://horizontal
            curveVertex(x1-h, y1+w);
            break;
        case 5://vertical
            curveVertex(x1+h, y1-w);
            break;
        case 6://vertical
            curveVertex(x1, y1);
            break;
    }
    
    curveVertex(x1, y1);
    curveVertex(x2, y2);

    switch(h2) {
        case 0:
            curveVertex(x2-(abs(h)*2+150), y2+w);
            break;
        case 1:
            curveVertex(x2+h, y2-(abs(w)*2+150));
            break;
        case 2:
            curveVertex(x2+(abs(h)*2+150), y2+w);
            break;
        case 3:
            curveVertex(x2+h, y2+(abs(w)*2+150));
            break;
        case 4://horizontal
            curveVertex(x2-h, y2+w);
            break;
        case 5://vertical
            curveVertex(x2+h, y2-w);
            break;
        case 6://orijn
            curveVertex(x2, y2);
            break;
    }

    endShape();
    if(re){
        drawWire(c,x1,y1,x2,y2,h1,h2,false);
    }
}

// function drawWire(c,x1,y1,x2,y2,h1=true,h2=true,re=true){
//     h = x1 - x2;
//     w = y1 - y2;
//     noFill();    
//     if(re){
//         strokeWeight(5);
//         stroke(0, 0, 0);
//     }
//     else{
//         strokeWeight(3);
//         stroke(c);
//     }
//     beginShape();
//     if(h1){
//         curveVertex(x1+h, y1-w);
//     }
//     else{
//         curveVertex(x1-h, y1+w);
//     }
//     curveVertex(x1, y1);
    
//     curveVertex(x2, y2);
//     if(h2){
//         curveVertex(x2-h, y2+w);
//     }
//     else{
//         curveVertex(x2+h, y2-w);
//     }
//     endShape();
    
//     if(re){
//         drawWire(c,x1,y1,x2,y2,h1,h2,false);
//     }
// }

function pointCircle(px, py, cx, cy, r){
    var distX = px - cx;
    var distY = py - cy;
    var distance = sqrt( (distX*distX) + (distY*distY) );
    if (distance <= r) {
        return true;
    }
    return false;
}