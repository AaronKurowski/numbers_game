let numbers = {1: null, 2: null, 3: null};
let userRolling = true;
let currentRoll = 0;
let gameSize = 3;
let gameBoundLeft = 1;
let gameBoundRight = 10;
let didWin = false;
let numberList = document.querySelector("[data-game]");
let numberDisplay = document.querySelector("[data-current-roll");
let msg = document.querySelector("[data-msg]");


// generate a random number 
currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft);

// display number
numberDisplay.innerHTML = "Current Roll: " + currentRoll;

// take user input for placing
document.querySelector("[data-user-place-btn]").addEventListener("click", e => {
    let thisButton = e.target;
    let userPlacement = e.target.previousElementSibling.value;
    let placeIsntTaken = numbers[userPlacement] === null;

    if (userPlacement >= 1 && userPlacement <= gameSize && placeIsntTaken) {
        numbers[userPlacement] = currentRoll;
        numberList.children[userPlacement - 1].innerHTML = currentRoll;
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