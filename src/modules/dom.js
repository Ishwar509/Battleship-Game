import { getRandomColor } from './utils';

const playerBoard = document.querySelector('.player');
const computerBoard = document.querySelector('.computer');

const gridSize = 8;

function createCell(i, j) {
   const cell = document.createElement('div');
   cell.classList.add('cell');
   cell.dataset.x = i;
   cell.dataset.y = j;

   return cell;
}

function createGrid(container) {
   for (let i = 0; i < gridSize; ++i) {
      for (let j = 0; j < gridSize; ++j) {
         const cell = createCell(i, j);
         container.appendChild(cell);
      }
   }
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

function init() {
   createGrid(playerBoard);
   createGrid(computerBoard);
}

export { init, createShipComponent };
