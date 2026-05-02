import { DIFFICULTY_OPTIONS } from "../constants/game";

export default function Menu({
  level,
  setLevel,
  startLocal,
  startCpu,
  theme,
  toggleTheme,
}) {
  const currentLevel =
    DIFFICULTY_OPTIONS.find(
      (option) => option.value === level
    ) ?? DIFFICULTY_OPTIONS[0];

  return (
    <main className="screen menu-screen fade-in">
      <div className="ambient ambient-a" />
      <div className="ambient ambient-b" />

      <section className="menu-shell card">
        <div className="menu-topbar">
          <span className="eyebrow">Emilio Oscar</span>

          <button
            type="button"
            className="ghost-button theme-toggle"
            onClick={toggleTheme}
          >
            {theme === "dark" ? "Day Mode" : "Night Mode"}
          </button>
        </div>

        <div className="menu-layout">
          <div className="menu-copy">
            <h1>Tic Tac Toe</h1>
            <p className="lede">
              Choose a mode, tune the AI, and jump into a
              brighter take on the classic 3x3 duel.
            </p>

            <div className="note-grid">
              <article className="note-card">
                <span className="note-kicker">
                  Local duel
                </span>
                <p>
                  Fast pass-and-play rounds with the score
                  carrying across rematches.
                </p>
              </article>

              <article className="note-card">
                <span className="note-kicker">
                  CPU ladder
                </span>
                <p>
                  Start casual, then turn the difficulty up
                  to an unbeatable AI.
                </p>
              </article>
            </div>
          </div>

          <div className="menu-actions">
            <button
              type="button"
              className="mode-card mode-primary"
              onClick={startLocal}
            >
              <span className="mode-label">
                Pass and play
              </span>
              <strong>Local Multiplayer</strong>
              <small>
                Two players share the same board and race the
                running scoreboard.
              </small>
            </button>

            <button
              type="button"
              className="mode-card mode-secondary"
              onClick={startCpu}
            >
              <span className="mode-label">Solo run</span>
              <strong>Play vs Computer</strong>
              <small>
                Face the AI and see how far you can push the
                difficulty.
              </small>
            </button>

            <label className="field">
              <span className="field-label">
                CPU difficulty
              </span>

              <select
                className="select-control"
                value={level}
                onChange={(event) =>
                  setLevel(Number(event.target.value))
                }
              >
                {DIFFICULTY_OPTIONS.map((option) => (
                  <option
                    key={option.value}
                    value={option.value}
                  >
                    {option.label}
                  </option>
                ))}
              </select>

              <small className="field-hint">
                Current setting: {currentLevel.label}
              </small>
            </label>
          </div>
        </div>
      </section>
    </main>
  );
}
