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
      await moveUp();
      break;
    case "ArrowDown":
      await moveDown();
      break;
    case "ArrowRight":
      await moveRight();
      break;
    case "ArrowLeft":
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

// смещение и объединение группы ячеек
async function slideSquare(cellsGroup) {
  const promises = [];

  cellsGroup.forEach((group) => {
    slideSquaresInGroup(group, promises);
  });

  await Promise.all(promises);

  grid.cells.forEach(cell => {cell.hasSquareForMerge() && cell.mergeSquares()})
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
