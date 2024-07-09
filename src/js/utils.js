import { OPERATIONS } from "./constants.js";

export const isOverLength = (input, maxLength) => input.length > maxLength;

export const operators = {
    [OPERATIONS.PLUS.toLowerCase()]: (x, y) => x + y,
    [OPERATIONS.MINUS.toLowerCase()]: (x, y) => x - y,
    [OPERATIONS.DIVIDE.toLowerCase()]: (x, y) => Math.floor(x / y),
    [OPERATIONS.MULTIPLE.toLowerCase()]: (x, y) => x * y,
  }