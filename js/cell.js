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

  // проверка возвожности перемещение квадрата на новую ячейку
  canAcceptSquare(newSquare) {
    return (
      this.isEmpty() ||
      (!this.hasSquareForMerge() && this.linkedSquare.value === newSquare.value)
    );
  }

  // смена координат на новые и сохранение ссылки на merge
  linkSquareForMerge(square) {
    square.setXY(this.x, this.y);
    square.linkedSquareForMerge = square;
  }

  // проверка возможности объединения квадратов
  hasSquareForMerge() {
    return !!this.linkedSquareForMerge;
  }
}
