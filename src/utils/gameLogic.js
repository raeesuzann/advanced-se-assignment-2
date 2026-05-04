// Define the winning patterns for tic-tac-toe, which represent the indices of the board that need to be occupied by the same player to win the game
const patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Horizontal winning patterns
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Vertical winning patterns
    [0, 4, 8], [2, 4, 6] // Diagonal winning patterns
];
// Function to check if there's a winner on the board by iterating through the winning patterns and checking if any pattern is fully occupied by the same player's mark (X or O)
export function checkWinner(board) {
    for (let [a, b, c] of patterns) {

        // Check if the squares in the current pattern are all occupied by the same player's mark, indicating a win for that player
        if (
            board[a] &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {
            return board[a]; // Return the mark of the winning player (X or O)
        }
    }

    return null; // If no winner is found, return null
}

export { patterns }; ///