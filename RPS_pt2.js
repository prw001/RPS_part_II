var playerChoice = 0;
var compChoice = 0;
var roundNum = 1;
var playerWins = 0;
var compWins = 0;
var hovered = false;
const playerPicButtons = document.querySelectorAll('.player-pic');
const buttons = document.querySelectorAll('button');
const playButton = document.querySelector('#play-round');

playerPicButtons.forEach(choice => choice.addEventListener('click',
	focusChoice));
playerPicButtons.forEach(pick => pick.addEventListener('click', assignValue));

playButton.addEventListener('click', (e) => {
	console.log('play!');
	if((playerWins + compWins) == 5){
		resetGame();
	}else if(playerChoice === 0){
		alert("Make a selection from the left first!");
	}else{
		playround();
	};
});

function playround(){
	toggleOff();
	var outcome;
	if(roundNum >= 1 && roundNum <= 5){
		var compChoice = computerChoice()
		outcome = decideWinner(compChoice);
		switch(outcome){
			case -1:
				updateComputerScore();
				if(roundNum < 5){
					roundNum += updateRound();
				}else{
					modButtonText();
				};
				break;
			case 0:
				updatePlayerScore();
				if(roundNum < 5){
					roundNum += updateRound();
				}else{
					modButtonText();
				};
				break;
			case 1:
				alert("Draw! Redo Round!");
				break;
			default:
				alert("Error! Try again!")
		};
	};
	playerChoice = 0;
};

function updateRound(){
	var roundDiv = document.getElementById("round");
	var nextRound = "Round " + (roundNum + 1) + " of 5";
	roundDiv.textContent = nextRound;
	return 1;
};

function computerChoice(){
	return (Math.floor(Math.random() * 3) + 1);
};

function decideWinner(computerChoice){
	if(computerChoice === playerChoice){
		return 1;
	}else if((playerChoice === 1 && computerChoice === 3) ||
			(playerChoice === 2 && computerChoice === 1) ||
			(playerChoice === 3 && computerChoice === 2)){
		return -1;
	}else{
		return 0;
	};
};

function updatePlayerScore(){
	var pScoreSpan = document.getElementById("p-score");
	pScoreSpan.classList.toggle("score-updated");
	playerWins += 1;
	pScoreSpan.textContent = playerWins;
};

function updateComputerScore(){
	var cScoreSpan = document.getElementById("c-score");
	cScoreSpan.classList.toggle("score-updated");
	compWins += 1;
	cScoreSpan.textContent = compWins;
};

function assignValue(e){
	switch(this.id){
		case 'pick-rock':
			if(playerChoice === 1){
				playerChoice = 0;
			}else{
			playerChoice = 1
			}
			break;
		case 'pick-paper':
			if(playerChoice === 2){
				playerChoice = 0;
			}else{
			playerChoice = 2
			}
			break;
		case 'pick-scissors':
			if(playerChoice === 3){
				playerChoice = 0;
			}else{
			playerChoice = 3
			}
			break;
		default:
			playerChoice = 0
	};
};

function focusChoice(e){
	const playerPicButtons = document.querySelectorAll('.player-pic');
	const playerZone = document.querySelector('#player-zone');
	const playRoundButton = document.querySelector('#play-round');
	var backgroundModActive = playerZone.classList.contains('choice-made');
	var toggleBackground = false;

	this.classList.toggle('clicked');
	playerPicButtons.forEach((button) =>{if(button !== this){
						button.classList.remove('clicked');};
	});
	playerPicButtons.forEach((button) =>{if(button.classList.contains('clicked')){
						toggleBackground = true;
						};
	});
	if((toggleBackground && !backgroundModActive) || 
		(!toggleBackground && backgroundModActive)){
					playerZone.classList.toggle('choice-made');
	};
};

function toggleOff(){
	const playerPicButtons = document.querySelectorAll('.player-pic');
	const pScore = document.getElementById("p-score");
	const cScore = document.getElementById("c-score");
	playerPicButtons.forEach((button) =>{if(button.classList.contains('clicked')){
						button.classList.toggle('clicked');
						};
	});
	if(pScore.classList.contains("score-updated")){
		pScore.classList.toggle("score-updated");
	}else if(cScore.classList.contains("score-updated")){
		cScore.classList.toggle("score-updated");
	};
};

function modButtonText(){
	var playButton = document.getElementById('play-round');
	if(roundNum === 0){
		playButton.textContent = "Shoot!";
		roundNum = 1;
	}else{
		if(playerWins > compWins){
			playButton.textContent = "~~ You Win! ~~\nNew Game";
		}else{
			playButton.textContent = "Computer Wins!\nNew Game";
		};
	};
}

function resetGame(){
	var pScoreNum = document.getElementById('p-score');
	var cScoreNum = document.getElementById('c-score');
	roundNum = 0;
	updateRound();
	playerWins = 0;
	compWins = 0;
	pScoreNum.textContent = 0;
	cScoreNum.textContent = 0;
	modButtonText();
};




