// VARIABLES

const nav = document.querySelector('.nav');
const menu = document.querySelector('.menu');
const side = document.querySelector('.sideMenu');
const difficulty = document.querySelector('.difficulty');
const easy = document.querySelector('.easy');
const medium = document.querySelector('.medium');
const hard = document.querySelector('.hard');
const very = document.querySelector('.very');
const table = document.querySelector('.section-main');
const cards = document.querySelectorAll('.card');
const time = document.querySelector('.time');
const moveCount = document.querySelector('.moves');
const newGame = document.querySelector('.new');
const congrats = document.querySelector('.congrats');
const field = document.querySelector('.name');
const ok = document.querySelector('.btn-ok');
const ldrBtn = document.querySelector('.leaders');
const autors = document.querySelector('.autors');
const btnCloseLead = document.querySelector('.lead');
const defeat = document.querySelector('.defeat');
const btnDef = document.querySelector('.btn-def');
const btnAut = document.querySelector('.btn-aut');
const autorsList = document.querySelector('.autors-list');
const movesAmount = document.querySelector('.moves-amount');

const board = document.querySelector('.leaderboard');
const name1 = document.querySelector('.name1');
const moves1 = document.querySelector('.moves1');
const name2 = document.querySelector('.name2');
const moves2 = document.querySelector('.moves2');
const name3 = document.querySelector('.name3');
const moves3 = document.querySelector('.moves3');
const name4 = document.querySelector('.name4');
const moves4 = document.querySelector('.moves4');
const name5 = document.querySelector('.name5');
const moves5 = document.querySelector('.moves5');
const name6 = document.querySelector('.name6');
const moves6 = document.querySelector('.moves6');
const name7 = document.querySelector('.name7');
const moves7 = document.querySelector('.moves7');
const name8 = document.querySelector('.name8');
const moves8 = document.querySelector('.moves8');
const name9 = document.querySelector('.name9');
const moves9 = document.querySelector('.moves9');
const name10 = document.querySelector('.name10');
const moves10 = document.querySelector('.moves10');

let isPlay = false;
let isTurned = false;
let isBlocked = false;
let firstCard;
let secondCard;
let sec;
let leaders;
let timer;
let move = 0;
let match = 0;

//LISTENERS

nav.addEventListener('click', openMenu);
newGame.addEventListener('click', chooseDiff);
ldrBtn.addEventListener('click', showLeaderBoard);
btnCloseLead.addEventListener('click', closeLeaderBoard);
autors.addEventListener('click', showCredits);
btnAut.addEventListener('click', closeCredits);
btnDef.addEventListener('click', closeDef);
easy.addEventListener('click', timeEasy);
easy.addEventListener('click', startNewGame);
medium.addEventListener('click', timeMedium);
medium.addEventListener('click', startNewGame);
hard.addEventListener('click', timeHard);
hard.addEventListener('click', startNewGame);
very.addEventListener('click', timeVery);
very.addEventListener('click', startNewGame);
cards.forEach(card => card.addEventListener('click', turnCard));
ok.addEventListener('click', setLocalStorage);
ok.addEventListener('click', showLeaderBoard);
window.addEventListener('load', getLocalStorage);

function openMenu() {
  side.style.display = 'flex';
}

// DIFFICULTY LEVEL

function chooseDiff() {
  clearInterval(timer);
  menu.style.display = 'none';
  difficulty.style.display = 'flex';
}

function getTime(num) {
  let seconds = parseInt(num);
  let minutes = parseInt(seconds / 60);
  seconds -= minutes * 60;
  let hours = parseInt(minutes / 60);
  minutes -= hours * 60;
  if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
  return `${String(hours).padStart(2, 0)}:${String(minutes).padStart(2, 0)}:${String(seconds % 60).padStart(2, 0)}`;
}

function timeEasy() {
  sec = 300;
  time.textContent = getTime(sec);
}
function timeMedium() {
  sec = 120;
  time.textContent = getTime(sec);
}
function timeHard() {
  sec = 60;
  time.textContent = getTime(sec);
}
function timeVery() {
  sec = 30;
  time.textContent = getTime(sec);
}

// START GAME

function startNewGame() {
  match = 0;
  isPlay = true;
  table.style.display = 'flex';
  menu.style.display = 'flex';
  difficulty.style.display = 'none';
  cards.forEach(card => card.classList.remove('turn'));
  cards.forEach(card => card.addEventListener('click', turnCard));
  move = 0;
  movesCount();
  resetCards();
  shuffleCards();
  timer = setInterval(function() {
    sec--
    time.textContent = getTime(sec);
    if (sec === 0) {
      endTime();
    }
  }, 1000);
}

// BASIC GAME FUNCTIONS

function shuffleCards() {
  cards.forEach(card => {
    let ramdom = Math.floor(Math.random() * 20);
    card.style.order = ramdom;
  });
};

function movesCount() {
  moveCount.textContent = move;
};

function turnCard() {
  if (isBlocked === true) {
    return;
  }
  if (this === firstCard) {
    return;
  }
  this.classList.add('turn');
  if (isTurned === false) {
    isTurned = true;
    firstCard = this;
    return;
  }
  secondCard = this;
  move++;
  movesCount();
  checkCards();
}

function checkCards() {
  if (firstCard.dataset.eddie === secondCard.dataset.eddie) {
    openCards();
    match++;
    endGame();
    return;
  }
  closeCards();
}

function openCards() {
  firstCard.removeEventListener('click', turnCard);
  secondCard.removeEventListener('click', turnCard);
  resetCards();
}

function closeCards() {
  isBlocked = true;
  setTimeout(() => {
    firstCard.classList.remove('turn');
    secondCard.classList.remove('turn');
    resetCards();
  }, 1000);
}

function resetCards() {
  isTurned = false;
  isBlocked = false;
  firstCard = null;
  secondCard = null;
}

function endGame() {
  if (match === 10) {
    clearInterval(timer);
    table.style.display = 'none';
    menu.style.display = 'none';
    congrats.style.display = 'flex';
    field.focus();
    movesAmount.textContent = move + ' moves';
    isPlay = false;
  }
}

function endTime() {
  if (sec === 0) {
    clearInterval(timer);
    table.style.display = 'none';
    menu.style.display = 'none';
    defeat.style.display = 'flex';
    isPlay = false;
  }
};

// LEADERBOARD

function getLocalStorage() {
  leaders = JSON.parse(localStorage.getItem('leaders'));
  if (leaders === null) {
    leaders = [
      {
        name: 'Eddie',
        moves: 13
      },
      {
        name: 'The Beast',
        moves: 666
      },
      {
        name: 'Bruce',
        moves: 22
      },
    ];
  }
  localStorage.setItem('leaders', JSON.stringify(leaders));
}

function setLocalStorage() {
  leaders.push({name:field.value, moves:move});
  localStorage.setItem('leaders', JSON.stringify(leaders));
}

function showLeaderBoard() {
  if (isPlay === false) {
    board.style.display = 'flex';
    congrats.style.display = 'none';
    let sortArray = JSON.parse(localStorage.getItem('leaders')).sort((a, b) => (a.moves > b.moves) ? 1 : -1);
    name1.textContent = sortArray[0].name;
    moves1.textContent = sortArray[0].moves;
    name2.textContent = sortArray[1].name;
    moves2.textContent = sortArray[1].moves;
    name3.textContent = sortArray[2].name;
    moves3.textContent = sortArray[2].moves;
    name4.textContent = sortArray[3].name;
    moves4.textContent = sortArray[3].moves;
    name5.textContent = sortArray[4].name;
    moves5.textContent = sortArray[4].moves;
    name6.textContent = sortArray[5].name;
    moves6.textContent = sortArray[5].moves;
    name7.textContent = sortArray[6].name;
    moves7.textContent = sortArray[6].moves;
    name8.textContent = sortArray[7].name;
    moves8.textContent = sortArray[7].moves;
    name9.textContent = sortArray[8].name;
    moves9.textContent = sortArray[8].moves;
    name10.textContent = sortArray[9].name;
    moves10.textContent = sortArray[9].moves;
  }
}

function closeLeaderBoard() {
  board.style.display = 'none';
  menu.style.display = 'flex';
  table.style.display = 'none';
}

function closeDef() {
  defeat.style.display = 'none';
  menu.style.display = 'flex';
}

function showCredits() {
  if (isPlay === false) {
    autorsList.style.display = 'flex';
  }
}

function closeCredits() {
  autorsList.style.display = 'none';
}