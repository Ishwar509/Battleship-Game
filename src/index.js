import {init} from './modules/dom';
import Player from './modules/player';
import { enableDragDrop } from './modules/drag_drop';

init();

const player = new Player('player');
enableDragDrop(player.gameboard);