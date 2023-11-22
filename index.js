const colorList = ["red","green","blue","yellow"];
let gamePattern = [];
let userPattern = [];
let level = 0;
let started = false;

$("body").keydown(function () {
    if (!started) {
        nextSequence();
        started = true;
    } 
});
$(".btn").click(function (e) {
    animate(e.target.id); 
    playSound(e.target.id); 
    userPattern.push(e.target.id);
    checkClick();
});

/*----------------- functions ----------------*/ 

function animate(color) {
    $("#"+ color).addClass("pressed");
    setTimeout(() => {
    $("#"+ color).removeClass("pressed");
    }, 150);
}

function playSound(color) {
    clicksound = new Audio("./sounds/" + color + ".mp3");
    clicksound.play();
}

function nextSequence() {
    userPattern = [];
    level++;
    $("#level-title").text("Level "+ level);    
    let newNum = Math.floor(Math.random()*4);
    let newPattern = colorList[newNum];
    gamePattern.push(newPattern);
    animate(newPattern);
    playSound(newPattern);
}

function checkClick() {
    if (gamePattern[userPattern.length-1] === userPattern[userPattern.length-1] ) {
        if (gamePattern.length === userPattern.length) {
            setTimeout(() => {
                nextSequence();
            }, 1000);;
        }
    } else {
        $("h1").text("Game over");
        playSound("wrong")
        $("body").addClass("game-over");
        setTimeout(() => {
            $("body").removeClass("game-over");
        }, 200);
    }
}
