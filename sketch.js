
const Engine = Matter.Engine;
const Body = Matter.Body;
const Bodies = Matter.Bodies;
const Composite = Matter.Composite;
const Composites = Matter.Composites; // for chains 
const Constraint = Matter.Constraint;
const Vector = Matter.Vector; 

let engine;
let bridge;
let num = 10;
let rad = 10;
let len = 25;

let handPose;
let video;
let hands = [];
let balls = []; 

function preload() {
    handPose = ml5.handPose({ maxHands: 1, flipped: true });
}

function setup() {
    createCanvas(640, 480);
    engine = Engine.create();
    bridge = new Bridge(num, rad, len);

    video = createCapture(VIDEO, { flipped: true });
    video.size(width, height);
    video.hide();
    handPose.detectStart(video, gotHands);

    stroke(0); strokeWeight(2); 
}

function gotHands(results) {
    hands = results;
    //console.log(hands); 
}

function draw() {
    background(245);
    Engine.update(engine);

    image(video, 0, 0, width, height);
    // display all points 
    for (let i = 0; i < hands.length; i++) {
        let hand = hands[i];
        for (let j = 0; j < hand.keypoints.length; j++) {
            let key = hand.keypoints[j];
            fill(0, 255, 0);
            noStroke();
            //circle(key.x, key.y, 10);
        }
    }
    // get thumb tip and index finger tip
    if (hands.length > 0) {
        let thumb = hands[0].keypoints[4];
        let idx = hands[0].keypoints[8];
        fill(255, 0, 0);
        circle(thumb.x, thumb.y, 10);
        circle(idx.x, idx.y, 10);

        let margin = 50;
        bridge.bodies[0].position.x = thumb.x; //margin;
        bridge.bodies[0].position.y = thumb.y; 
        bridge.bodies[bridge.bodies.length - 1].position.x = idx.x; //width - margin;
        bridge.bodies[bridge.bodies.length - 1].position.y = idx.y; //margin;
        bridge.display();
    }

    // display balls
    if(random() < 0.1) balls.push(new Ball());
        
    for(let i=balls.length-1; i>0; i--){
        balls[i].isDone(); 
        balls[i].display(); 

        if(balls[i].done){
            //balls[i].removeBall(); //maybe you don't need this anymore.
            balls.splice(i, 1);
        }
    }
    console.log(balls.length); 
}
