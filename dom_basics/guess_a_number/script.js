'use strict';


console.log(``, document.querySelector('.message').textContent)
// start by generating the target number 1-20
let score = 20
const secretNumber = Math.trunc(Math.random() * 20) + 1

function updateMessage(message) {
	document.querySelector('.message').textContent = message
}

function updateScore(delta) {
	score += delta
	if (score <= 0) {
		updateMessage('YOU LOSE --> start a new game to try again')
		document.querySelector('.check').addEventListener('click', ()=>{alert('start a new game to play again')})
	} else {
		document.querySelector('.score').textContent = score;
	}
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
document.querySelector('.check').addEventListener('click', onGuessCheck)
document.querySelector('.guess').addEventListener('keypress', (e) => e.key === 'Enter' ? onGuessCheck() : null)
