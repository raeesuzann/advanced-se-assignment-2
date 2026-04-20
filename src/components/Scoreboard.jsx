// Scoreboard component renders the current scores for both players and the number of draws in the tic-tac-toe game
export default function Scoreboard({
    score
}) {
    // Define the items to be displayed on the scoreboard, including player labels, their respective scores, and a tone for styling
    const items = [
        // Score item for Player X, showing the label "Player X", the current score from the score object, and a tone for styling
        {
            label: "Player X",
            value: score.X,
            tone: "x"
        },
        // Score item for Player O, showing the label "Player O", the current score from the score object, and a tone for styling
        {
            label: "Player O",
            value: score.O,
            tone: "o"
        },
        // Score item for Draws, showing the label "Draws", the current number of draws from the score object, and a tone for styling
        {
            label: "Draws",
            value: score.Draw,
            tone: "draw"
        }
    ];
    // Render the scoreboard with the defined items, displaying each player's score and the number of draws in a styled format
    return (
        <div className="scoreboard">
            {items.map((item) => (
                <article
                    key={item.label}
                    className={`score-tile score-tile-${item.tone}`}
                >
                    <span className="score-label">
                        {item.label}
                    </span>
                    <strong className="score-value">
                        {item.value}
                    </strong>
                </article>
            ))}
        </div>
    );
}
