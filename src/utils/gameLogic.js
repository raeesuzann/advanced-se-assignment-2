export const WINNING_PATTERNS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

export function getWinningSquares(board) {
  for (const pattern of WINNING_PATTERNS) {
    const [a, b, c] = pattern;

    if (
      board[a] &&
      board[a] === board[b] &&
      board[a] === board[c]
    ) {
      return pattern;
    }
  }

  return [];
}

export function checkWinner(board) {
  const winningSquares = getWinningSquares(board);

  if (winningSquares.length === 0) {
    return null;
  }

  return board[winningSquares[0]];
}

export function isBoardFull(board) {
  return board.every((cell) => cell !== null);
}

export function checkDraw(
  board,
  winner = checkWinner(board)
) {
  return !winner && isBoardFull(board);
}

export { WINNING_PATTERNS as patterns };
