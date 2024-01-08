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

      this.removeShipFromBoard(ship, board);

      const newCoords = this.#getNewCoordinates(
         ship.length,
         strtCell,
         board,
         dir
      );

      if (newCoords.length < ship.length) {
         ship.coordinates.forEach(([x, y]) => (board[x][y] = ship));
         return false;
      }

      ship.coordinates = newCoords;
      ship.orientation = dir;
      newCoords.forEach(([x, y]) => (board[x][y] = ship));
      return true;
   }

   static #getNewCoordinates(length, strtCell, board, dir) {
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

   static removeShipFromBoard(ship, board) {
      ship.coordinates.forEach(([x, y]) => {
         board[x][y] = null;
      });
   }
}

export default PlacementHandler;
