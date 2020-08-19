const word = document.getElementById('word');
const text = document.getElementById('text');
const scoreEl = document.getElementById('score');
const timeEl = document.getElementById('time');
const endgameEl = document.getElementById('end-game-container');
const settingsBtn = document.getElementById('settings-btn');
const settings = document.getElementById('settings');
const settingsForm = document.getElementById('settings-form');
const difficultySetting = document.getElementById('difficulty');

// List of words for game
const words = [
  'hello',
  'endeavor',
  'brighten',
  'llama',
  'butter',
  'abstain',
  'monitor',
  'allegiance',
  'elegant',
  'population',
  'cliff',
  'protein',
  'parkour',
];

// init word
let randomWord;

// init score
let score = 0;

// initial time
let time = 10;

// init difficulty
let difficulty = localStorage.getItem('difficulty') || 'medium';
difficultySetting.value = difficulty;

// Focus on text on start
text.focus();

// Start counting down
const timeInterval = setInterval(updateTime, 1000);

// Pull a random word from our list
function getRandomWord() {
  return words[Math.floor(Math.random() * words.length)];
}

// add word to DOM
function addWordToDOM() {
  randomWord = getRandomWord();
  word.innerText = randomWord;
}

function updateScore() {
  scoreEl.innerText = ++score;
}

// Update time
function updateTime() {
  timeEl.innerText = `${--time}s`;

  if (time <= 0) {
    clearInterval(timeInterval);

    //end game
    gameOver();
  }
}

// Game over show end screen
function gameOver() {
  endgameEl.innerHTML = `
    <h1>Time ran out</h1>
    <p>Your final score is ${score}.</p>
    <button onclick="window.location.reload()">Reload</button>
  `;

  endgameEl.style.display = 'flex';
}

// Event Listener

// Typing
text.addEventListener('input', (e) => {
  const insertedText = e.target.value;

  if (insertedText === randomWord) {
    addWordToDOM();
    updateScore();

    // Clear
    e.target.value = '';

    let additionalSeconds = 0;
    switch (difficulty) {
      case 'hard':
        additionalSeconds = 1;
        break;
      case 'medium':
        additionalSeconds = 2;
        break;
      case 'easy':
        additionalSeconds = 3;
        break;
      default:
        additionalSeconds = 0;
        break;
    }
    time += additionalSeconds;

    updateTime();
  }
});

// settings button clicked
settingsBtn.addEventListener('click', () => {
  settings.classList.toggle('hide');
});

// settings select
settingsForm.addEventListener('change', (e) => {
  difficulty = e.target.value;
  localStorage.setItem('difficulty', difficulty);
});

addWordToDOM();
