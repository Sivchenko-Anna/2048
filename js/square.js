export class Square {
  constructor(cellElement) {
    this.squareElement = document.createElement("div");
    this.squareElement.classList.add("square");
    this.number = Math.random() > 0.5 ? 2 : 4;
    this.squareElement.textContent = this.number;
    cellElement.append(this.squareElement);
  }
}