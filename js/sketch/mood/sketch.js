/* ###########################################################################
Server
############################################################################ */
//let host = '116.203.89.215:7001/?display';
//let socket; // the websocket
//let sensorValues = []; // the sensor value
//let tempVector = [];
//let stepX = 10;

/* ###########################################################################
Globals
############################################################################ */
let particle, particleAmount;
let particles = [];
let hueValue = 330;
let saturationValue = 100;
let brightnessValue = 30;
let alphaValue = 1;
let particleSpeed = 3;
let connectionDistance = 145;

/* ###########################################################################
Gui
############################################################################ */
var gui;

let guiParams = {
    minerals: 100,
    mineralsMin: 0,
    mineralsMax: 100,
    wetness: 1,
    wetnessMin: 0,
    wetnessMax: 1,
    wetnessStep: 1
};


/* ###########################################################################
P5 Functions
############################################################################ */


function setup() {
    let canvas = createCanvas(displayWidth, displayHeight);
    /*
    gui = createGui('Simulated Values:');
    gui.setPosition(10, height-250);
    gui.addObject(guiParams);
    */
    //canvas.position(0,0);
    particleAmount = displayWidth / 15;
    canvas.parent("canvas");

    // Display & Render Options
    colorMode(HSB, 360, 100, 100, 1);
    angleMode(DEGREES);
    smooth();

    /* Client Stuff
     connect to server:
    socket = new WebSocket('ws://' + host);
     socket connection listener:
    socket.onopen = sendIntro;
     socket message listener:
    socket.onmessage = readMessage;

    for (let i = 0; i < 4; i++) {
        sensorValues[i] = 0;
        tempVector[i] = new CircularArray(width / stepX);
    }*/

    // Anything else
    background(0);
    noStroke();
    initializeParticles();
}

function draw() {
    particleSpeed = guiParams.minerals * 0.04;

    background(getColor({brightness: 0, alpha: 0.05}));
    for (let i = 0; i < particleAmount; i++) {
        if (particles[i] !== null) {
            particles[i].movement();
            particles[i].movement();
        }
    }

    checkParticleToParticleConnections();
    //checkMouseToParticleConnections();

    //for (let i = 0; i < 4; i++) {
    //    for (let x = 0; x < tempVector[i].length - 1; x++) {
            //console.log("Temp Vektor:" + tempVector[i][x]);
    //    }
    //}
}

function mouseClicked() {
    //sendIntro();
    //console.log("Intro sent");
}

/* ###########################################################################
Custom Functions
############################################################################ */

function initializeParticles() {
    particles = [];
    for (let i = 0; i < particleAmount; i++) {
        particles[i] = new Particle(random(0, displayWidth), random(0, displayHeight));
    }
}

function checkParticleToParticleConnections() {
    for (let i = 0; i < particleAmount; i++) {
        for (let j = 1; j < particleAmount; j++) {
            if (dist(particles[i].x, particles[i].y, particles[j].x, particles[j].y) < connectionDistance) {
                stroke(getColor());
                strokeWeight(1);
                line(particles[i].x, particles[i].y, particles[j].x, particles[j].y);
            }
        }
    }
}

function checkMouseToParticleConnections() {
    for (let i = 0; i < particleAmount; i++) {
        if (dist(particles[i].x, particles[i].y, mouseX, mouseY) < connectionDistance + connectionDistance / 5) {
            stroke(getColor());
            strokeWeight(1);
            line(particles[i].x, particles[i].y, mouseX, mouseY);
        }
    }
}

function gradientLine(startX, startY, endX, endY) {
    strokeWeight(1);
    stroke(getColor());
    beginShape(LINES);
    let lineLength = dist(startX, startY, endX, endY);
    let cosAlpha = abs(startX - endX) / lineLength;
    let sinAlpha = abs(startY - endY) / lineLength;
    for (let i = 0; i < lineLength; i++) {
        let brightnessStep = map(i, 0, lineLength, 0, 50);
        stroke(getColor({brightness: safeHSBAShift("brightness", 100, brightnessStep * -1)}));
        line(startX, startY, startX + cosAlpha, startY + sinAlpha);
        startX = startX + cosAlpha;
        startY = startY + sinAlpha;
    }
}

/** ###########################################################################
Custom Client Functions
############################################################################

function sendIntro() {
    // convert the message object to a string and send it:
    socket.send("Hallo");
}

function readMessage(event) {
    var msg = event.data; // read data from the onmessage event
    //console.log(msg);
    elements = splitTokens(msg, ",");
    for (var i = 0; i < elements.length; i++) {
        sensorValues[i] = 1 * (float)(elements[i]);
        if (i == 0)
            tempVector[i].push(map(sensorValues[i], 0, 40, 0, height));
        if (i == 1)
            tempVector[i].push(map(sensorValues[i], 0, 100, 0, height));
        if (i == 2)
            tempVector[i].push(map(sensorValues[i], 0, 4095, 0, height));
        if (i == 3)
            tempVector[i].push(map(sensorValues[i], 0, 100, 0, height));
    }
    //console.log(elements.length);
    //console.log(elements);
}

function CircularArray(maxLength) {
    this.maxLength = maxLength;
}

CircularArray.prototype = Object.create(Array.prototype);

CircularArray.prototype.push = function (element) {
    Array.prototype.push.call(this, element);
    while (this.length > this.maxLength) {
        this.shift();
    }
}**/