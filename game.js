var gamePattern = [];
var buttonColours = ["red", "blue", "green", "yellow"];
var userClickedPattern = [];
var hasStarted = false;
var level = 0;
var currentLevels = 0;

$(document).keydown(function(event) {
  if ((event.key === "a") && (!hasStarted)) {
    hasStarted = true;
    nextSequence();
  }
})

$(".btn").click(function () {
  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(currentLevels)
});

function nextSequence() {
  var randomChosenColour = buttonColours[Math.floor(Math.random() * 4)];
  gamePattern.push(randomChosenColour);
  $("." + randomChosenColour).fadeOut(50).fadeIn(50);
  playSound(randomChosenColour);
  $("h1").text("Level " + level);
  level++;
  userClickedPattern = [];
  currentLevels = 0;
}

function playSound(name) {
  var sound = new Audio("sounds/" + name + ".mp3");
  sound.play();
}

function animatePress(colour) {
  $("." + colour).addClass("pressed");
  setTimeout(function() {
    $("." + colour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentLevel) {
  if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
    if (gamePattern.length === (currentLevel + 1)) {
      setTimeout(function() {
      nextSequence()}, 1000);
    } else {
      currentLevels++;
    }
  } else {
    $("h1").text("Game over, press A key to restart.");
    $("body").addClass("game-over");
    setTimeout(function () {
      $("body").removeClass("game-over")
    }, 200);
    startOver();
    playSound("wrong");
  }
  }

function startOver() {
  gamePattern = [];
  hasStarted = false;
  level = 0;

}
