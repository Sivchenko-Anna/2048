import { Grid } from "./grid.js";
import { Square } from "./square.js";

const gameBoard = document.querySelector(".game-board");

const grid = new Grid(gameBoard);
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));

setHandleKeypressOnce();

//подписываемся на нажатие клавиши
export function setHandleKeypressOnce() {
  window.addEventListener("keydown", handleKeypress, { once: true });
}

//обрабатываем нажатие клавиш
function handleKeypress(event) {
  switch (event.key) {
    case "ArrowUp":
      moveUp();
      break;
    case "ArrowDown":
      moveDown();
      break;
    case "ArrowRight":
      moveRight();
      break;
    case "ArrowLeft":
      moveLeft();
      break;

    default:
      setHandleKeypressOnce();
      return;
  }
  setHandleKeypressOnce();
}

function moveUp() {
  slideSquare(grid.cellsColumnGroup);
}

function slideSquare(cellsGroup) {
  console.log(cellsGroup);
}