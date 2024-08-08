var buttonColors = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var started;
var level = 0;

var randomChosenColor;

function handleClick() {
  var userChosenColor;
  userChosenColor = this.id;
  userClickedPattern.push(userChosenColor);
  animatePress(userChosenColor);
  playSound(userChosenColor);
  checkAnswer(userClickedPattern.indexOf(userChosenColor));
}

function startOver() {
  level = 0;
  gamePattern = [];
  started = false;
}
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}
function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (userClickedPattern.length === gamePattern.length) {
      setTimeout(function () {
        nextSequence();
      }, 1000);
    }
  } else {
    var notif = new Audio("./sounds/wrong.mp3");
    notif.play();
    $("body").addClass("game-over");
    setInterval(() => {
      $("body").removeClass("game-over");
    }, 200);
    $("h1").text("Game Over, Press to Restart");
    startOver();
  }
}
function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randNumber = Math.floor(Math.random() * 4);
  for (i = 0; i < buttonColors.length; i++) {
    randomChosenColor = buttonColors[randNumber];
  }
  gamePattern.push(randomChosenColor);
  console.log("game clicks: " + gamePattern);
  animatePress(randomChosenColor);
  playSound(randomChosenColor);
}

function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");
  }, 100);
}

var randButton;
gamePattern.forEach((color) => {
  randButton = $("#" + color);

  randButton.fadeOut("fast");

  randButton.fadeIn("slow");
});

$("div[type='button']").click(handleClick);

$("#startButton").click(function () {
  $("#startButton").addClass("pressedStart")
  setTimeout(function () {
    $("#startButton").removeClass("pressedStart");
  }, 100);
  if (!started) {
    $("h1").text("Level " + level);
    nextSequence();
    started = true;
  }
});
