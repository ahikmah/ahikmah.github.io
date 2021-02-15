'use strict';

let activePlayer, currentScore, score;

// Button
const btnNewEl = document.querySelector('.btn--new');
const btnRollEl = document.querySelector('.btn--roll');
const btnHoldEl = document.querySelector('.btn--hold');

// Player
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');

// Current Score
const currentScore0El = document.querySelector('#current--0');
const currentScore1El = document.querySelector('#current--1');

// Score
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

// Other components
const diceEl = document.querySelector('.dice');
const winner = document.querySelector('.winner');

const actRemove = (selector, value) => selector.classList.remove(value);
const actAdd = (selector, value) => selector.classList.add(value);

const switchPlayer = function() {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
    activePlayer
        ?
        (currentScore0El.textContent = currentScore) :
        (currentScore1El.textContent = currentScore);
};

const calcCurrentScore = function(dice, activePlayer) {
    currentScore += dice;
    document.querySelector(
        `#current--${activePlayer}`
    ).textContent = currentScore;
};

const saveScore = function(activePlayer) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
        score[activePlayer];
    currentScore = 0;
    currentScoreEl.textContent = currentScore;

    if (score[activePlayer] >= 20) {
        winner.textContent = `Player ${activePlayer + 1} Win 🏆`;
        winner.classList.toggle('hidden');
        document
            .querySelector(`.player--${activePlayer}`)
            .classList.add('player--winner');
        btnRollEl.classList.toggle('hidden');
        btnHoldEl.classList.toggle('hidden');
    }
};

const init = function() {
    activePlayer = 0;
    currentScore = 0;
    score = [0, 0];
    score0El.textContent = 0;
    score1El.textContent = 0;
    currentScore0El.textContent = 0;
    currentScore1El.textContent = 0;
    actAdd(winner, 'hidden');
    actAdd(diceEl, 'hidden');
    actAdd(player0El, 'player--active');
    actRemove(player1El, 'player--active');
    actRemove(player0El, 'player--winner');
    actRemove(player1El, 'player--winner');
    actRemove(btnRollEl, 'hidden');
    actRemove(btnHoldEl, 'hidden');
};
init();

const currentScoreEl = document.querySelector(`#current--${activePlayer}`);

// ROLL DICE
btnRollEl.addEventListener('click', function() {
    // 1. Generate random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    // 2. Display dice
    actRemove(diceEl, 'hidden');
    diceEl.src = `dice-${dice}.png`;

    // 3. Check for rolled 1
    if (dice === 1) {
        document.querySelector(
            `#current--${activePlayer}`
        ).textContent = currentScore;
        switchPlayer();

        setTimeout(() => diceEl.classList.add('hidden'), 1000);
    } else {
        currentScore += dice;
        document.querySelector(
            `#current--${activePlayer}`
        ).textContent = currentScore;
    }
});

// HOLD SCORE
btnHoldEl.addEventListener('click', function() {
    actAdd(diceEl, 'hidden');
    saveScore(activePlayer);
    switchPlayer();
});

btnNewEl.addEventListener('click', init);