import {
  checkWinner,
  WINNING_PATTERNS,
} from "./gameLogic";

function getEmptySquares(board) {
  return board
    .map((cell, index) => (cell === null ? index : null))
    .filter((index) => index !== null);
}

function getRandomMove(board) {
  const moves = getEmptySquares(board);
  return moves[Math.floor(Math.random() * moves.length)];
}

function findWinningMove(board, player) {
  for (const [a, b, c] of WINNING_PATTERNS) {
    const line = [board[a], board[b], board[c]];
    const playerCount = line.filter(
      (cell) => cell === player
    ).length;
    const emptyIndex = line.indexOf(null);

    if (playerCount === 2 && emptyIndex !== -1) {
      return [a, b, c][emptyIndex];
    }
  }

  return null;
}

export function getComputerMove(board, level) {
  switch (level) {
    case 1:
      return getRandomMove(board);

    case 2:
      return board[4] === null
        ? 4
        : getRandomMove(board);

    case 3:
      return (
        findWinningMove(board, "O") ??
        findWinningMove(board, "X") ??
        getRandomMove(board)
      );

    case 4:
      return (
        findWinningMove(board, "O") ??
        findWinningMove(board, "X") ??
        (board[4] === null ? 4 : null) ??
        [0, 2, 6, 8].find(
          (index) => board[index] === null
        ) ??
        getRandomMove(board)
      );

    case 5:
      return getMinimaxMove(board);

    default:
      return getRandomMove(board);
  }
}

function getMinimaxMove(board) {
  let bestScore = -Infinity;
  let bestMove = null;

  for (const index of getEmptySquares(board)) {
    board[index] = "O";
    const score = minimax(board, false);
    board[index] = null;

    if (score > bestScore) {
      bestScore = score;
      bestMove = index;
    }
  }

  return bestMove;
}

function minimax(board, isMaximizing) {
  const winner = checkWinner(board);

  if (winner === "O") return 1;
  if (winner === "X") return -1;
  if (board.every((cell) => cell)) return 0;

  if (isMaximizing) {
    let bestScore = -Infinity;

    for (const index of getEmptySquares(board)) {
      board[index] = "O";
      bestScore = Math.max(
        bestScore,
        minimax(board, false)
      );
      board[index] = null;
    }

    return bestScore;
  }

  let bestScore = Infinity;

  for (const index of getEmptySquares(board)) {
    board[index] = "X";
    bestScore = Math.min(
      bestScore,
      minimax(board, true)
    );
    board[index] = null;
  }

  return bestScore;
}
