// Controls component renders the buttons for resetting the board and returning to the main menu
export default function Controls({
    resetBoard,
    fullReset
}) {
    return (  // Render the control buttons for the game
        <div className="controls">
            <button
                type="button"
                className="action-button action-button-primary"
                onClick={resetBoard}
            >
                Next Round
            </button>

            <button
                type="button"
                className="action-button action-button-secondary"
                onClick={fullReset}
            >
                Main Menu
            </button>
        </div>
    );
}
