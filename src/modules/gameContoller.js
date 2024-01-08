import { createBoardDisplay, markCell, showMessage } from './dom';
import { enableDragDrop, disableDragDrop } from './drag_drop';
import { enableAttackUI, disableAttackUI } from './gameUI';
import Player from './player';
import AI from './computerAI';

let human = null;
let computer = null;
let winner = null;

let playerBoardDisplay = null;
let computerBoardDisplay = null;

function initializeGame() {
   createBoardDisplay();
   createPlayers();
   playerBoardDisplay = document.querySelector('.player');
   computerBoardDisplay = document.querySelector('.computer');
   enableDragDrop(human);
   disableAttackUI(computerBoardDisplay);
   showMessage('Drag & Drop Ships. Right Click to Rotate');
}

function startGame() {
   winner = null;
   disableDragDrop();
   enableAttackUI(computerBoardDisplay);
   showMessage('');
}

function playRound(playerSelection) {
   if (isGameOver()) return null;

   const isHit = computer.gameboardHandler.receiveAttack(playerSelection);
   
   markCell({ cell: playerSelection, hit: isHit }, computerBoardDisplay);

   if (isGameOver()) return null;

   const response = computer.AI.playMove();
   markCell(response, playerBoardDisplay);

   if (isGameOver()) return null;
}

function isGameOver() {
   if (human.gameboardHandler.areShipsSunk()) {
      winner = computer;
   } else if (computer.gameboardHandler.areShipsSunk()) {
      winner = human;
   }

   if (winner !== null) {
      showMessage(`${winner.name} wins!`);
   }

   return winner !== null;
}

function createPlayers() {
   human = new Player('Human');
   computer = new Player('Computer');
   computer.AI = new AI(
      human.gameboardHandler.receiveAttack.bind(human.gameboardHandler)
   );
}

export { playRound, initializeGame, startGame };
