export class Square {
  constructor(cellElement) {
    this.squareElement = document.createElement("div");
    this.squareElement.classList.add("square");
    this.setValue(Math.random() > 0.5 ? 2 : 4);
    cellElement.append(this.squareElement);
  }

  // установка координат квадрата
  setXY(x, y) {
    this.x = x;
    this.y = y;
    this.squareElement.style.setProperty("--x", x);
    this.squareElement.style.setProperty("--y", y);
  }

  // задаём квадрату цвет фона и текста
  setValue(value) {
    this.value = value;
    this.squareElement.textContent = this.value;
    const bgLightness = 100 - Math.log2(value) * 9; // 2 -> 100-1*9 = 91; 2048 -> 100-11*9 = 1
    this.squareElement.style.setProperty("--bg-lightness", `${bgLightness}%`);
    this.squareElement.style.setProperty(
      "--text-lightness",
      `${bgLightness < 50 ? 90 : 10}%`
    );
  }

  // удаление квадрата из DOM
  removeFromDOM() {
    this.squareElement.remove();
  }

  // ожидание окончания перемещения квадрата
  waitForEndTransition() {
    return new Promise((resolve) => {
      this.squareElement.addEventListener("transitionend", resolve, {
        once: true,
      });
    });
  }

  // ожидание окончания появления квадрата
  waitForEndAnimation() {
    return new Promise((resolve) => {
      this.squareElement.addEventListener("animationend", resolve, {
        once: true,
      });
    });
  }
}
