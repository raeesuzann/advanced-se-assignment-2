import {
    checkWinner,
    patterns
} from "./gameLogic";

// AI logic for tic-tac-toe, providing different levels of difficulty for the computer opponent
function empty(board) {
    return board
        .map((cell, i) =>
            cell === null ? i : null
        )
        .filter(i => i !== null);
}
// Function to select a random move from the available empty squares on the board
function randomMove(board) {
    const moves = empty(board);
    return moves[   // Select a random index from the available moves array and return the corresponding move
        Math.floor(Math.random() * moves.length)
    ];
}

// Function to find a winning move for the specified player, checking all winning patterns and returning the index of the move if found
function findWinningMove(board, player) {
    for (let [a, b, c] of patterns) {
        const line = [board[a], board[b], board[c]];
        const count =
            line.filter(x => x === player).length;
        const emptyIndex = line.indexOf(null);

        // If there are two of the player's marks in the line and one empty square, return the index of the empty square as the winning move
        if (count === 2 && emptyIndex !== -1) {
            return [a, b, c][emptyIndex];
        }
    }
    // If no winning move is found, return null
    return null;
}

// Main function to determine the computer's move based on the selected difficulty level, utilizing different strategies for each level of AI
export function getComputerMove(board, level) {
    switch (level) {

        // Level 1 - Easy: Random move selection from available squares
        case 1:
            return randomMove(board);

        // Level 2 - Normal: Prioritize the center square if available, otherwise select a random move
        case 2:
            return board[4] === null
                ? 4
                : randomMove(board);

        // Level 3 - Medium: First check for a winning move for the computer, then check for a blocking move against the opponent, and if neither is found, select a random move
        case 3:
            return (
                findWinningMove(board, "O") ??
                findWinningMove(board, "X") ??
                randomMove(board)
            );

        // Level 4 - Hard: Prioritize winning moves, then blocking moves, then take the center if available, followed by corners, and finally random moves if no strategic options are available
        case 4:
            return (
                findWinningMove(board, "O") ??
                findWinningMove(board, "X") ??
                (board[4] === null ? 4 : null) ??
                [0, 2, 6, 8].find(i =>
                    board[i] === null
                ) ??
                randomMove(board)
            );

        // Level 5 - Impossible: Use the minimax algorithm to evaluate all possible moves and select the optimal move for the computer opponent, ensuring that it never loses
        case 5:
            return minimaxMove(board);

        default:
            return randomMove(board);
    }
}
// Minimax algorithm implementation for the highest difficulty level, evaluating all possible moves and their outcomes to select the optimal move for the computer opponent
function minimaxMove(board) {
    let bestScore = -Infinity;
    let move = null;

    // Iterate through all empty squares on the board, simulating a move for the computer and evaluating the resulting board state using the minimax function to determine the best possible move
    for (let i of empty(board)) {
        board[i] = "O";
        let score = minimax(board, false);
        board[i] = null;
        // If the score for the simulated move is better than the best score found so far, update the best score and store the index of the move
        if (score > bestScore) {
            bestScore = score;
            move = i;
        }
    }

    return move;
}

// Minimax function recursively evaluates the game tree, returning a score based on the outcome of the game for the computer opponent (O) and the human player (X), allowing the AI to make informed decisions based on potential future moves
function minimax(board, isMax) {
    const winner = checkWinner(board);

    if (winner === "O") return 1;
    if (winner === "X") return -1;
    if (board.every(cell => cell)) return 0;

    // If the game is not over, recursively evaluate the game tree for both maximizing (computer) and minimizing (human) players, returning the best score for the current player
    if (isMax) {
        let best = -Infinity;

        for (let i of empty(board)) {
            board[i] = "O";
            best = Math.max(best,
                minimax(board, false));
            board[i] = null;
        }
        // If it's the maximizing player's turn (the computer), return the best score found, which represents the most favorable outcome for the computer opponent
        return best;
    } else {
        let best = Infinity;

        for (let i of empty(board)) {
            board[i] = "X";
            best = Math.min(best,
                minimax(board, true));
            board[i] = null;
        }
        // If it's the minimizing player's turn (the human), return the best score found, which represents the least favorable outcome for the computer opponent, guiding the AI to avoid moves that would lead to a loss
        return best;
    }
}