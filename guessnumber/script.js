'use strict';
const maxNumber = 20;
const resetNumber = () => Math.trunc(Math.random() * maxNumber) + 1;
const displayText = (selector, value) =>
    (document.querySelector(selector).textContent = value);
const getValue = (selector, value) =>
    (document.querySelector(selector).value = value);
const newStyle = selector => document.querySelector(selector).style;

let number = resetNumber();
let score = maxNumber;
let highscore = 0;

document.querySelector('.check').addEventListener('click', function() {
    let guess = Number(document.querySelector('.guess').value);
    if (!guess) {
        displayText('.message', '📛No Number!');
    } else if (guess === number) {
        displayText('.message', '🎉 YAY! You are Correct!');
        displayText('.number', number);
        newStyle('body').backgroundColor = '#60b347';
        if (score > highscore) {
            highscore = score;
            displayText('.highscore', highscore);
        }
    } else if (guess !== number) {
        if (score > 1) {
            displayText(
                '.message',
                guess < number ? '🤔 Too Low! 📉' : '🤔 Too High! 📈'
            );
            score--;
            displayText('.score', score);
        } else {
            displayText('.message', 'GAME OVER!😫');
            displayText('.score', 0);
        }
    }
});

document.querySelector('.again').addEventListener('click', function() {
    score = maxNumber;
    number = resetNumber();
    displayText('.message', 'Start guessing..');
    displayText('.score', score);
    displayText('.number', '?');
    getValue('.guess', '');
    newStyle('body').backgroundColor = '#222';
});