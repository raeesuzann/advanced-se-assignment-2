export const GAME_MODES = {
  MENU: "menu",
  LOCAL: "local",
  CPU: "cpu",
};

export const PLAYER_MARKS = {
  X: "X",
  O: "O",
};

export const ROUND_RESULTS = {
  DRAW: "Draw",
};

export const DEFAULT_DIFFICULTY = 1;

export const DIFFICULTY_OPTIONS = [
  { value: 1, label: "Level 1 - Easy", shortLabel: "Easy" },
  { value: 2, label: "Level 2 - Normal", shortLabel: "Normal" },
  { value: 3, label: "Level 3 - Medium", shortLabel: "Medium" },
  { value: 4, label: "Level 4 - Hard", shortLabel: "Hard" },
  { value: 5, label: "Level 5 - Unbeatable", shortLabel: "Unbeatable" },
];

export const DIFFICULTY_LABELS = Object.fromEntries(
  DIFFICULTY_OPTIONS.map(({ value, shortLabel }) => [value, shortLabel])
);

export function createEmptyBoard() {
  return Array(9).fill(null);
}

export function createInitialScore() {
  return {
    [PLAYER_MARKS.X]: 0,
    [PLAYER_MARKS.O]: 0,
    [ROUND_RESULTS.DRAW]: 0,
  };
}
