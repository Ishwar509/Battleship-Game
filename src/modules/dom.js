import { getRandomColor } from './utils';

const playerBoard = document.querySelector('.player');
const computerBoard = document.querySelector('.computer');
const messageContainer = document.querySelector('#message');

const gridSize = 8;

function createBoardDisplay() {
   createGrid(playerBoard);
   createGrid(computerBoard);
}

function createGrid(container) {
   container.innerHTML = "";

   for (let i = 0; i < gridSize; ++i) {
      for (let j = 0; j < gridSize; ++j) {
         const cell = createCell(i, j);
         container.appendChild(cell);
      }
   }
}

function createCell(i, j) {
   const cell = document.createElement('div');
   cell.classList.add('cell');
   cell.dataset.x = i;
   cell.dataset.y = j;

   return cell;
}

function createShipComponent(ship) {
   const cellSize = 60;
   const shipComponent = document.createElement('div');

   shipComponent.classList.add('ship', ship.name);
   shipComponent.style.backgroundColor = getRandomColor();
   shipComponent.style.top = '0px';
   shipComponent.style.left = '0px';
   shipComponent.style.width = `${Math.max(
      cellSize,
      ship.orientation.y * ship.length * cellSize
   )}px`;
   shipComponent.style.height = `${Math.max(
      cellSize,
      ship.orientation.x * ship.length * cellSize
   )}px`;

   return shipComponent;
}

function markCell({cell, hit}, boardDisplay){
   const gridCell = boardDisplay.querySelector(`[data-x="${cell[0]}"][data-y="${cell[1]}"]`);
   
   if(gridCell.classList.contains('hit')) return null;

   gridCell.classList.add('hit');
   if(hit) gridCell.classList.add('success');
   const el = document.createElement('span');
   el.innerHTML = '&times;'
   gridCell.prepend(el);
}

function showMessage(message){
   messageContainer.textContent = message;
}

export { createBoardDisplay, createShipComponent, markCell, showMessage };
