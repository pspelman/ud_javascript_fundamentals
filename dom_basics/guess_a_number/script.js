'use strict';

console.log(``, document.querySelector('.message').textContent)
const gameScore = () => document.querySelector('.score')
const guessInput = () => document.querySelector('.guess')

let _score, secretNumber, highScore, controller, signal
controller = new AbortController()
signal = controller.signal


function updateMessage(message) {
	document.querySelector('.message').textContent = message
}

function updateScore(delta) {
	_score += delta
	if (_score <= 0) {
		endGame(false)
	} else {
		gameScore().textContent = _score
		// document.querySelector('.score').textContent = score;
	}
}

function endGame(win) {
	controller.abort()
	if (win) {
		if (!highScore) highScore = _score
		else {
			console.log(`checking ${_score} against high score ${highScore}`,)
			if (_score > highScore) {
				console.log(` new high score! `,)
				highScore = _score
			}
		}
	} else {
		updateMessage('YOU LOSE --> start a new game to try again')

		gameScore().textContent = "0000"
	}
	controller = new AbortController()
	signal = controller.signal

	guessInput().value = ''
	document.querySelector('.check').textContent = 'New Game'
	document.querySelector('.check').addEventListener('click', () => {
			startGame(2)
		}, {once: true}
	)
	guessInput().addEventListener('keypress', (e) => e.key === 'Enter' ? startGame() : null,
		{once: true})

}


function startGame(startingPoints = 2) {
	console.log(`starting new game with ${startingPoints} guesses`,)
	_score = startingPoints

	gameScore().textContent = `${startingPoints}`

	// start by generating the target number 1-20
	secretNumber = Math.trunc(Math.random() * 20) + 1
	guessInput().addEventListener('keypress', (e) => e.key === 'Enter' ? onGuessCheck() : null,
		{signal})
	document.querySelector('.check').addEventListener('click', onGuessCheck,
		{signal})
	guessInput().value = ''
	document.querySelector('.check').textContent = 'Check!'
}

let onGuessCheck = function () {
	let guess = Number(document.querySelector('.guess').value)
	console.log(`checking guess: `, guess)
	if (!guess) {
		updateMessage('Guess a NUMBER!');
	} else if (guess === secretNumber) {
		console.log(`YOU WIN`,)
		updateMessage('Correct Number!')
		updateScore(+1)
		endGame(true)
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

