import { Cell } from "./cell.js";

const GRID_SIZE = 4;
const CELLS_COUNT = GRID_SIZE * GRID_SIZE;

export class Grid {
  constructor(cellElement) {
    this.cells = [];
    for (let i = 0; i < CELLS_COUNT; i++) {
      this.cells.push(
        new Cell(cellElement, i % GRID_SIZE, Math.floor(i / GRID_SIZE))
      );
    }

    this.cellsColumnGroup = this.groupCellsByColumn();
    this.cellsColumnGroupRevers = this.cellsColumnGroup.map((column) =>
      [...column].reverse()
    );
    this.cellsRowGroup = this.groupCellsByRow();
    this.cellsRowGroupRevers = this.cellsRowGroup.map((row) =>
      [...row].reverse()
    );
  }

  //получение свободной ячейки
  getEmptyCell() {
    const emptyCells = this.cells.filter((cell) => cell.isEmpty());
    const randomIndex = Math.floor(Math.random() * emptyCells.length);
    return emptyCells[randomIndex];
  }

  //группировка ячеек по столбцам
  groupCellsByColumn() {
    return this.cells.reduce((columnGroups, cell) => {
      const columnIndex = cell.x;
      const columnCells = columnGroups[columnIndex] || [];
      columnCells[cell.y] = cell;
      columnGroups[columnIndex] = columnCells;
      return columnGroups;
    }, []);
  }

  //группировка ячеек по рядам
  groupCellsByRow() {
    return this.cells.reduce((rowGroups, cell) => {
      const columnIndex = cell.y;
      const columnCells = rowGroups[columnIndex] || [];
      columnCells[cell.x] = cell;
      rowGroups[columnIndex] = columnCells;
      return rowGroups;
    }, []);
  }
}
