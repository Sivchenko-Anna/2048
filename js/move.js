// смещение квадратов в группе
export function slideSquaresInGroup(group, promises) {
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

// проверка возможности квадратов внутри группы
export function canMoveInGroup(group) {
  return group.some((cell, index) => {
    if (index === 0) {
      return false;
    }

    if (cell.isEmpty()) {
      return false;
    }

    const targetCell = group[index - 1];
    return targetCell.canAcceptSquare(cell.linkedSquare);
  });
}

// проверка возможности движения группы квадратов
export function canMove(cellsGroup) {
  return cellsGroup.some((group) => canMoveInGroup(group));
}
