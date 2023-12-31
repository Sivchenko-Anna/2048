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
  setLinkSquareForMerge(square) {
    square.setXY(this.x, this.y);
    this.linkedSquareForMerge = square;
  }

  // удаление ссылки на merge
  removeLinkSquareForMerge() {
    this.linkedSquareForMerge = null;
  }

  // проверка возможности объединения квадратов
  hasSquareForMerge() {
    return !!this.linkedSquareForMerge;
  }

  // объединение квадратов с одинаковым значением
  mergeSquares() {
    this.linkedSquare.setValue(
      this.linkedSquare.value + this.linkedSquareForMerge.value
    );
    this.linkedSquareForMerge.removeFromDOM();
    this.removeLinkSquareForMerge();
  }
}
