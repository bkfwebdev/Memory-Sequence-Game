let sequenceLength = 3;
let computerPicks = [];
let userPicks = [];
let userScore = 0;
let computerScore = 0;
let level = 1;

function showSelected(index) {

    let target = index.toString();
    var f = document.getElementById(target);
    f.style.backgroundColor = "red";
    setTimeout(() => setToBlue(f), 1000);
}


function removeClass(myElement, myClass) {
    myElement.classList.remove(myClass);
}


function spinIt(target) {
    target.classList.add("spinjitsu");
    setTimeout(() => removeClass(target, "spinjitsu"), 2000);
}

function updateCorrect() {
    let targetScore = document.getElementById("correct");
    userScore = userScore + 1;
    targetScore.innerHTML = "Correct:" + userScore.toString();
    spinIt(targetScore);
}

function updateIncorrect() {
    alert("incorrect sequence input, click button to try a new sequence");
    let targetScore = document.getElementById("incorrect");
    computerScore = computerScore + 1;
    targetScore.innerHTML = "Incorrect:" + computerScore.toString();
    spinIt(targetScore);
    
}

function setToBlue(element) {
    element.style.backgroundColor = "blue";
}

// compare user picks to computer picks
function comparePicks() {
    let myConditional = null;
    for (let reps = 0; reps < computerPicks.length; reps++) {
        myConditional = computerPicks[reps] == userPicks[reps];
    }
    if (myConditional) {
        updateCorrect();
    } else {
        updateIncorrect();
    }
    computerPicks = [];
    userPicks = [];
    if (userScore >= 3 && userScore % 3 == 0) {
        sequenceLength++;
        level++;
        updateGameStatus();
        console.log(sequenceLength);
        } 
}

// get user picks for comparison
function getClickCallback(i) {
    return function() {
        showSelected(i);
        userPicks.push(i);
        if (userPicks.length == computerPicks.length) {
            comparePicks();
        }
    }
}

//show computer selected sequence
function showSequence(sequenceArray) {
    let limit = sequenceArray.length;
    for (let rep = 0; rep < limit; rep++) {
        setTimeout(() => {
            showSelected(sequenceArray[rep]);
        }, 1000 * rep);
    }
}

// set up user click event
var screengrab = document.getElementsByClassName("gamebox");
var limit = screengrab.length;
for (let x = 0; x < limit; x++) {
    screengrab[x].onclick = getClickCallback(x)
};

// initialize restart button
document.getElementById("restart-game-button").addEventListener("click", () => {
    userScore = 0;
    computerScore = 0;
    sequenceLength = 3;
    level = 1;
    location.reload(true) 
});
 
// update game status
function updateGameStatus(){
    document.getElementById("gameStatus").innerHTML = `Game Level:${level} Sequence Length:${sequenceLength}`
}


// generate sequnce for computer picks
function randomUniqueNum(range, outputCount) {

    let arr = []
    for (let i = 1; i <= range; i++) {
        arr.push(i)
    }

    let result = [];

    for (let i = 1; i <= outputCount; i++) {
        const random = Math.floor(Math.random() * (range - i));
        result.push(arr[random]);
        arr[random] = arr[range - i];
    }

    return result;
}

//main game loop

function gameEngine() {
    // get computer selections
    computerPicks = randomUniqueNum(8, sequenceLength);
    // show computer selections
    console.log(computerPicks);
    showSequence(computerPicks);
   
}
 
//initialize start button
document.getElementById("StartButton").addEventListener("click", gameEngine);