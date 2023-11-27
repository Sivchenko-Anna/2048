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

function moveDown() {
  slideSquare(grid.cellsColumnGroupRevers);
}

function moveRight() {
  slideSquare(grid.cellsRowGroupRevers);
}

function moveLeft() {
  slideSquare(grid.cellsRowGroup);
}

// смещение и объединение группы ячеек
function slideSquare(cellsGroup) {
  cellsGroup.forEach((group) => {
    slideSquaresInGroup(group);
  });

  grid.cells.forEach(cell => {cell.hasSquareForMerge() && cell.mergeSquares()})
}

// смещение квадратов в группе
function slideSquaresInGroup(group) {
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

    if (targetCell.isEmpty()) {
      targetCell.setLinkSquare(cellWithSquare.linkedSquare);
    } else {
      targetCell.setLinkSquareForMerge(cellWithSquare.linkedSquare);
    }

    cellWithSquare.removeLinkSquare();
  }
}
