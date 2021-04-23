var myNav = document.getElementById('nav');
window.onscroll = function () {
    "use strict";
    if (document.body.scrollTop >= 500 || document.documentElement.scrollTop >= 500) {
        myNav.classList.add("nav_bg");
        myNav.classList.remove("nav_trans");
    } else {
        myNav.classList.add("nav_trans");
        myNav.classList.remove("nav_bg");
    }
};

document.getElementById('timer').innerHTML = 1 + ":" + 20;
startTimer();

function startTimer() {
    let presentTime = document.getElementById('timer').innerHTML;
    let timeArray = presentTime.split(/[:]+/);
    let m = timeArray[0];
    let s = checkSecond((timeArray[1] - 1));
    if (m < 10) {
        if (!m.includes("0")) {
            m = "0" + m;
        }
    }
    if (m == 0) {
        m = "00";
    }
    if (s == 59) {
        if (m <= 0) {
            m = "0" + 0;
            s = "0" + 0;
        } else {
            m = m - 1
            if (m == 0) {
                m = "00"
            }
        }
    }

    if (m < 10) {
        document.getElementById('timer').innerHTML = m + ":" + s;
    } else document.getElementById('timer').innerHTML = m + ":" + s;

    console.log(m)
    setTimeout(startTimer, 1000);
}

function checkSecond(sec) {
    // add zero in front of numbers < 10
    if (sec < 10 && sec >= 0) {
        sec = "0" + sec
    }
    if (sec < 0) {
        sec = "59"
    }

    return sec;
}