import { Hangman } from "./hangman";
import { getPuzzle } from "./request";
let game1: Hangman;
export const puzzleEl = document.querySelector("#puzzle");
export const guessesEl = document.querySelector("#guesses");
export const hiddenParts = document.querySelectorAll(".hide");
export const alphabets = document.querySelectorAll(
  ".alphabet-container button"
);
export let idx = 0;
let guess: string;
const reset = document.getElementById("reset");
alphabets.forEach((alphabet) => {
  (<HTMLButtonElement>alphabet).addEventListener("click", () => {
    if (idx < 6 && game1.concealedWord.join("") !== game1.word.join("")) {
      guess = (<HTMLButtonElement>alphabet).value;
      game1.makeAGuess((<HTMLButtonElement>alphabet).value);
      render();
    }
  });
});

window.addEventListener("keypress", function (e) {
  if (idx < 6 && game1.concealedWord.join("") !== game1.word.join("")) {
    guess = String.fromCharCode(e.charCode);
    game1.makeAGuess(guess);
    render();
  }
});
(<HTMLButtonElement>reset).addEventListener("click", () => {
  startGame();
  idx = 0;
  hiddenParts.forEach((hiddenPart) => {
    hiddenPart.classList.add("hide");
  });
  alphabets.forEach((alphabet) => {
    alphabet.className = (<HTMLButtonElement>alphabet).value;
  });
});
export const revealHiddenParts = () => {
  hiddenParts[idx].classList.remove("hide");
  idx++;
  game1.guessedLetters.push(guess);
  if (idx === 6) {
    game1.gameOver();
  }
  alphabets.forEach((alphabet) => {
    if (alphabet.className === guess.toLowerCase()) {
      alphabet.classList.add("danger");
    }
  });
};
const render = () => {
  (<HTMLDivElement>puzzleEl).innerHTML = "";
  game1.concealedWord.forEach((letter) => {
    if (letter === "*") {
      const letterEl = document.createElement("span");
      letterEl.textContent = " ";
      (<HTMLDivElement>puzzleEl).appendChild(letterEl);
    } else if (letter === " ") {
      const spaceEl = document.createElement("span");
      spaceEl.textContent = " ";
      spaceEl.className = "space";
      (<HTMLDivElement>puzzleEl).appendChild(spaceEl);
    } else {
      const guessedLetterEl = document.createElement("span");
      guessedLetterEl.textContent = letter;
      (<HTMLDivElement>puzzleEl).appendChild(guessedLetterEl);
    }
  });
  if (idx < 6 && game1.concealedWord.join("") !== game1.word.join("")) {
    (<HTMLDivElement>guessesEl).innerHTML = `You have ${6 - idx} guesses left`;
  }
  if (game1.concealedWord.join("") === game1.word.join("")) {
    (<HTMLDivElement>(
      guessesEl
    )).innerHTML = `Congratulations !!! You guessed it right`;
  }
};
const startGame = async () => {
  const data = await getPuzzle();
  game1 = new Hangman(data, 6);
  render();
};
startGame();
