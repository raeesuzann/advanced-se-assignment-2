// Square component representing each cell in the tic-tac-toe grid, displaying the current value (X or O) and handling user interactions
export default function Square({
    index,
    value,
    onClick,
    highlight,
    disabled
}) {
    // Render the square as a button, applying styles based on its state (highlighted for winning squares, disabled if occupied or board is locked) and providing an accessible label for screen readers
    return (
        <button
            type="button"
            className={`square ${highlight ? "win" : ""} ${value ? value.toLowerCase() : ""}`}
            onClick={onClick}
            disabled={disabled}
            aria-label={
                value
                    ? `Square ${index + 1}, ${value}`
                    : `Square ${index + 1}, empty`
            }
        >
            {value}
        </button>
    );
}


//{value ?? (  depends if we add to add numbers to the squares for accessibility or not
//<span className="square-placeholder">
//{index + 1}
// </span>