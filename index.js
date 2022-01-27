var canvas = document.createElement("canvas");
var ctx = canvas.getContext("2d");
canvas.width = window.innerWidth * 1;
canvas.height = window.innerHeight * 1;
document.body.appendChild(canvas);
colind = randInt(3);

function randInt(max) {
    return Math.floor(Math.random() * max);
}

function degToRad(degrees) {
    var pi = Math.PI;
    return degrees * (pi / 180);
}
tick = 20
tickv = 0
inc = 0;
incvel = randInt(100) + 50;

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function slice(x, y, perc, rad, rot, col, text, amount) {
    start = degToRad(rot)
    if ((perc / 100 * 360 + rot) % 360 <= 270 + (perc / 100 * 360) && (perc / 100 * 360 + rot) % 360 > 270) {
        document.getElementById("choice").innerHTML = text;
        document.getElementById("choice").style.fontSize = Math.min(canvas.height, canvas.width) / text.length / 1.5 + "px";
    }
    if ((perc / 100 * 360 + rot) % 360 <= 270 + incvel && (perc / 100 * 360 + rot) % 360 >= 270) {
        tick += incvel * 50;
    }


    end = perc / 100 * 2 * Math.PI + degToRad(rot)
    ctx.fillStyle = col; //red
    ctx.strokeStyle = col;
    ctx.beginPath();
    ctx.arc(x, y, rad, start, end, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + Math.cos(start) * rad, y + Math.sin(start) * rad);
    ctx.lineTo(x + Math.cos(end) * rad, y + Math.sin(end) * rad);
    fsize = dist(x + Math.cos(start) * rad, y + Math.sin(start) * rad, x + Math.cos(end) * rad, y + Math.sin(end) * rad) / text.length / 1.75;
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.fillStyle = "rgba(0,0,0,0.25)";
    ctx.textAlign = "center";
    ctx.font = fsize + "px Lexend";
    x1 = x + Math.cos(start + perc / 100 * Math.PI) * rad * 0.85;
    y1 = y + Math.sin(start + perc / 100 * Math.PI) * rad * 0.85;
    ctx.translate(x1, y1);
    ctx.rotate(Math.atan2(canvas.height / 2 - y1, canvas.width / 2 - x1) + Math.PI / 2);
    ctx.fillText(text, 0, 0);
    ctx.resetTransform();
}

function drawWheel(options, rot2) {
    size = options.length;
    ct = 0;
    if (tick > 60 + randInt(20)) { tick = 60 + randInt(20) };
    ctx.fillStyle = "#000"; //red
    ctx.strokeStyle = "#000";
    off = Math.PI * 8 / 6 - tick / 100
    x0 = canvas.width / 2;
    rad1 = (canvas.height + canvas.width) / 80;
    y0 = canvas.height / 2 - Math.min(canvas.height, canvas.width) / 2 * 0.9 - rad1;
    tickrot = Math.PI - tick / 200;
    x1 = x0 + rad1 / 2 * Math.cos(tickrot);
    y1 = y0 + rad1 / 2 * Math.sin(tickrot);
    x2 = x0 + rad1 / 2 * Math.cos(tickrot + Math.PI);
    y2 = y0 + rad1 / 2 * Math.sin(tickrot + Math.PI);
    x3 = x0 + rad1 * Math.cos(tickrot + Math.PI * 1.5);
    y3 = y0 + rad1 * Math.sin(tickrot + Math.PI * 1.5);
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    tick = tick * 0.9;


    for (i = 0; i < size; i++) {
        rot = i * 360 / size + rot2;
        slice(canvas.width / 2, canvas.height / 2, 100 / size, Math.min(canvas.height, canvas.width) / 2 * 0.9, rot, colors[1][ct], options[i], size);
        ct++;
        if (ct > 9) ct = 0;
    }
}

window.onload = function() {

    colors = [
        ["#001219", "#005f73", "#0A9396", "#94D2BD", "#E9D8A6", "#EE9B00", "#CA6702", "#BB3E03", "#AE2012", "#9B2226"],
        ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"]
    ];

    pchoices = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    temp = String(window.location.href);
    if (temp.includes("option")) {
        pchoices = String(temp.replace("_", " ").split("?options=")[1]).split(",");
    }
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth * 1;
        canvas.height = window.innerHeight * 1;
        drawWheel(pchoices, inc);
        inc += incvel;
        incvel = incvel * 0.99;
        if (incvel <= 0.05) { incvel = 0 };
    }, 12);
};
