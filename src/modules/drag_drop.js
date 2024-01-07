import { getRandomColor } from './utils';
import { createShipComponent } from './dom';
import PlacementHandler from './shipPlacementHandler';

let playerBoard = null;
let Cells = null;
const mapper = new Map();

let board = null;
let currShip = null;
let initialX = null;
let initialY = null;
let isdragging = false;
let startCell = null;

function enableDragDrop(gameboard) {
   playerBoard = document.querySelector('.player');
   Cells = document.querySelectorAll('.player .cell');

   board = gameboard.getBoard();
   initShipComponents(gameboard.getShips());

   for (const shipComponent of mapper.keys()) {
      shipComponent.addEventListener('mousedown', handleDragStart);
      shipComponent.addEventListener('mouseup', handleDragEnd);
      shipComponent.addEventListener('mouseup', rotateShip);
   }

   document.addEventListener('mousemove', handleDragging);
   playerBoard.addEventListener('contextmenu', (e) => e.preventDefault());
}

function disableDragDrop(){
    for (const shipComponent of mapper.keys()) {
       shipComponent.removeEventListener('mousedown', handleDragStart);
       shipComponent.removeEventListener('mouseup', handleDragEnd);
       shipComponent.removeEventListener('mouseup', rotateShip);
    }
}

function initShipComponents(Ships) {
   mapper.clear();

   Ships.forEach((ship) => {
      const shipComponent = createShipComponent(ship);
      mapper.set(shipComponent, ship);
      const [x, y] = ship.coordinates[0];
      const cell = playerBoard.querySelector(`[data-x="${x}"][data-y="${y}"]`);
      cell.appendChild(shipComponent);
   });
}

function handleDragStart(e) {
   currShip = e.target;
   currShip.classList.add('dragging');
   currShip.style.removeProperty('background-color');
   
   isdragging = true;
   initialX = e.clientX;
   initialY = e.clientY;
}

function handleDragEnd(e) {
   if (isdragging) {
      currShip.classList.remove('dragging');
      currShip.classList.remove('notplaceable');
      currShip.style.left = '0px';
      currShip.style.top = '0px';

      const cell = startCell;
      if (!cell || !isPlaceable(cell, currShip)) {
         const prevCoords = mapper.get(currShip).coordinates;
         prevCoords.forEach(([x, y]) => (board[x][y] = mapper.get(currShip)));  
      } else {
         cell.appendChild(currShip);
      }
   }

   isdragging = false;
   currShip.style.backgroundColor = getRandomColor();
   clearHighlight();
}

function handleDragging(e) {
   if (isdragging) {
      const prevCoords = mapper.get(currShip).coordinates;
      prevCoords.forEach(([x, y]) => (board[x][y] = null));

      currShip.style.left = `${e.clientX - initialX}px`;
      currShip.style.top = `${e.clientY - initialY}px`;

      if (startCell !== findStartCell()) {
         clearHighlight();
      }

      startCell = findStartCell();
      highlightCells(startCell);
   }
}

function rotateShip(e) {
   if (e.button === 2) {
      const cellSize = 60;
      const shipComponent = e.target;
      const ship = mapper.get(shipComponent);
      const newdir = {
         x: 1 - ship.orientation.x,
         y: 1 - ship.orientation.y
      };

      PlacementHandler.tryToPlace(ship, board, ship.coordinates[0], newdir);

      shipComponent.style.width = `${Math.max(
         cellSize,
         ship.orientation.y * ship.length * cellSize
      )}px`;
      shipComponent.style.height = `${Math.max(
         cellSize,
         ship.orientation.x * ship.length * cellSize
      )}px`;
   }
}

function findStartCell() {
   let minDist = Infinity;
   const maxMinDist = 60;

   Cells.forEach((cell) => {
      const dist =
         Math.abs(
            cell.getBoundingClientRect().x - currShip.getBoundingClientRect().x
         ) +
         Math.abs(
            cell.getBoundingClientRect().y - currShip.getBoundingClientRect().y
         );
      if (dist < minDist) {
         startCell = cell;
         minDist = dist;
      }
   });

   if (minDist > maxMinDist) return null;

   return startCell;
}

function isPlaceable(cell, shipComponent) {
   const strtCell = [Number(cell.dataset.x), Number(cell.dataset.y)];
   const ship = mapper.get(shipComponent);
   return PlacementHandler.tryToPlace(ship, board, strtCell, ship.orientation);
}

function highlightCells(cell) {
   if (cell) {
      const reqlength = mapper.get(currShip).length;
      const nearbyCells = getNearbyCells(cell, reqlength);

      if (nearbyCells.length === reqlength) {
         nearbyCells.forEach((el) => {
            el.classList.add('highlight');
         });
         currShip.classList.remove('notplaceable');
         return;
      }
   }

   currShip.classList.add('notplaceable');
}

function getNearbyCells(cell, length) {
   const cellList = [];

   if (!cell) return cellList;

   const strtx = Number(cell.dataset.x);
   const strty = Number(cell.dataset.y);
   const currDir = mapper.get(currShip).orientation;

   for (let i = 0; i < length; ++i) {
      const nx = strtx + i * currDir.x;
      const ny = strty + i * currDir.y;

      const el = document.querySelector(`[data-x="${nx}"][data-y="${ny}"]`);
      if (el && board[nx][ny] === null) cellList.push(el);
   }

   return cellList;
}

function clearHighlight() {
   const highlightedCells = document.querySelectorAll('.highlight');
   highlightedCells.forEach((cell) => {
      cell.classList.remove('highlight');
   });
}

export { enableDragDrop, disableDragDrop };
