function Dice() {
  this.oneDie = 1;
  this.twoDie = 1;
  this.diceValue = 0;
}

Dice.prototype.roll = function() {
  this.oneDie = Math.floor((Math.random() * 6) + 1);
  this.twoDie = Math.floor((Math.random() * 6) + 1);
}

Dice.prototype.refreshScore = function() {
  if (this.dieOne === 1 && this.dieTwo === 1) {
    this.diceValue = "pig out";
  } else if (this.dieOne === 1 || this.dieTwo === 1) {
    this.diceValue = 0;
  } else {
    this.diceValue = this.dieOne + this.dieTwo;
  }
}

function Player(name) {
  this.name = name;
  this.turnScore = 0;
  this.totalScore = 0;
  this.isTurn = false;
  this.dice = new Dice;
}

Player.prototype.reactToDiceValue = function() {
  if (this.dice.diceValue === "pig out") {
    this.turnScore = 0;
    this.totalScore = 0;
    this.isTurn = false;
  } else if (this.dice.diceValue === 0) {
    this.turnScore = 0;
    this.isTurn = false;
  } else {
    this.turnScore += this.dice.diceValue;
  }
}

Player.prototype.chooseToEndTurn = function() {
  this.totalScore += this.turnScore;
  this.turnScore = 0;
  this.isTurn = False;
}

function Game() {
  this.playerArray = [];
  this.scoreToWin = 100;
  this.activePlayerIndex = 0;
}

Game.prototype.setScoreToWin = function(newScore) {
  this.scoreToWin = newScore;
}

Game.prototype.addPlayer = function(playerName) {
  this.playerArray.push(new Player(playerName));
  this.playerArray[this.playerArray.length-1].playerID = 'player' + this.playerArray.length;
}

Game.prototype.checkForWinner = function() {
  for(var i=0; i<this.playerArray.length; i++) {
    if(this.playerArray[i].totalScore>this.scoreToWin) {
      return this.playerArray[i].name;
    }
  }
  return false;
}

Game.prototype.nextPlayer = function() {
  let oldPlayerIndex = this.activePlayerIndex;
  if (this.activePlayerIndex === this.playerArray.length-1) {
    this.activePlayerIndex = 0;
    this.playerArray[oldPlayerIndex].isTurn = false;
    this.playerArray[0].isTurn = true;
    return;
  }
  this.playerArray[oldPlayerIndex].isTurn = false;
  this.activePlayerIndex++;
  this.playerArray[this.activePlayerIndex].isTurn = true;
  return;
}


$(document).ready(function() {
  var currentGame = new Game();
  $('#game-initializer').submit(function(event) {
    event.preventDefault();
    currentGame.addPlayer($('#player1name').val());
    currentGame.addPlayer($('#player2name').val());
    currentGame.setScoreToWin($('#score-to-win').val());
$('#player1>h3').text('Player 1: ' + currentGame.playerArray[0].name);
  });
  $('#reset-game').click(function() {
    currentGame = new Game();
    $('#player1name').val('');
    $('#player2name').val('');
    $('#score-to-win').val('');
  });
});