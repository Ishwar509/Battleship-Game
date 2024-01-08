import { playRound, initializeGame, startGame } from './gameContoller';

const mainButton = document.querySelector('.main');

function initUI() {
   mainButton.addEventListener('click', handleMainBtnClick);
}

function handleMainBtnClick(e) {
   if (mainButton.classList.contains('start')) {
      startGame();
      mainButton.textContent = 'New Game';
   } else {
      initializeGame();
      mainButton.textContent = 'Play';
   }

   mainButton.classList.toggle('start');
}

function enableAttackUI(boardDisplay) {
   boardDisplay.addEventListener('click', attackCell);
}

function disableAttackUI(boardDisplay) {
   boardDisplay.removeEventListener('click', attackCell);
}

function attackCell(e) {
   if (e.target.classList.contains('hit')) return;
   
   if (e.target.classList.contains('cell')) {
      const x = e.target.dataset.x;
      const y = e.target.dataset.y;

      playRound([x, y]);
   }
}

export { enableAttackUI, disableAttackUI, initUI };
