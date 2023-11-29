import { Grid } from "./grid.js";
import { Square } from "./square.js";

const gameBoard = document.querySelector(".game-board");

const grid = new Grid(gameBoard);
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));

setHandleKeypressOnce();

// подписка на нажатие клавиши
export function setHandleKeypressOnce() {
  window.addEventListener("keydown", handleKeypress, { once: true });
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

  setHandleKeypressOnce();
}

// смещение квадратов в группе
function slideSquaresInGroup(group, promises) {
  for (let i = 1; i < group.length; i++) {
    if (group[i].isEmpty()) {
      continue;
    }

    const cellWithSquare = group[i];

    let targetCell;
    let j = i - 1;

    while (j >= 0 && group[j].canAcceptSquare(cellWithSquare.linkedSquare)) {
      targetCell = group[j];
      j--;
    }

    if (!targetCell) {
      continue;
    }

    promises.push(cellWithSquare.linkedSquare.waitForEndTransition());

    if (targetCell.isEmpty()) {
      targetCell.setLinkSquare(cellWithSquare.linkedSquare);
    } else {
      targetCell.setLinkSquareForMerge(cellWithSquare.linkedSquare);
    }

    cellWithSquare.removeLinkSquare();
  }
}

// смещение и объединение группы ячеек
async function slideSquare(cellsGroup) {
  const promises = [];

  cellsGroup.forEach((group) => {
    slideSquaresInGroup(group, promises);
  });

  await Promise.all(promises);

  grid.cells.forEach(cell => {cell.hasSquareForMerge() && cell.mergeSquares()})
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

function canMove(cellsGroup) {
  return cellsGroup.some((group) => canMoveInGroup(group));
}

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

// проверка возможности движения группы квадратов
function canMoveInGroup(group) {
  return group.some((cell, index) => {
    if(index === 0) {
      return false;
    }

    if (cell.isEmpty()) {
      return false;
    }

    const targetCell = group[index - 1];
    return targetCell.canAcceptSquare(cell.linkedSquare);
  })
}