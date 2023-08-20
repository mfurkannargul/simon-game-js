var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started = false;
var level = 0;
var index = -1;

$(document).on("keypress", function(event) {
    if (!started) {
        nextSequence("")
        started = true;
    }
  });

$(".btn").click(function() {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    playSound(userChosenColour);
    animatePress("#" + userChosenColour);
    checkAnswer(level);
});

function nextSequence() {
    level += 1;
    $("#level-title").text("Level " + level);
    randomNumber = Math.floor(Math.random() * 4);
    var randomChosenColour = buttonColors[randomNumber];
    var idSelector = "#" + randomChosenColour;
    gamePattern.push(randomChosenColour);
    $(idSelector).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColour);
}

function checkAnswer(currentLevel) {
    index += 1;
    
    if (JSON.stringify(gamePattern[index]) == JSON.stringify(userClickedPattern[index])) {
        if (userClickedPattern.length == currentLevel) {
            setTimeout(function() {
                userClickedPattern = [];
                index = -1;
                nextSequence();
            }, 1000);
        }
    } else {
        $("h1").text("Game Over, Press Any Key to Restart");
        $("body").addClass("game-over");
        setTimeout(function() {
            $("body").removeClass("game-over");
        }, 200);
        playSound("wrong")
        startOver();
    }
}

function startOver() {
    level = 0;
    gamePattern = [];
    userClickedPattern = [];
    index = -1;
    started = false;
}


function playSound(colorName) {
    var audio = new Audio("sounds/" + colorName + ".mp3")
    audio.play();
}

function animatePress(currentColour) {
    $(currentColour).addClass("pressed");
    setTimeout(function() {
        $(currentColour).removeClass("pressed");
    }, 100);
}