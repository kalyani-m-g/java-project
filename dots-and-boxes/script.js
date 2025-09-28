let sessionId = null;
let cards = [];
let canClick = true;

const gameDiv = document.getElementById('game');
const movesSpan = document.getElementById('moves');
const statusP = document.getElementById('status');
const startBtn = document.getElementById('startBtn');

startBtn.onclick = async () => {
  const res = await fetch('/game/start', { method: 'POST' });
  const gameState = await res.json();
  sessionId = gameState.sessionId;
  cards = gameState.cards;
  movesSpan.textContent = gameState.moves;
  statusP.textContent = '';
  renderCards();
};

function renderCards() {
  gameDiv.innerHTML = '';
  cards.forEach((card, index) => {
    const div = document.createElement('div');
    div.className = 'card';
    if (card.matched) div.classList.add('matched');
    else if (card.faceUp) div.classList.add('face-up');
    div.textContent = (card.faceUp || card.matched) ? card.value : '';
    div.onclick = () => onCardClick(index);
    gameDiv.appendChild(div);
  });
}

async function onCardClick(index) {
  if (!canClick) return;
  if (cards[index].faceUp || cards[index].matched) return;
  canClick = false;

  const res = await fetch(`/game/flip?sessionId=${sessionId}&index=${index}`, { method: 'POST' });
  const gameState = await res.json();
  cards = gameState.cards;
  movesSpan.textContent = gameState.moves;
  renderCards();

  if (gameState.gameOver) {
    statusP.textContent = '🎉 You matched all cards! Game Over!';
  }
  canClick = true;
}
