'use strict';

console.log(``, document.querySelector('.message').textContent)
const gameScore = () => document.querySelector('.score')
const guessInput = () => document.querySelector('.guess')

let _score, secretNumber


function updateMessage(message) {
	document.querySelector('.message').textContent = message
}

function updateScore(delta) {
	_score += delta
	if (_score <= 0) {
		updateMessage('YOU LOSE --> start a new game to try again')
		gameScore().textContent = "0000"
		document.querySelector('.check').textContent = 'New Game'
		document.querySelector('.check').addEventListener('click', () => {
			startGame(2)
			document.querySelector('.check').textContent = 'Check!'
		})
	} else {
		gameScore().textContent = _score
		// document.querySelector('.score').textContent = score;
	}
}


function startGame(startingPoints = 2) {
	console.log(`starting new game with ${startingPoints} guesses`,)
	_score = startingPoints

	gameScore().textContent = `${startingPoints}`

	// start by generating the target number 1-20
	secretNumber = Math.trunc(Math.random() * 20) + 1
	document.querySelector('.check').addEventListener('click', onGuessCheck)
	guessInput().value = ''
	guessInput().addEventListener('keypress', (e) => e.key === 'Enter' ? onGuessCheck() : null)
}

let onGuessCheck = function () {
	const guess = Number(document.querySelector('.guess').value)
	if (!guess) {
		updateMessage('Guess a NUMBER!');
	} else if (guess === secretNumber) {
		updateMessage('Correct Number!')
		updateScore(+1)
	} else if (guess > secretNumber) {
		updateMessage('Too High')
		updateScore(-1)
	} else if (guess < secretNumber) {
		updateMessage('Too Low')
		updateScore(-1)
	}
};

document.addEventListener('readystatechange', () => {
	if (document.readyState === 'complete') {
		startGame(2)
	}
})

