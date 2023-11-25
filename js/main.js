import { Grid } from "./grid.js";
import { Square } from "./square.js";

const gameBoard = document.querySelector(".game-board");

const grid = new Grid(gameBoard);
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));
grid.getEmptyCell().setLinkSquare(new Square(gameBoard));
