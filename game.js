let numbers = {};
let userRolling = true;
let currentRoll = 0;
let timesRolled = 1;
let gameSize = 3;
let gameBoundLeft = 1;
let gameBoundRight = 1000;
let didWin = false;
let prematureLoss = false;
let userFail = false;
let numberList = document.querySelector("[data-number-list]");
let numberDisplay = document.querySelector("[data-roll-space]");
let msg = document.querySelector("[data-msg]");

const dragStart = e => {
    // Add the target element's id to the data transfer object
    e.dataTransfer.setData("application/my-app", e.target.id);
    e.dataTransfer.effectAllowed = "move";
    console.log(e);
}

// generate the list ellies
for (let i = 0; i < gameSize; i++) {
    let element = document.createElement("li");
    element.id = "placement_" + (i + 1);
    element.classList.add("number-holder")
    numberList.appendChild(element);

    Object.assign(numbers, { [i + 1]: null });
}

// generate a random number
currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft);

let newRoll = document.createElement("div");
newRoll.innerText = currentRoll;
newRoll.dataset.rollCount = timesRolled;
newRoll.classList.add("number", "roll", "placing");
newRoll.id = "roll" + currentRoll;
newRoll.dataset.currentRoll = true;
newRoll.draggable = true;
// display number
numberDisplay.appendChild(newRoll);

// Register that rolled number can be dragged
let initialRoll = document.querySelector("[data-current-roll]");
initialRoll.addEventListener("dragstart", dragStart);

// register all the placement circles to drop the current roll
let canBeDroppedOn = document.querySelectorAll(".number-list li");
[...canBeDroppedOn].forEach(el => {
    // clear for next
    msg.innerHTML = "";

    // allow drop and dragover
    el.addEventListener("drop", e => {
        e.preventDefault();

        // Get the id of the current roll and add the moved element to the target's inner html
        const data = e.dataTransfer.getData("application/my-app");
        let elementDropped = document.getElementById(data);

        // find position dropped and enter into object
        let positionDropped = e.target.id.substring(e.target.id.indexOf("_") + 1);
        numbers[positionDropped] = parseInt(elementDropped.innerText);
        
        // append dragged element and make style changes
        let numberHolder = e.target;
        numberHolder.appendChild(elementDropped);
        elementDropped.classList.remove("placing");
        elementDropped.classList.add("noHover", "placed");
        numberHolder.classList.add("taken", "noHover");
    
        // don't allow it to move again
        elementDropped.removeEventListener("dragstart", dragStart);

        // TODO: careful this goes infinite with low game bounds
        while (Object.values(numbers).some(el => el === currentRoll)) {
            currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft);
        }

        // check for a premature loss
        let numbersFiltered = Object.values(numbers).filter(x => x !== null);
        numbersFiltered.forEach((n, i) => {
            if (n <= numbersFiltered[i - 1]) {
                prematureLoss = true;
            }
        });

        if (prematureLoss) {
            msg.innerHTML = "YOU LOST";
        } else {
            // check if game end
            if (Object.values(numbers).every(x => x !== null)) {
                // check if won
                didWin = Object.values(numbers).every((x, i) => {
                    return i === 0 || x >= Object.values(numbers)[i - 1];
                });
    
                if (didWin) {
                    msg.classList.add("flashy-text", "align");
                    msg.innerHTML = "*****YOU WON!!*****";
                } else {
                    msg.innerHTML = "YOU LOST";
                }
            } else {
                // increment and roll again
                timesRolled++;
                newRoll = document.createElement("div");
                newRoll.innerText = currentRoll;
                newRoll.dataset.rollCount = timesRolled;
                newRoll.classList.add("number", "roll", "placing");
                newRoll.id = "roll" + currentRoll;
                newRoll.dataset.currentRoll = true;
                newRoll.draggable = true;
                newRoll.addEventListener("dragstart", dragStart);
        
                // display number
                numberDisplay.appendChild(newRoll);
            }
        }
    });
    el.addEventListener("dragover", e => {
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";
    });
});
