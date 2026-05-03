import { useEffect, useRef, useState } from "react";
import Menu from "./components/Menu";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import Controls from "./components/Controls";
import { checkWinner } from "./utils/gameLogic";
import { getComputerMove } from "./utils/aiLogic";
// Define labels for different difficulty levels of the computer opponent, 
// which will be displayed in the game interface to indicate the selected level of AI difficulty to the player
const difficultyLabels = {
  1: "Easy",
  2: "Normal",
  3: "Medium",
  4: "Hard",
  5: "Impossible"
};
// Main App component that manages the state and logic of the tic-tac-toe game, including game mode selection, board state, player turns, scoring, and theme toggling. 
// The component renders the appropriate interface based on the current game mode and provides interactive elements for gameplay and user experience.
export default function App() {
  const [mode, setMode] = useState("menu");
  const [level, setLevel] = useState(1);
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xTurn, setXTurn] = useState(true);
  const [score, setScore] = useState({
    X: 0,
    O: 0,
    Draw: 0
  });
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") {
      return "dark";
    }
    // Retrieve the user's preferred theme from local storage, defaulting to "dark" if no preference is found. This allows the application to remember the user's theme 
    // choice across sessions and provide a consistent experience.
    return window.localStorage.getItem("theme") || "dark";
  });

  const scoredRoundRef = useRef(null);
  const winner = checkWinner(board);
  const draw = !winner && board.every((cell) => cell);
  const activeMark = xTurn ? "X" : "O";
  const levelLabel = difficultyLabels[level] ?? difficultyLabels[1];
  const modeLabel = mode === "cpu" ? "Solo vs CPU" : "Local Duel";
  const isCpuTurn =
    mode === "cpu" && !xTurn && !winner && !draw;

  // Use the useEffect hook to apply the selected theme to the document and store the user's theme preference in local storage whenever the theme state changes. 
  // This ensures that the theme is consistently applied across the application and remembered for future visits.
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    window.localStorage.setItem("theme", theme);
  }, [theme]);

  useEffect(() => {
    if (mode !== "cpu" || xTurn || winner || draw) {
      return undefined;
    }

    // Set a timeout to simulate the computer's move after a short delay, allowing for a more natural and engaging gameplay experience. The computer's move is determined by the 
    // getComputerMove function based on the current board state and selected difficulty level.
    const timer = window.setTimeout(() => {
      const move = getComputerMove(board, level);

      if (move !== null) {
        const nextBoard = [...board];
        nextBoard[move] = "O";
        setBoard(nextBoard);
        setXTurn(true);
      }
    }, 400);

    // Clear the timeout if the component unmounts or if any of the dependencies change before the timeout completes, preventing potential memory leaks or unintended behavior.
    return () => window.clearTimeout(timer);
  }, [board, draw, level, mode, winner, xTurn]);

  // Use the useEffect hook to update the score whenever there's a winner or a draw. The effect checks if the current round result has already 
  // been scored using the scoredRoundRef to prevent duplicate scoring for the same board state. If there's a new winner or draw, it updates the score state accordingly.

  //
  const boardSignature = board
    .map((cell) => cell ?? "-")
    .join("");
  const resultKey = `${roundResult}:${boardSignature}`;

  if (scoredRoundRef.current === resultKey) {
    return;
  }

  // If there's a winner or a draw and the current round result has not been scored yet (checked using the scoredRoundRef), update the score state by incrementing the count for 
  // the corresponding result (X wins, O wins, or Draw) and store the current round result in the scoredRoundRef to prevent duplicate scoring for the same board state.
  scoredRoundRef.current = resultKey;
  setScore((prev) => ({
    ...prev,
    [roundResult]: prev[roundResult] + 1
  }));
}, [board, draw, winner]);

function toggleTheme() {
  setTheme((current) =>
    current === "dark" ? "light" : "dark"
  );
}

// Function to handle user clicks on the game board, which updates the board state with the active player's mark (X or O) if the clicked square is empty and the game is not over.
function handleClick(index) {
  if (
    board[index] ||
    winner ||
    draw ||
    isCpuTurn
  ) {
    return;
  }

  // Create a new board array by copying the existing board state and updating the clicked square with the active player's mark. Then, update the board state 
  // and toggle the player's turn.
  const nextBoard = [...board];
  nextBoard[index] = activeMark;

  setBoard(nextBoard);
  setXTurn(!xTurn);
}

// Function to reset the game board to its initial empty state and set the turn back to X, allowing players to start a new round while keeping the current score intact.
function resetBoard() {
  setBoard(Array(9).fill(null));
  setXTurn(true);
}

// Function to perform a full reset of the game, which resets the board, clears the scores for both players and draws, and returns the user to the main menu for mode selection.
function fullReset() {
  resetBoard();
  setScore({ X: 0, O: 0, Draw: 0 });
  setMode("menu");
}

// Define the status title and detail messages based on the current game state, including whether there's a winner, a draw, or if it's the CPU's turn. 
// These messages provide feedback to the player about the current status of the game and guide them on what to do next.
const statusTitle = winner
  ? `${winner} wins the round`
  : draw
    ? "Nobody cracked the grid"
    : `${activeMark} to move`;
//
const statusDetail = winner
  ? "Queue up the next round to keep the score alive, or jump back to switch modes."
  : draw
    ? "Nine moves, no opening. Hit next round and settle it again."
    : mode === "cpu"
      ? xTurn
        ? `You are X. The CPU is set to ${levelLabel}.`
        : `Computer is lining up a ${levelLabel.toLowerCase()} move.`
      : "Pass the board and keep the local streak going.";

// Define the caption for the game board based on the current game state, providing context and instructions to the player. 
// The caption changes dynamically to reflect whether there's a winner, a draw, or if it's the CPU's turn, guiding the player's actions accordingly.
const boardCaption = winner
  ? `Winning line locked in for ${winner}.`
  : draw
    ? "Every square is filled."
    : isCpuTurn
      ? "Board is locked while the CPU picks its move."
      : "Tap any open square to claim it.";

// If the current mode is "menu", render the Menu component, passing down the necessary props for level selection, theme toggling, 
// and starting the game in either local or CPU mode.
if (mode === "menu") {
  return (
    <Menu
      level={level}
      setLevel={setLevel}
      theme={theme}
      toggleTheme={toggleTheme}
      startLocal={() => setMode("local")}
      startCpu={() => setMode("cpu")}
    />
  );
}
// Render the main game interface, including the header with the game title and theme toggle button, the HUD panel with status badges and details, the scoreboard, controls for resetting the board and returning to the menu, and the game board itself. The layout is structured to provide a clear and engaging user experience while playing tic-tac-toe against another player or the computer opponent.
return (
  <main className="screen fade-in">
    <div className="ambient ambient-a" />
    <div className="ambient ambient-b" />

    <section className="app-shell card">
      <header className="app-header">
        <div>
          <p className="eyebrow">
            {mode === "cpu" ? "Solo Match" : "Local Match"}
          </p>
          <h1>Tic Tac Toe</h1>
          <p className="lede">
            Sharp rounds, a running scoreline, and a
            board that invites rematches.
          </p>
        </div>

        <button
          type="button"
          className="ghost-button theme-toggle"
          onClick={toggleTheme}
        >
          {theme === "dark" ? "Day Mode" : "Night Mode"}
        </button>
      </header>

      <div className="game-layout">
        <section className="hud-panel">
          <div className="status-badges">
            <span className="badge badge-accent">
              {modeLabel}
            </span>
            <span className="badge">
              {mode === "cpu"
                ? `Level ${level}: ${levelLabel}`
                : "Score carries between rounds"}
            </span>
          </div>

          <div
            className="status-block"
            role="status"
            aria-live="polite"
          >
            <h2 className="status-title">{statusTitle}</h2>
            <p className="status-detail">
              {statusDetail}
            </p>
          </div>

          <Scoreboard score={score} />

          <Controls
            resetBoard={resetBoard}
            fullReset={fullReset}
          />
        </section>

        <section className="board-panel">
          <div className="board-frame">
            <Board
              board={board}
              handleClick={handleClick}
              winner={winner}
              boardLocked={
                isCpuTurn || winner || draw
              }
            />
          </div>
          <p className="board-caption">
            {boardCaption}
          </p>
        </section>
      </div>
    </section>
  </main>
);
}
