let [score, points] = [...document.getElementsByClassName("scoreNm")]
const countdownEl = document.getElementById('countdown');
let board = document.querySelector(".outer");
let table = document.querySelector(".table");


//pre-loader
window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader");
    setTimeout(() => {
        preloader.classList.add("preload-finish");
    }, 2000)
});

let onTable = 0

//this function triggers when you click play
function StartGame() {
    if (parseInt(points.innerHTML) <= 0) {
        score.innerHTML = 'No spades left '
        board.style.display = "flex";
        clearInterval(idItr);
    } else if (onTable == 0) {
        // blinking border
        table.style.border = '5px dashed red'

        setTimeout(() => {
            table.style.border = '5px dashed transparent'
        }, 500)

        setTimeout(() => {
            table.style.border = '5px dashed red'
        }, 1000)

        setTimeout(() => {
            table.style.border = '5px dashed transparent'
        }, 1500)
    } else {
        Showball();
        // setTimeout(Showball,);
        setTimeout(shuffling, 7000);
    }
}

//this function lifts the thimbles
function thimbleup(x) {
    x.classList.add("thimbleup");
}

//this function puts the thimble down
function thimbledown(x) {
    x.classList.remove("thimbleup");
}

//this function selects one thimble at random and positions the ball under it and lifts it at the beginning
let timeLeft = 1 * 60; // 5 minutes in seconds
let idItr
function Showball() {
    document.getElementById("Playbutton").style.pointerEvents = "none";
    let rand = getRandNum();
    let thimb = document.getElementById(`Cup${rand}`);

    document
        .getElementById("thimble_ball")
        .setAttribute("Class", `thimble_ball_position-${rand}`);

    thimb.classList.add("thimbleup");

    setTimeout(function () {
        thimb.classList.remove("thimbleup");
    }, 4000);

    setTimeout(function () {
        document
            .getElementById("thimble_ball")
            .classList.remove(`thimble_ball_position-${rand}`);
    }, 4500);

    // Start Timer
    if (countdownEl.innerHTML == '05:00') {
        idItr = setInterval(() => {

            if (timeLeft <= 0) {
                clearInterval(idItr);
                board.style.display = "flex";
                score.innerHTML = 'Time\'s up!  You Won ' + points.innerHTML + ' '
            }

            let minutes = Math.floor(timeLeft / 60);
            let seconds = timeLeft % 60;

            minutes = minutes < 10 ? '0' + minutes : minutes;
            seconds = seconds < 10 ? '0' + seconds : seconds;

            countdownEl.innerHTML = `${minutes}:${seconds}`;
            timeLeft--;

        }, 1000);
    }
}

// This function resets the class of all the thimbles to default
function resetthimbclass() {
document
    .getElementById("Cup0")
    .setAttribute("Class", "sewing_thimble thimble-0");
document
    .getElementById("Cup1")
    .setAttribute("Class", "sewing_thimble thimble-1");
document
    .getElementById("Cup2")
    .setAttribute("Class", "sewing_thimble thimble-2");
}

//this functions picks a random integer from 0-2
function getRandNum() {
    let random = Math.floor(Math.random() * 3);
    return random;
}

//this functions runs pickrandcups function after every 0.5secons
function shuffling() {
    mix = setInterval(PickRandCups, 500);
}

let mix;

let shufflecounter = 0;

//this function interchanges the classes of two thimbles
function PickRandCups() {
    let Cone = getRandNum();
    let Ctwo = getRandNum();

    if (Cone != Ctwo) {
        let Cupone = document.getElementById(`Cup${Cone}`);
        let Cuptwo = document.getElementById(`Cup${Ctwo}`);

        let CuponeClass = Cupone.getAttribute("class");
        let CuptwoClass = Cuptwo.getAttribute("class");

        Cupone.setAttribute("Class", CuptwoClass);
        Cuptwo.setAttribute("Class", CuponeClass);

        shufflecounter = shufflecounter + 1;

        if (shufflecounter > 15) {
        clearInterval(mix);
        resetthimbclass();
        removedisabled();
        shufflecounter = 0;
        //  setTimeout(resetthimbclass,7500);
    }
} else {
    PickRandCups();
}
}

//this function removes the disabled attribute from all thimbles
function removedisabled() {
    let removedis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < removedis.length; i++) {
        removedis[i].removeAttribute("disabled");
    }
}

// this function adds the disabled attribute from all thimbles
function adddisabled() {
    let addis = document.getElementsByClassName("sewing_thimble");
    for (var i = 0; i < addis.length; i++) {
        addis[i].setAttribute("disabled", "disabled");
    }
}

// This function triggers when you click on a thimble
function selectthimble(x) {
    adddisabled();
    let rand = getRandNum();
    let winningthimble = document.getElementById(`Cup${rand}`);
    let selectedthimble = document.getElementById(`${x}`);
    let ballpos = document.getElementById("thimble_ball");
    ballpos.setAttribute("Class", `thimble_ball_position-${rand}`); //set the ball position tunder the selected thimble
    selectedthimble.classList.add("thimbleup"); //lift the selected thimble up

    setTimeout(function () {

        if (winningthimble != selectedthimble) {
            setTimeout(function () {
                selectedthimble.classList.remove("thimbleup");
            }, 2000); //bring the selected thimble down after 2 secs
            setTimeout(function () {
                winningthimble.classList.add("thimbleup");
            }, 2500); //bring the winning thimble down after 2.5secs

            setTimeout(function () {
                winningthimble.classList.remove("thimbleup");
            }, 4000); //bring the winning thimble down after 5secs

            // subtract points
            points.innerHTML = parseInt(points.innerHTML) - onTable;
            points.style.color = "crimson";
            setTimeout(function () {
                points.style.color = "white";
            }, 1000)

            onTable = 0;
            let sum = document.querySelector(".sumNm");
            sum.innerHTML = 0

            document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
        } else if ((winningthimble = selectedthimble)) {

            // add points
            points.innerHTML = parseInt(points.innerHTML) + onTable;
            points.style.color = "#63d673";
            setTimeout(function () {
                points.style.color = "white";
            }, 1000)

            if (points.innerHTML <= 0) {
                board.style.display = "flex";
                score.innerHTML = 'No spades left '
                clearInterval(idItr);
            }
            onTable = 0;
            let sum = document.querySelector(".sumNm");
            sum.innerHTML = 0

            setTimeout(function () {
                selectedthimble.classList.remove("thimbleup");
            }, 2000); //bring the selected thimble down after 2 secs
            setTimeout(function () {
                winningthimble.classList.remove("thimbleup");
            }, 2500); //bring the winning thimble down after 2.5secs
            document.getElementById("Playbutton").style.pointerEvents = "all"; //make the play button clickable again
        }
    }, 2000);
}


function setCup(id) {
    let elements = document.querySelectorAll(".sewing_thimble");
    for (element of elements) {
        element.style.background = `url("Img/c${id}.png") no-repeat fixed center`;
        element.style.backgroundSize = `contain`;
    }
}

function setBall(id) {
    let element = document.querySelector("#thimble_ball");
    element.style.background = `url("Img/b${id}.png") no-repeat center`;
    element.style.backgroundSize = '2em 2em';
}

function setOnTable(prst) {

    if (parseInt(points.innerHTML) > 0) {
        let sum = document.querySelector(".sumNm");
        onTable = Math.round(points.innerHTML * prst);
        sum.innerHTML = onTable;
    } else {
        board.style.display = "flex";
        score.innerHTML = 'No spades left '
        clearInterval(idItr);
    }
}

function init() {
    setOnTable(0);
    points.innerHTML = 200;
    board.style.display = "none";
    countdownEl.innerHTML = '05:00'
}