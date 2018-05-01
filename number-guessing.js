//Game variables
var mysteryNumber = Math.floor(Math.random() * 100);
var playerGuess = 0;
var guessesRemaining = 10;
var guessesMade = 0;
var gameState = "";
var gameWon = false;

//Input and output fields
var input = document.getElementById('input');
var output = document.getElementById('output');

//The button
var button = document.getElementById('button');
button.style.cursor = "pointer";

//arrow
var arrow = document.getElementById('arrow');

//guessed numbers
var guessed = document.getElementById('guessed');

//event listeners
button.addEventListener('click', clickHandler, false);
input.addEventListener('keydown', keydownHandler, false);

function keydownHandler(event){
    if(event.keyCode === 13){
        validateInput();
    }
}

function clickHandler(){
    validateInput();
}

function playGame(){
    guessesMade++;
    guessesRemaining--;

    gameState = `Guess: ${guessesMade}, Remaining: ${guessesRemaining}`;

    

    if(playerGuess > mysteryNumber){
        output.innerHTML = `That's too high. ${gameState}`;
        if(guessesRemaining < 1){
            endGame();
        }
    } else if (playerGuess < mysteryNumber){
        output.innerHTML = `That's too low. ${gameState}`;
        if (guessesRemaining < 1){
            endGame();
        }
    } else {
        gameWon = true;
        endGame();
    }





    input.value = "";

    render();
    addToGuess(playerGuess);


}

function addToGuess(num){
    var html = `
        <span>
            ${num},
        </span>
    `;
    guessed.insertAdjacentHTML('beforeEnd', html);
};

function endGame(){
    if (gameWon){
        output.innerHTML = `<div class="alert alert-success" role="alert">Yes it's ${mysteryNumber}! <br/> It only took you ${guessesMade} guesses</div>`;

    } else {
        output.innerHTML = `<div class="alert alert-danger" role="alert">No more guesses left! <br/> The number was: ${mysteryNumber}</div>`;
    }

    button.removeEventListener("click", clickHandler, false);
    input.removeEventListener("keydown", keydownHandler, false);
    button.disabled = true;
    input.disabled = true;
}


function validateInput(){
    playerGuess = parseInt(input.value);
    if(isNaN(playerGuess)){
        output.innerHTML = `<strong>${input.value}</strong> is <em>not</em> a number. Please enter a number`;
    } else if (playerGuess > 99 || playerGuess < 0){
        output.innerHTML = `<strong>${input.value}</strong> is <em>not</em> between 0 and 99.`;
    } else {
         playGame();
    }
}

function render(){
    arrow.style.left = playerGuess * 3 + 'px';
}