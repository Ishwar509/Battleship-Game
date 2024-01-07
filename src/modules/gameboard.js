import PlacementHandler from './shipPlacementHandler';
import { generateShips } from './utils';

class GameBoard {
   constructor() {
      this.boardSize = 8;
      this.Ships = generateShips();
      this.createboard(this.boardSize);
      this.placeShipsRandomly();
   }

   createboard(size) {
      this.board = new Array(size)
         .fill(null)
         .map(() => new Array(size).fill(null));
   }

   placeShipsRandomly() {
      PlacementHandler.placeRandom(this.Ships, this.board);
   }

   placeShipAt(ship, strtCell, dir) {
      return PlacementHandler.tryToPlace(ship, this.board, strtCell, dir);
   }

   areShipsSunk() {
      return !this.Ships.some((ship) => !ship.isSunk());
   }

   receiveAttack([x, y]) {
      if (this.board[x][y] === null) return false;

      const ship = this.board[x][y];
      ship.hit();

      return true;
   }

   getShips() {
      return this.Ships;
   }

   getBoard(){
      return this.board;
   }
}

export default GameBoard;
