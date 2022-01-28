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

function hexToRgb(hex) {
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}


tick = 20
tickv = 0
inc = 0;
incvel = randInt(100);

pickcolor = "#000";

function dist(x1, y1, x2, y2) {
    return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
}

function slice(x, y, perc, rad, rot, col, text, amount) {
    start = degToRad(rot)
    if ((perc / 100 * 360 + rot) % 360 < 270 + (perc / 100 * 360) && (perc / 100 * 360 + rot) % 360 > 270) {
        document.getElementById("choice").innerHTML = text;
        document.getElementById("choice").style.fontSize = Math.min(canvas.height, canvas.width) / text.length / 1.5 + "px";
    }
    if ((perc / 100 * 360 + rot) % 360 <= 270 + incvel && (perc / 100 * 360 + rot) % 360 >= 270) {
        tick += incvel * 50 + 20;
        incvel -= 0.1;
        if (incvel < 0) { incvel = 0; }
        //pickcolor = col;
    }
    if ((perc / 100 * 360 + rot) % 360 <= 270 && (perc / 100 * 360 + rot) % 360 >= 269 && incvel < 0.25) {
        incvel = 0;
    }

    //
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
    fsize = dist(x + Math.cos(start) * rad, y + Math.sin(start) * rad, x + Math.cos(end) * rad, y + Math.sin(end) * rad) / (amount * (15.1343 * Math.pow(amount, -1.46905)));
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(x + Math.cos(start) * rad, y + Math.sin(start) * rad, rad / 100, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();
    ctx.beginPath();
    ctx.arc(x + Math.cos(end) * rad, y + Math.sin(end) * rad, rad / 100, 0, Math.PI * 2, false);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = "rgba(0,0,0,0.25)";

    ctx.lineWidth = 4;
    ctx.textAlign = "left";
    ctx.font = fsize + "px Lexend";
    x1 = x + Math.cos(start + perc / 100 * Math.PI * 0) * rad * 0.95;
    y1 = y + Math.sin(start + perc / 100 * Math.PI * 0) * rad * 0.95;
    ctx.translate(x1, y1);
    ctx.rotate(Math.atan2(canvas.height / 2 - y1, canvas.width / 2 - x1)); // + Math.PI / 2);
    //col2 = hexToRgb(col);
    //col2.r = ((255 - col2.r) + (255 - col2.g) + (255 - col2.b)) / 2;
    //col2.g = ((255 - col2.r) + (255 - col2.g) + (255 - col2.b)) / 2;
    //col2.b = ((255 - col2.r) + (255 - col2.g) + (255 - col2.b)) / 2;
    ctx.fillStyle = col; //"rgba(" + (col2.r) + "," + (col2.g) + "," + (col2.b) + ",0.75)";
    ctx.strokeStyle = col;
    //ctx.strokeText(text, 0, 0);
    ctx.strokeStyle = "rgba(0,0,0,0.25)";
    ctx.strokeText(text, 0, 0);
    ctx.fillText(text, 0, 0);
    ctx.fillStyle = "rgba(255,255,255,0.5)";
    ctx.fillText(text, 0, 0);
    ctx.resetTransform();
    ctx.lineWidth = 1;
}

function drawWheel(options, rot2) {
    size = options.length;
    ct = 0;
    if (tick > 60 + randInt(40)) { tick = 60 + randInt(40) };
    ctx.fillStyle = pickcolor; //red
    ctx.strokeStyle = pickcolor;
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
        slice(canvas.width / 2, canvas.height / 2, 100 / size, Math.min(canvas.height, canvas.width) / 2 * 0.9, rot, colors[0][ct], options[i], size);
        ct++;
        if (ct > colors[0].length - 1) ct = 0;
    }

    /*var grd = ctx.createRadialGradient(canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, Math.min(canvas.height, canvas.width) / 2 * 0.6);
    grd.addColorStop(0, "rgba(0,0,0,0.25)");
    grd.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grd;
    ctx.beginPath();
    ctx.arc(canvas.width / 2, canvas.height / 2, Math.min(canvas.height, canvas.width) / 2 * 0.9, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();*/
}

window.onload = function() {

    colors = [
        ["#f94144", "#f3722c", "#f8961e", "#f9844a", "#f9c74f", "#90be6d", "#43aa8b", "#4d908e", "#577590", "#277da1"]
    ];

    pchoices = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
    temp = String(window.location.href);
    while (temp.includes("_")) {
        temp = temp.replace("_", " ");
    }
    if (temp.includes("option")) {
        if (temp.includes("theme")) {
            pchoices = String(temp.split("?options=")[1]).split("?theme=")[0].split(",");
            colors = [String(temp.split("?options=")[1]).split("?theme=")[1].split(",")];
            for (i = 0; i < colors[0].length; i++) {
                colors[0][i] = "#" + colors[0][i];
            }
        } else {
            pchoices = String(temp.split("?options=")[1]).split(",");
        }
    } else if (temp.includes("theme")) {
        colors = [String(temp.split("?theme=")[1]).split(",")];
        for (i = 0; i < colors[0].length; i++) {
            colors[0][i] = "#" + colors[0][i];
        }

    }
    setInterval(function() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.width = window.innerWidth * 1;
        canvas.height = window.innerHeight * 1;
        drawWheel(pchoices, inc);
        inc += incvel;
        incvel = incvel * 0.99;
        if (incvel <= 0.01) { incvel = 0 };
    }, 12);
};
