import Ship from './ship';

const horizontal = {
   x: 0,
   y: 1
};

const vertical = {
   x: 1,
   y: 0
};

const dirs = [horizontal, vertical];

function selectRandom(array) {
   const randomNum = Math.floor(Math.random() * array.length);
   return array[randomNum];
}

function getRandomDirection() {
   return selectRandom(dirs);
}

function getRandomEmptyCell(board) {
   const emptyCells = [];

   for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board.length; ++j) {
         if (board[i][j] === null) {
            emptyCells.push([i, j]);
         }
      }
   }

   return selectRandom(emptyCells);
}

function generateShips() {
   const Ships = [
      new Ship('Hydra', 5),
      new Ship('Pegasus', 4),
      new Ship('Orion', 3),
      new Ship('Scorpius', 2),
      new Ship('Leo', 1)
   ];

   return Ships;
}

function getRandomColor() {
   const color = `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
      Math.random() * 255
   }, ${0.5})`;

   return color;
}

function checkBound([x, y], board) {
   return x >= 0 && x < board.length && y >= 0 && y < board.length;
}

function calculateScore(board){
   console.log(board);
   let missCount = 0;

   for (let i = 0; i < board.length; ++i) {
      for (let j = 0; j < board.length; ++j) {
         if (board[i][j] === 'miss') missCount += 1;
      }
   }

   return Math.ceil((15 / missCount) * 10000);
}

export {
   getRandomEmptyCell,
   getRandomDirection,
   generateShips,
   getRandomColor,
   checkBound,
   calculateScore
};
