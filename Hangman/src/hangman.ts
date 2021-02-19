import {guessesEl,alphabets,revealHiddenParts} from "./app"
export class Hangman {
    word: string[];
    concealedWord: string[] = [];
    noOfGuessesLeft: number;
    guessedLetters: string[];
    constructor(word: string, noOfGuessesLeft: number) {
        let wordArray = word.toLowerCase().split("");
        this.word = wordArray;
        for(let i = 0;i < this.word.length;i++){
            if(this.word[i] !== " "){
                this.concealedWord[i] = "*"
            }
            else{
                this.concealedWord[i] = " "
            }
        }
        this.noOfGuessesLeft = noOfGuessesLeft;
        this.guessedLetters = [];
    }

    makeAGuess(guessedLetter: string){
        if(this.word.includes(guessedLetter) && (!(this.guessedLetters.includes(guessedLetter)))){
            for(let i = 0;i < this.word.length;i++){
                if(this.word[i] === guessedLetter){
                    this.guessedLetters.push(guessedLetter)
                    this.concealedWord[i] = guessedLetter
                }
                
            }
            
            alphabets.forEach((alphabet)=>{
                if(alphabet.className === guessedLetter.toLowerCase()){
                    alphabet.classList.add("success")
                }
            })
            
            if(this.concealedWord.join("") === this.word.join("")){
                (<HTMLDivElement>guessesEl).innerText =  `Congratulations. You guessed it right`
            }
        }
        else if(this.guessedLetters.includes(guessedLetter)){

        }
        else{
            revealHiddenParts()
        }

    }
    gameOver(){
        (<HTMLDivElement>guessesEl).innerHTML = `The Word is '${this.word.join("").toUpperCase()}'`

    }
    
}
