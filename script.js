'use strict';

let score, activePlayer, currentScore, nowPlaying, dice, diceNumber;
const btnNewGame = document.querySelector('.btn--new');
const btnRollDice = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//inital state
const init = function () {
  activePlayer = 0;
  dice = document.querySelector('.dice');
  currentScore = 0;
  score = [0, 0];

  dice.classList.add('hidden');

  document.querySelector('.player--0').classList.remove('player--winner');
  document.querySelector('.player--1').classList.remove('player--winner');

  document.querySelector(`.player--0`).classList.add('player--active');
  document.querySelector(`.player--1`).classList.remove('player--active');

  document.querySelector(`#current--0`).textContent = 0;
  document.querySelector(`#current--1`).textContent = 0;

  document.querySelector(`#score--0`).textContent = 0;
  document.querySelector(`#score--1`).textContent = 0;
  nowPlaying = true;
};

//change active player
const changePlayer = function () {
  currentScore = 0;

  document.querySelector(`#current--${activePlayer}`).textContent =
    currentScore;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');

  activePlayer = (activePlayer + 1) % 2;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
};

//roll-dice runner
const rollDice = function () {
  if (nowPlaying) {
    diceNumber = Math.floor(Math.random() * 6 + 1);
    dice.src = `dice-${diceNumber}.png`;
    dice.classList.remove('hidden');

    if (diceNumber != 1) {
      currentScore += diceNumber;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      changePlayer();
    }
  }
};

//holding score
const holdScore = function () {
  if (nowPlaying) {
    score[activePlayer] += currentScore;

    document.querySelector(`#score--${activePlayer}`).textContent =
      score[activePlayer];

    //not win
    if (score[activePlayer] < 100) {
      changePlayer();
    }
    //win
    else {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');

      dice.classList.add('hidden');
      nowPlaying = false;
    }
  }
};

init();

//new game button
btnNewGame.addEventListener('click', init);

//roll dice button
btnRollDice.addEventListener('click', rollDice);

//hold button
btnHold.addEventListener('click', holdScore);
