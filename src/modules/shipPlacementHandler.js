import { getRandomEmptyCell, getRandomDirection, checkBound } from './utils';

class PlacementHandler {
   static placeRandom(Ships, board) {
      const queue = [...Ships];

      while (queue.length > 0) {
         const ship = queue.shift();

         const isShipPlaced = this.tryToPlace(ship, board);

         if (!isShipPlaced) queue.push(ship);
      }
   }

   static tryToPlace(ship, board, strtCell, dir) {
      strtCell = strtCell || getRandomEmptyCell(board);
      dir = dir || getRandomDirection();

      const prevCoords = ship.coordinates;

      prevCoords.forEach(([x, y]) => {
         board[x][y] = null;
      });

      const newCoords = this.#getNewCoordinates(ship.length, strtCell, board, dir);

      if (newCoords.length < ship.length) {
         prevCoords.forEach(([x, y]) => (board[x][y] = ship));
         return false;
      }

      ship.coordinates = newCoords;
      newCoords.forEach(([x, y]) => (board[x][y] = ship));
      ship.orientation = dir;
      return true;
   }

   static #getNewCoordinates(length, strtCell, board, dir){
    const cells = [];

    for (let i = 0; i < length; ++i) {
       const posX = strtCell[0] + i * dir.x;
       const posY = strtCell[1] + i * dir.y;

       if (checkBound([posX, posY], board) && board[posX][posY] === null) {
          cells.push([posX, posY]);
       }
    }

    return cells;
   }
}

export default PlacementHandler;
