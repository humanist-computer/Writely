var NUMBER_OF_LAYERS = 7;
var MAX_SQ_SIZE = 10;
var MIN_SQ_SIZE = 40;
var squares;
var winW, winH;
var lastMouse, lastOrientation;
var animationId;

function init() {
    lastOrientation = {};
    window.addEventListener('resize', doLayout, false);
    document.body.addEventListener('mousemove', onMouseMove, false);
    if ('webkitRequestFullScreen' in document.body) {
        document.addEventListener('webkitfullscreenchange', onFullscreenChange, false);
    } else {
        id('fullscreenButton').style.display = 'none';
    }
    if ('ondeviceorientation' in window) {
        window.addEventListener('deviceorientation', deviceOrientationTest, false);
    }
    lastMouse = null;
    doLayout(document);
}

// Does the gyroscope or accelerometer actually work?
function deviceOrientationTest(event) {
    window.removeEventListener('deviceorientation', deviceOrientationTest);
    if (event.beta != null && event.gamma != null) {
        window.addEventListener('deviceorientation', onDeviceOrientationChange, false);
        animationId = setInterval(onRenderUpdate, 10); 
    }
}

function doLayout(event) {
    winW = window.innerWidth;
    winH = window.innerHeight;
    var surface = id('surface');
    surface.width = winW;
    surface.height = winH;
    squares = new Array(); 
    var alphaStep = (.9 / NUMBER_OF_LAYERS);
    for (var i = 0; i < NUMBER_OF_LAYERS; ++i) {
        squares.push(new Array());
        var alpha = (i * alphaStep) + .1;
        for (var j = 0; j <= ((NUMBER_OF_LAYERS - 1) - i); ++j) {
            var size = getRandomWholeNumber(winW/MIN_SQ_SIZE, winW/MAX_SQ_SIZE);
            var sq = {size:size,
                      x:getRandomWholeNumber(0, winW-size),
                      y:getRandomWholeNumber(0, winH-size),
                      color:'rgba(91, 192, 222, '+ alpha +')'};
            squares[i][j] = sq;
        }
    }
    renderSquares();
}

function renderSquares() {
    var surface = id('surface');
    var context = surface.getContext('2d');
    context.clearRect(0, 0, surface.width, surface.height);

    // Cool, but too expensive
    /*
    context.shadowOffsetX = 5;
    context.shadowOffsetY = 5;
    context.shadowBlur = 10;
    context.shadowColor = '#000';
    */

    var iMax = squares.length;
    for (var i = 0; i < iMax; ++i) {
        var jMax = squares[i].length;
        for (var j = 0; j < jMax; ++j) {
            var sq = squares[i][j];
            context.fillStyle = sq.color;
            //context.fillRect(sq.x, sq.y, sq.size, sq.size);
          
          
          
          
          //context.fillStyle = '#f00';
          context.beginPath();
          context.moveTo(0 + sq.x, 0 + sq.y);
          context.lineTo(100 + sq.x, 0 + sq.y);
          context.lineTo(130 + sq.x, 30 + sq.y);
          context.lineTo(130 + sq.x, 175 + sq.y);
          context.lineTo(0 + sq.x, 175 + sq.y);
          context.closePath();
          context.fill();
        }
    }
}

function onMouseMove(event) {
    var xDelta, yDelta;
    if (navigator.webkitPointer && navigator.webkitPointer.isLocked) {
        xDelta = event.webkitMovementX;
        yDelta = event.webkitMovementY;
    } else {
        if (lastMouse == null) lastMouse = {x:event.clientX, y:event.clientY};
        xDelta = event.clientX - lastMouse.x;
        yDelta = event.clientY - lastMouse.y;
    }
    moveSquares(xDelta, yDelta);
    lastMouse.x = event.clientX;
    lastMouse.y = event.clientY;
}

function moveSquares(xDelta, yDelta) {
    var iMax = squares.length;
    for (var i = 0; i < iMax; ++i) {
        var jMax = squares[i].length;
        for (var j = 0; j < jMax; ++j) {
            var sq = squares[i][j];
            sq.x += (xDelta / (iMax - (i)));
            sq.y += (yDelta / (iMax - (i)));
        }
    }
    renderSquares();
}

function onDeviceOrientationChange(event) {
    lastOrientation.gamma = event.gamma;
    lastOrientation.beta = event.beta;
}

function onRenderUpdate(event) {
    var xDelta, yDelta;
    switch (window.orientation) {
        case 0:
            xDelta = lastOrientation.gamma;
            yDelta = lastOrientation.beta;
            break;
        case 180:
            xDelta = lastOrientation.gamma * -1;
            yDelta = lastOrientation.beta * -1;
            break;
        case 90:
            xDelta = lastOrientation.beta;
            yDelta = lastOrientation.gamma * -1;
            break;
        case -90:
            xDelta = lastOrientation.beta * -1;
            yDelta = lastOrientation.gamma;
            break;
        default:
            xDelta = lastOrientation.gamma;
            yDelta = lastOrientation.beta;
    }
    moveSquares(xDelta, yDelta);
}

function onFullscreen(event) {
    document.body.webkitRequestFullScreen();
}

function onFullscreenChange(event) {
    if (document.webkitIsFullScreen) {
        id('fullscreenButton').style.display = 'none';
        if (navigator.webkitPointer) navigator.webkitPointer.lock(document.body);
    } else {
        if (navigator.webkitPointer) navigator.webkitPointer.unlock();
        id('fullscreenButton').style.display = 'block';
    }
}

function id(name) { return document.getElementById(name); };
function getRandomWholeNumber(min, max) { return Math.round(((Math.random() * (max - min)) + min)); };
function getRandomHex() { return (Math.round(Math.random() * 0xFFFFFF)).toString(16); };

window.onload = init;