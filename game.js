let numbers = {};
let userRolling = true;
let currentRoll = 0;
let gameSize = 3;
let gameBoundLeft = 1;
let gameBoundRight = 10;
let didWin = false;
let numberList = document.querySelector("[data-number-list]");
let numberDisplay = document.querySelector("[data-current-roll");
let msg = document.querySelector("[data-msg]");

// Two main features
// 1. Game setup
// 2. Game play

document.querySelector("[data-setup-form]").addEventListener("submit", e => {
    e.preventDefault();
    gameSize = parseInt(e.target[0].value);
    gameBoundLeft = parseInt(e.target[1].value);
    gameBoundRight = parseInt(e.target[2].value);
    
    document.querySelector("[data-game-section]").style.display = "block";
    
    e.target.parentElement.remove();

    // generate the list ellies
    for (let i = 0; i < gameSize; i++) {
        let element = document.createElement("li");
        element.id = "placement_" + (i + 1);
        numberList.appendChild(element);

        Object.assign(numbers, { [i + 1]: null });
    }

    // generate a random number 
    currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft);

    // display number
    numberDisplay.innerHTML = "Current Roll: " + currentRoll;
});


// take user input for placing
document.querySelector("[data-user-place-btn]").addEventListener("click", e => {
    msg.innerHTML = "";
    let thisButton = e.target;
    let userPlacement = e.target.previousElementSibling.value;
    let placeIsTaken = numbers[userPlacement] !== null;

    if (userPlacement >= 1 && userPlacement <= gameSize) {
        if (placeIsTaken) {
            msg.innerHTML = "Number already placed there";
        } else {

            // saving in an object idk
            numbers[userPlacement] = currentRoll;

            // list placement
            numberList.children[userPlacement - 1].innerHTML = currentRoll;
        }
    } else {
        msg.innerHTML = "Invalid placement <br> Placements should be between <b>1</b> and <b>" + gameSize + "</b>";
        return;
    }

    // check if game all have been filled
    userRolling = Object.values(numbers).some(el => el === null) ? true : false;

    if (! userRolling) {
        // check if won
        didWin = Object.values(numbers).every((x, i) => {
            return i === 0 || x >= Object.values(numbers)[i - 1];
        });

        thisButton.disabled = true;

        if (didWin) {
            msg.classList.add("flashy-text");
            msg.innerHTML = "******YOU WON!!!*******";
        } else {
            msg.innerHTML = "YOU LOST";
        }

        userPlacement.disabled = true;
    } else {
        // generate a random number 
        while (Object.values(numbers).some(el => el === currentRoll)) {
            currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft);
        }

        // display number
        numberDisplay.innerHTML = "Current Roll: " + currentRoll;
    }
});