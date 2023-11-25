export class Cell {
  constructor(cellElement, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellElement.append(cell);
    this.x = x;
    this.y = y;
  }

  // устанавливаем связь ячейки и квадрата
  setLinkSquare(square) {
    square.setXY(this.x, this.y);
    this.linkedSquare = square;
  }

  // проверяем ячейку на отсутствие квадрата
  isEmpty() {
    return !this.linkedSquare;
  }
}
