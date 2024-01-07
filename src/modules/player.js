import GameBoard from "./gameboard";

class Player {
    constructor(name){
        this.name = name;
        this.gameboard = new GameBoard();
    }
}

export default Player;