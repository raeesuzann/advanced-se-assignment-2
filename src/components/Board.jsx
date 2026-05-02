import Square from "./Square";
import { getWinningSquares } from "../utils/gameLogic";

export default function Board({
    board,
    handleClick,
    boardLocked,
}) {
    const winningSquares = getWinningSquares(board);

    return (
        <div
            className={`board ${boardLocked ? "locked" : ""}`}
            role="grid"
            aria-label="Tic Tac Toe board game"
        >
            {board.map((cell, index) => (
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
