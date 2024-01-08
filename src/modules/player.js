import GameBoardHandler from "./gameboard";

class Player {
    constructor(name){
        this.name = name;
        this.gameboardHandler = new GameBoardHandler();
    }
}

export default Player;