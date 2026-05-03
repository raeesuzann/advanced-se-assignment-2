export default function Scoreboard({
    score
}) {
    const leader =
        score.X === score.O
            ? null
            : score.X > score.O
                ? "x"
                : "o";
    const leadAmount = Math.abs(score.X - score.O);
    const summary = leader
        ? `Player ${leader.toUpperCase()} leads by ${leadAmount}`
        : "Tie game";

    const items = [
        {
            label: "Player X",
            value: score.X,
            tone: "x"
        },
        {
            label: "Player O",
            value: score.O,
            tone: "o"
        },
        {
            label: "Draws",
            value: score.Draw,
            tone: "draw"
        }
    ];

    return (
        <section className="scoreboard-group" aria-label="Scoreboard">
            <p
                className={`scoreboard-summary ${
                    leader ? "has-leader" : "is-tied"
                }`}
            >
                {summary}
            </p>

            <div className="scoreboard">
                {items.map((item) => {
                    const isLeader = leader === item.tone;

                    return (
                        <article
                            key={item.label}
                            className={`score-tile score-tile-${item.tone} ${
                                isLeader ? "score-tile-leading" : ""
                            }`}
                        >
                            <div className="score-tile-top">
                                <span className="score-label">
                                    {item.label}
                                </span>
                                {isLeader ? (
                                    <span className="score-chip">
                                        Leading
                                    </span>
                                ) : null}
                            </div>
                            <strong className="score-value">
                                {item.value}
                            </strong>
                        </article>
                    );
                })}
            </div>
        </section>
    );
}
