export class Cell {
  constructor(cellElement, x, y) {
    const cell = document.createElement("div");
    cell.classList.add("cell");
    cellElement.append(cell);
    this.x = x;
    this.y = y;
  }
}
