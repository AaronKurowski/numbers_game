let numbers = {1: null, 2: null, 3: null};
let userRolling = true;
let userPlacing = true;
let currentRoll = 0;
let gameSize = 3;
let gameBoundLeft = 1;
let gameBoundRight = 10;
let didWin = false;

while (userRolling) {
    // generate a random number 
    currentRoll = Math.floor(Math.random() * (gameBoundRight - gameBoundLeft + 1) + gameBoundLeft)

    if (Object.values(numbers).some(el => el === currentRoll)) continue;

    // display number
    console.log(currentRoll);

    // ask user where they want to place the number
    // it must be between 1-20
    userPlacing = true;
    while (userPlacing) {
        let userPlacement = prompt("Place 1-" + gameSize);
        let placeIsntTaken = numbers[userPlacement] === null;

        if (userPlacement >= 1 && userPlacement <= gameSize && placeIsntTaken) {
            numbers[userPlacement] = currentRoll;
            userPlacing = false;
        } else {
            console.log("Invalid placement");
        }
    }

    console.table(numbers);
    userRolling = Object.values(numbers).some(el => el === null) ? true : false;
}

// check if won
didWin = Object.values(numbers).every((x, i) => {
    return i === 0 || x >= Object.values(numbers)[i - 1];
});

console.log("Here are you results: ");
console.table(numbers);

if (didWin) {
    console.log("******YOU WON!!!*******");
}