import Menu from "./components/Menu";
import Board from "./components/Board";
import Scoreboard from "./components/Scoreboard";
import Controls from "./components/Controls";
import {
  DEFAULT_DIFFICULTY,
  DIFFICULTY_LABELS,
  GAME_MODES,
} from "./constants/game";
import { useTheme } from "./hooks/useTheme";
import { useTicTacToe } from "./hooks/useTicTacToe";

export default function App() {
  const { theme, toggleTheme } = useTheme();
  const {
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
  } = useTicTacToe();

  const levelLabel =
    DIFFICULTY_LABELS[level] ??
    DIFFICULTY_LABELS[DEFAULT_DIFFICULTY];
  const modeLabel =
    mode === GAME_MODES.CPU
      ? "Solo vs CPU"
      : "Local Duel";

  const statusTitle = winner
    ? `${winner} wins the round`
    : draw
      ? "Nobody cracked the grid"
      : `${activeMark} to move`;

  const statusDetail = winner
    ? "Queue up the next round to keep the score alive, or jump back to switch modes."
    : draw
      ? "Nine moves, no opening. Hit next round and settle it again."
      : mode === GAME_MODES.CPU
        ? xTurn
          ? `You are X. The CPU is set to ${levelLabel}.`
          : `Computer is lining up a ${levelLabel.toLowerCase()} move.`
        : "Pass the board and keep the local streak going.";

  const boardCaption = winner
    ? `Winning line locked in for ${winner}.`
    : draw
      ? "Every square is filled."
      : isCpuTurn
        ? "Board is locked while the CPU picks its move."
        : "Tap any open square to claim it.";

  if (mode === GAME_MODES.MENU) {
    return (
      <Menu
        level={level}
        setLevel={setLevel}
        theme={theme}
        toggleTheme={toggleTheme}
        startLocal={startLocalGame}
        startCpu={startCpuGame}
      />
    );
  }

  return (
    <main className="screen fade-in">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <section className="app-shell card">
        <header className="app-header">
          <div>
            <p className="eyebrow">
              {mode === GAME_MODES.CPU
                ? "Solo Match"
                : "Local Match"}
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
                {mode === GAME_MODES.CPU
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
              fullReset={resetGame}
            />
          </section>

          <section className="board-panel">
            <div className="board-frame">
              <Board
                board={board}
                handleClick={handleClick}
                boardLocked={
                  isCpuTurn || Boolean(winner) || draw
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
