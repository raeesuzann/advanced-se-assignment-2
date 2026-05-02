import { useEffect, useRef, useState } from "react";
import {
  DEFAULT_DIFFICULTY,
  GAME_MODES,
  PLAYER_MARKS,
  ROUND_RESULTS,
  createEmptyBoard,
  createInitialScore,
} from "../constants/game";
import { getComputerMove } from "../utils/aiLogic";
import { checkDraw, checkWinner } from "../utils/gameLogic";

function buildRoundKey(board, roundResult) {
  return `${roundResult}:${board
    .map((cell) => cell ?? "-")
    .join("")}`;
}

export function useTicTacToe() {
  const [mode, setMode] = useState(GAME_MODES.MENU);
  const [level, setLevel] = useState(DEFAULT_DIFFICULTY);
  const [board, setBoard] = useState(createEmptyBoard);
  const [xTurn, setXTurn] = useState(true);
  const [score, setScore] = useState(createInitialScore);
  const scoredRoundRef = useRef(null);

  const winner = checkWinner(board);
  const draw = checkDraw(board, winner);
  const activeMark = xTurn
    ? PLAYER_MARKS.X
    : PLAYER_MARKS.O;
  const isCpuTurn =
    mode === GAME_MODES.CPU &&
    !xTurn &&
    !winner &&
    !draw;

  useEffect(() => {
    if (!isCpuTurn) {
      return undefined;
    }

    const timer = window.setTimeout(() => {
      const move = getComputerMove(board, level);

      if (move !== null) {
        setBoard((currentBoard) => {
          const nextBoard = [...currentBoard];
          nextBoard[move] = PLAYER_MARKS.O;
          return nextBoard;
        });
        setXTurn(true);
      }
    }, 400);

    return () => window.clearTimeout(timer);
  }, [board, isCpuTurn, level]);

  useEffect(() => {
    const roundResult = winner ?? (draw ? ROUND_RESULTS.DRAW : null);

    if (!roundResult) {
      scoredRoundRef.current = null;
      return;
    }

    const resultKey = buildRoundKey(board, roundResult);

    if (scoredRoundRef.current === resultKey) {
      return;
    }

    scoredRoundRef.current = resultKey;
    setScore((currentScore) => ({
      ...currentScore,
      [roundResult]: currentScore[roundResult] + 1,
    }));
  }, [board, draw, winner]);

  function handleClick(index) {
    if (board[index] || winner || draw || isCpuTurn) {
      return;
    }

    setBoard((currentBoard) => {
      const nextBoard = [...currentBoard];
      nextBoard[index] = activeMark;
      return nextBoard;
    });
    setXTurn((currentTurn) => !currentTurn);
  }

  function resetBoard() {
    setBoard(createEmptyBoard());
    setXTurn(true);
  }

  function resetGame() {
    resetBoard();
    setScore(createInitialScore());
    setMode(GAME_MODES.MENU);
  }

  function startLocalGame() {
    resetBoard();
    setMode(GAME_MODES.LOCAL);
  }

  function startCpuGame() {
    resetBoard();
    setMode(GAME_MODES.CPU);
  }

  return {
    activeMark,
    board,
    draw,
    handleClick,
    isCpuTurn,
    level,
    mode,
    resetBoard,
    resetGame,
    score,
    setLevel,
    startCpuGame,
    startLocalGame,
    winner,
    xTurn,
  };
}
