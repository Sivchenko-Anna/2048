export class Cell {
  constructor(cellElement, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellElement.append(cell);
    this.x = x;
    this.y = y;
  }

  // устанавление связи ячейки и квадрата
  setLinkSquare(square) {
    square.setXY(this.x, this.y);
    this.linkedSquare = square;
  }

  // удаление связи ячейки и квадрата
  removeLinkSquare() {
    this.linkedSquare = null;
  }

  // проверка ячейки на отсутствие квадрата
  isEmpty() {
    return !this.linkedSquare;
  }
}
