/*
GAME FUNCTION:
- Player must guess a number between a min and max
- Player gets a certain amount of guesses
- Notify player of guesses remaining
- Notify the player of the correct answer if loose
- Let player choose to play again
*/

// Game Values
let min = parseInt(prompt("Please select Minimum Number"));
let max = parseInt(prompt("Please select Maximum Number"));
if (min > max || max < min) {
  alert("Please enter valid numbers !!!, Please Select again.");
  min = parseInt(prompt("Please select Number 1"));
  max = parseInt(prompt("Please select Number 2"));
}

let winningNum = getRandomNum(min, max);
let guessesLeft = 3;

// UI Elements
const game = document.querySelector("#game"),
  minNum = document.querySelector(".min-num"),
  maxNum = document.querySelector(".max-num"),
  guessBtn = document.querySelector("#guess-btn"),
  guessInput = document.querySelector("#guess-input"),
  message = document.querySelector(".message"),
  hint = document.querySelector(".hint");

// Assign UI Min & Max
minNum.textContent = min;
maxNum.textContent = max;

// Play again event Listener
game.addEventListener("mousedown", (e) => {
  if (e.target.className === "play-again") {
    window.location.reload();
  }
});

// Listen for Guess
guessBtn.addEventListener("click", () => {
  let guess = parseInt(guessInput.value);

  // Validate
  if (isNaN(guess) || guess < min || guess > max) {
    setMessage(`Please enter a Number Between ${min} & ${max}.`, "red");
    return false;
  }

  // Check If Won
  else if (guess === winningNum) {
    // Game Over - Won

    gameOver(true, `${winningNum} is Correct. YOU WON!`);

    // // Disable Input Field
    // guessInput.disabled = true;
    // // Change Border Color
    // guessInput.style.borderColor = "green";
    // // Set Win Message
    // setMessage(`${winningNum} is Correct. YOU WON!`, "green");
  } else {
    // Wrong Number
    guessesLeft -= 1;

    if (guessesLeft === 0) {
      // Game Over - Lost

      gameOver(
        false,
        `Game Over, YOU LOST. The Correct Number Was ${winningNum}.`
      );

      // // Disable Input Field
      // guessInput.disabled = true;
      // // Change Border Color
      // guessInput.style.borderColor = "red";
      // // Set Win Message
      // setMessage(
      //   `Game Over, YOU LOST. The Correct Number Was ${winningNum}.`,
      //   "red"
      // );
    } else {
      // Game Continues - Answer Wrong

      // Change Border Color
      guessInput.style.borderColor = "red";

      // Clear Input
      guessInput.value = "";

      // User Message
      setMessage(
        `${guess} is not correct, ${guessesLeft} guesses left.`,
        "red"
      );
    }

    // Hint Player
    if (guess < winningNum) {
      setHint(`You have gone low! Guess a higher value!`);
    } else if (guess > winningNum) {
      setHint(`You have gone high! Guess a low value!`);
    } else {
      setHint("");
    }
  }
});

function gameOver(won, msg) {
  let color;
  won === true ? (color = "green") : (color = "red");
  // Disable Input Field
  guessInput.disabled = true;
  // Change Border Color
  guessInput.style.borderColor = color;
  // Text Color
  message.style.color = color;
  // Set Win Message
  setMessage(msg);

  // Play Again
  guessBtn.value = "Play Again";
  guessBtn.className += "play-again";
}

// Winning Number
function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + Number(min));
}

const setMessage = (msg, color) => {
  message.style.color = color;
  message.textContent = msg;
};

const setHint = (msg) => {
  hint.style.color = "skyblue";
  hint.textContent = msg;
};
