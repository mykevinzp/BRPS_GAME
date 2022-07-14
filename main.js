const game = () => {
    let pScore = 0
    let cScore = 0


    //start the game
    const startGame = () => {
        const playBtn = document.querySelector('.intro button')
        const introScreen = document.querySelector('.intro')
        const match = document.querySelector('.match')

        playBtn.addEventListener('click', () => {
            introScreen.classList.add('fadeOut')
            match.classList.add('fadeIn')
        })
    }



    //play match
    const playMatch = () => {
        const options = document.querySelectorAll('.options button')
        const playerHand = document.querySelector('.player-hand')
        const computerHand = document.querySelector('.computer-hand')
        const hands = document.querySelectorAll('.objects img')

        hands.forEach(hand => {
            hand.addEventListener('animationend', function () {
                this.style.animation = '';
            })
        })

        //computer options will be randomly generated
        const computerOptions = ['bomb', 'rock', 'paper', 'scissors'];
        options.forEach(option => {
            option.addEventListener('click', function () {
                //computer choice
                const computerNumber = Math.floor(Math.random() * 4);
                const computerChoice = computerOptions[computerNumber];

                setTimeout(() => {
                    //here we call compareOjects
                    compareObjects(this.textContent, computerChoice);
                    // update images
                    playerHand.src = `./image/${this.textContent}.png`
                    computerHand.src = `./image/${computerChoice}.png`
                }, 2000)

                //animation
                playerHand.style.animation = "shakePlayer 2s ease"
                computerHand.style.animation = "shakePlayer 2s ease"
            })
        })
    }

    const updateScore = () => {
        const playerScore = document.getElementById('pscore-change');
        const computerScore = document.getElementById('cscore-change');
        playerScore.textContent = pScore;
        computerScore.textContent = cScore;


    }

    //game over
    const endGame = () => {
        const matchEnd = document.querySelector('.match')
        const endScreen = document.querySelector('.game-over')
        if (pScore === 3 || cScore === 3) {
            matchEnd.classList.add('fadeOut')
            setTimeout(() => {
                endScreen.classList.add('fadeIn')
                location.reload()
            }, 2000);

        }
    }


    const compareObjects = (playerChoice, computerChoice) => {
        //update text display
        const winner = document.querySelector('.winner')
        //checking for a draw
        if (playerChoice === computerChoice) {
            winner.textContent = 'it is a DRAW'
            return;
        }
        //check for bomb
        if (playerChoice === 'bomb') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'player lose'
                cScore++;
                updateScore();
                endGame()
                return;
            } else {
                winner.textContent = 'player win'
                pScore++;
                updateScore();
                endGame()
                return;
            }
        }
        //check for rock
        if (playerChoice === 'rock') {
            if (computerChoice === 'scissors') {
                winner.textContent = 'player win'
                pScore++;
                updateScore();
                endGame()
                return;
            }
            else {
                winner.textContent = 'player lose'
                cScore++;
                updateScore();
                endGame()
                return;
            }
        }
        //check for paper
        if (playerChoice === 'paper') {
            if (computerChoice === 'rock') {
                winner.textContent = 'player win'
                pScore++;
                updateScore();
                endGame()
                return;
            }
            else {
                winner.textContent = 'computer win'
                cScore++;
                updateScore();
                endGame()
                return;
            }
        }

        //check for scissors
        if (playerChoice === 'scissors') {
            if (computerChoice === 'bomb' || computerChoice === 'paper') {
                winner.textContent = 'player win'
                pScore++;
                updateScore();
                endGame()
                return;
            }
            else {
                winner.textContent = 'computer win'
                cScore++;
                updateScore();
                endGame()
                return;
            }
        }


    }



    //call all the inner function
    startGame()
    playMatch()

}
//start the game function
game()