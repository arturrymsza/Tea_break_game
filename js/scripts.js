var newGameElem = document.getElementById('js-newGameElement'),
	newGameBtn = document.getElementById('js-newGameButton'),
	gameState = 'notStarted',
	player = {
		name: '',
		score: 0
	},
	computer = {
		score: 0
	},
	pickElem = document.getElementById('js-playerPickElement'),
	pickRock = document.getElementById('js-playerPick_rock'),
	pickPaper = document.getElementById('js-playerPick_paper'),
	pickScissors = document.getElementById('js-playerPick_scissors'),
	resultsElem = document.getElementById('js-resultTableElement'),
	playerPointsElem = document.getElementById('js-playerPoints'),
	playerNameElem = document.getElementById('js-playerName'),
	computerPointsElem = document.getElementById('js-computerPoints'),
	playerPickElem = document.getElementById('js-playerPick'),
	computerPickElem = document.getElementById('js-computerPick'),
	playerResultElem = document.getElementById('js-playerResult'),
	computerResultElem = document.getElementById('js-computerResult');

function setGameElements () {
	switch(gameState) {
		case 'started' :
			newGameElem.style.display = 'none';
			pickElem.style.display = 'block';
			resultsElem.style.display = 'block';
			break;
		case 'ended':
			newGameBtn.innerText = 'Once Again';
		case 'notStarted' :
		default:
			newGameElem.style.display = 'block';
			pickElem.style.display = 'none';
			resultsElem.style.display = 'none';
	}
}

function setGamePoints () {
	playerPointsElem.innerHTML = player.score;
	computerPointsElem.innerHTML = computer.score;
}

function newGame() {
	player.name = prompt('Please enter your name');
	if (player.name) {
		player.score = computer.score = 0;
		gameState = 'started';
		setGameElements ();

		playerNameElem.innerHTML = player.name;
		setGamePoints();
	}
}

function playerPick(playerPick) {
	var computerPick = getComputerPick();

	playerPickElem.innerHTML = playerPick;
	computerPickElem.innerHTML = computerPick;

	checkRoundWinner(playerPick, computerPick);
	setGamePoints();
	endOfTheGame();
}

function getComputerPick() {
    var possiblePicks = ['rock', 'paper', 'scissors'];
    return possiblePicks[Math.floor(Math.random()*3)];
}

function checkRoundWinner(playerPick, computerPick) {
	playerResultElem.innerHTML = computerResultElem.innerHTML = '';

	var winnerIs = 'player';

		if (playerPick == computerPick) {
			winnerIs = 'noone';
		} else if (
			(computerPick == 'rock' && playerPick == 'scissors') ||
			(computerPick == 'scissors' && playerPick == 'paper') ||
			(computerPick == 'paper' && playerPick == 'rock')) {

			winnerIs = 'computer';
		}

		if (winnerIs == 'player') {
			playerResultElem.innerHTML = "Win!";
			player.score++;
		} else if (winnerIs == 'computer') {
			computerResultElem.innerHTML = "Win!";
			computer.score++;
		}
}

function endOfTheGame () {
	if (player.score === 10) {
		alert('Congratulations ' + player.name + '! You won the game!!!');
		gameState = 'ended';
		setGameElements ();
	} else if (computer.score === 10) {
		alert('Computer won the game!');
		gameState = 'ended';
		setGameElements ();
	}
}

newGameBtn.addEventListener('click', newGame);
pickRock.addEventListener('click', function() { playerPick('rock') });
pickPaper.addEventListener('click', function() { playerPick('paper') });
pickScissors.addEventListener('click', function() { playerPick('scissors') });

setGameElements();
