import { Grid } from "./grid.js";
import { Square } from "./square.js";
import { slideSquaresInGroup, canMove } from "./move.js";

const gameBoard = document.querySelector(".game-board");

const grid = new Grid(gameBoard);
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));

// подписка на нажатие клавиши
export function setHandleKeypressOnce() {
  window.addEventListener("keydown", handleKeypress, { once: true });
}

setHandleKeypressOnce();

function canMoveUp() {
  return canMove(grid.cellsColumnGroup);
}

function canMoveDown() {
  return canMove(grid.cellsColumnGroupRevers);
}

function canMoveRight() {
  return canMove(grid.cellsRowGroupRevers);
}

function canMoveLeft() {
  return canMove(grid.cellsRowGroup);
}

// смещение и объединение группы ячеек
async function slideSquare(cellsGroup) {
  const promises = [];

  cellsGroup.forEach((group) => {
    slideSquaresInGroup(group, promises);
  });

  await Promise.all(promises);

  grid.cells.forEach((cell) => {
    cell.hasSquareForMerge() && cell.mergeSquares();
  });
}

async function moveUp() {
  await slideSquare(grid.cellsColumnGroup);
}

async function moveDown() {
  await slideSquare(grid.cellsColumnGroupRevers);
}

async function moveRight() {
  await slideSquare(grid.cellsRowGroupRevers);
}

async function moveLeft() {
  await slideSquare(grid.cellsRowGroup);
}

// обработка нажатия клавиш
async function handleKeypress(event) {
  switch (event.key) {
    case "ArrowUp":
      if (!canMoveUp()) {
        setHandleKeypressOnce();
        return;
      }
      await moveUp();
      break;
    case "ArrowDown":
      if (!canMoveDown()) {
        setHandleKeypressOnce();
        return;
      }
      await moveDown();
      break;
    case "ArrowRight":
      if (!canMoveRight()) {
        setHandleKeypressOnce();
        return;
      }
      await moveRight();
      break;
    case "ArrowLeft":
      if (!canMoveLeft()) {
        setHandleKeypressOnce();
        return;
      }
      await moveLeft();
      break;

    default:
      setHandleKeypressOnce();
      return;
  }

  const newSquare = new Square(gameBoard);
  grid.getEmptyCell().setLinkSquare(newSquare);

  if (!canMoveUp() && !canMoveDown() && !canMoveRight() && !canMoveLeft()) {
    await newSquare.waitForEndAnimation();
    alert("Try again!");
    return;
  }

  setHandleKeypressOnce();
}
