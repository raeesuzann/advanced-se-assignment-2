import Square from "./Square";
import { patterns } from "../utils/gameLogic";

// Board component renders the tic-tac-toe grid and handles the display of winning squares
export default function Board({
    board,
    handleClick,
    winner,
    boardLocked
}) {
    // Determine which squares are part of the winning pattern, if there's a winner
    let winningSquares = [];

    // Check each winning pattern to see if it matches the current board state
    if (winner) {
        for (let [a, b, c] of patterns) {
            if (                     // Check if the squares in the current pattern are all occupied by the same player's mark
                board[a] &&
                board[a] === board[b] &&
                board[a] === board[c]
            ) {
                winningSquares = [a, b, c];
            }
        }
    }
    // Render the board with Square components, highlighting winning squares and disabling interaction if the board is locked
    return (
        <div
            className={`board ${boardLocked ? "locked" : ""}`}
            role="grid"
            aria-label="Tic Tac Toe board"
        >
            {board?.map((cell, index) => (
                <Square
                    key={index}
                    index={index}
                    value={cell}
                    onClick={() => handleClick(index)}
                    highlight={winningSquares.includes(index)}
                    disabled={boardLocked || Boolean(cell)}
                />
            ))}
        </div>
    );
}
