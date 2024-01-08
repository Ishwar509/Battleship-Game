import PlacementHandler from './shipPlacementHandler';
import { generateShips } from './utils';

class GameBoardHandler {
   constructor() {
      this.boardSize = 8;
      this.Ships = generateShips();
      this.board = this.createboard(this.boardSize);
      this.placeShipsRandomly();
   }

   createboard(size) {
      return new Array(size).fill(null).map(() => new Array(size).fill(null));
   }

   placeShipsRandomly() {
      PlacementHandler.placeRandom(this.Ships, this.board);
   }

   placeShipAt(ship, strtCell, dir) {
      return PlacementHandler.tryToPlace(ship, this.board, strtCell, dir);
   }

   removeShip(ship) {
      PlacementHandler.removeShipFromBoard(ship, this.board);
   }

   areShipsSunk() {
      return !this.Ships.some((ship) => !ship.isSunk());
   }

   receiveAttack([x, y]) {
      if (this.board[x][y] === null) {
         return false;
      }

      const ship = this.board[x][y];
      ship.hit();
      this.board[x][y] = null;
      return true;
   }

   getShips() {
      return this.Ships;
   }

   getBoard() {
      return this.board;
   }
}

export default GameBoardHandler;
