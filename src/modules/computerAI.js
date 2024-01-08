import { checkBound, getRandomEmptyCell } from './utils';

class AI {
   constructor(attackfn) {
      this.board = this.createBoard(8);
      this.nextMoves = [];
      this.currHitCells = [];
      this.attackfn = attackfn;
   }

   createBoard(size) {
      return new Array(size).fill(null).map(() => new Array(size).fill(null));
   }


   playMove() {
      if (this.nextMoves.length > 0) {
         return this.playSmart();
      }

      return this.playRandom();
   }

   playRandom() {
      const response = {};
      const cell = getRandomEmptyCell(this.board);
      response.cell = cell;
      response.hit = false;

      if (this.isHit(cell)) {
         response.hit = true;
         this.currHitCells = [];
         this.currHitCells.push(cell);
         const hitDir = this.calcHitDirection();
         this.setNextMoves(cell, hitDir);
      }

      return response;
   }

   playSmart() {
      const response = {};
      const cell = this.nextMoves.pop();
      response.cell = cell;
      response.hit = false;

      if (this.isHit(cell)) {
         response.hit = true;
         this.currHitCells.push(cell);

         const hitDir = this.calcHitDirection();

         if (!this.setNextMoves(cell, hitDir)) {
            this.changeDir();
         }
      } else if (this.currHitCells.length > 1) {
         this.changeDir();
      }

      return response;
   }

   isHit([x, y]) {
      this.board[x][y] = '#';
      const response = this.attackfn([x, y]);
      return response;
   }

   calcHitDirection() {
      const len = this.currHitCells.length;
      const dir = [
         [0, 1],
         [1, 0],
         [0, -1],
         [-1, 0]
      ];

      if (len > 1) {
         const [x2, y2] = this.currHitCells[len - 1];
         const [x1, y1] = this.currHitCells[len - 2];

         return [[x2 - x1, y2 - y1]];
      }

      return dir;
   }

   changeDir() {
      this.currHitCells.reverse();

      const revHitDir = this.calcHitDirection();
      this.setNextMoves(...this.currHitCells.slice(-1), revHitDir);
   }

   setNextMoves([x, y], dir) {
      this.nextMoves = [];

      for (let i = 0; i < dir.length; ++i) {
         const nX = x + dir[i][0];
         const nY = y + dir[i][1];

         if (checkBound([nX, nY], this.board) && this.board[nX][nY] === null) {
            this.nextMoves.push([nX, nY]);
         }
      }

      return this.nextMoves.length !== 0;
   }
}

export default AI;
