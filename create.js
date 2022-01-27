window.onload = function() {

    newurl = "https://andrewcheney.github.io/Wheel/?options=" + document.getElementById("items").value + "?theme=" + document.getElementById("colors").value;
    prev = newurl;
    document.getElementById("wheel").src = newurl;
    setInterval(function() {
        newurl = "https://andrewcheney.github.io/Wheel/?options=" + document.getElementById("items").value + "?theme=" + document.getElementById("colors").value;
        if (prev != newurl) {
            document.getElementById("newurl").href = newurl;
            document.getElementById("newurl").innerHTML = newurl;
            document.getElementById("wheel").src = newurl;
            prev = newurl;
        }

    }, 12);
};