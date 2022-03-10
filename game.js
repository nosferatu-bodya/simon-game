
// sequence of colors that user must repeat
var sequence = [];
// what user pressed
var userSequence = [];
// list of all colorsr
var buttonColors = ["green", "red", "yellow", "blue"];
// current level
var level = 1;
// current highlight button for showing the sequence for user
var curSequenceHighlight = 0;
// current button user pushed
var curUserPush = 0;

var canPush = false;

$(document).on("keypress", function(){
    nextSequence();
});

// check when user click on one of the buttons
$(".btn").on("click", handlePress);

// what happens when user clicks on one of the buttons
function handlePress() {

    if (canPush) {
        playSound("click");
        var curButton = this;
        // hightlight the pressed button
        curButton.classList.add("pressed");
        // unpress the button
        setTimeout(function () {
            curButton.classList.remove("pressed");
        }, 100);

        // add this button to the user entered list
        userSequence.push(this.getAttribute("id"));

        // if user pressed the wrong button
        if (sequence[curUserPush] != userSequence[curUserPush]) {
            canPush = false;
            
            playSound("wrong", 300);

            restartLevel();
            return;
        }


        // if user pushed as many button as are in the sequence
        if (curUserPush == sequence.length - 1) {
            playSound("correct", 100);
            canPush = false;
            nextLevel();
            return;
        }

        curUserPush += 1;
    }

}

// creates sequence of buttons user must to repeat
function nextSequence() {
    playSound("highlight");
    canPush = false;
    $("h1").text("Level " + level);
    var randomColor = buttonColors[Math.floor(Math.random() * 4)];
    // add random choosen color to the sequence
    sequence.push(randomColor);

    // play animation
    $("#" + randomColor).fadeIn(200).fadeOut(200).fadeIn(200);

    curSequenceHighlight += 1;
    // if sequence is still too short for this level repeat this function
    if (curSequenceHighlight < level) {
        setTimeout(nextSequence, 600);
    } else {
        canPush = true;
    }
}

function toDefault() {
    curUserPush = 0;
    curSequenceHighlight = 0;
    userSequence = [];
    sequence = [];
}

function restartLevel() {
    // change the heading to WRONG
    $("h1").text("WRONG");
    $("h1").addClass("heading-wrong");
    setTimeout(function(){
        $("h1").removeClass("heading-wrong");
    }, 600);

    // get everything back to the default settings
    level = 1;
    toDefault();

    // start game again
    setTimeout(nextSequence, 600);
}

function nextLevel() {
    // go back to the default settings
    toDefault();
    // increase the level by 1
    level += 1;

    // start game
    setTimeout(nextSequence, 200);
}

function playSound(sound){
    switch(sound){
        case "highlight": 
            new Audio("sounds/button-highlight.wav").play();
            break;
        case "click":
            new Audio("sounds/button-click.wav").play();
            break
        case "correct":
            new Audio("sounds/correct.wav").play();
            break;
        case "wrong":
            new Audio("sounds/wrong2.mp3").play();
            break
    }
}
function playSound(sound, delay){
    setTimeout(function(){
        switch(sound){
            case "highlight": 
                new Audio("sounds/button-highlight.wav").play();
                break;
            case "click":
                new Audio("sounds/button-click.wav").play();
                break
            case "correct":
                new Audio("sounds/correct.wav").play();
                break;
            case "wrong":
                new Audio("sounds/wrong2.mp3").play();
                break
        }
    }, delay);
}