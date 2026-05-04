import { describe, expect, it, vi } from "vitest";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

vi.mock("../../src/utils/gameLogic", () => ({
    checkWinner: vi.fn(),
}));

vi.mock("../../src/utils/aiLogic", () => ({
    getComputerMove: vi.fn(() => null),
}));

vi.mock("../../src/components/Board", () => ({
    default: ({ board, handleClick, winner }) => (
        <div>
        {board.map((value, index) => {
            // naive highlight: ALL squares highlighted when winner exists
            const highlight = Boolean(winner);

            return (
            <button
                key={index}
                data-testid="square"
                data-highlight={highlight}
                onClick={() => handleClick(index)}
            >
                {value ?? ""}
            </button>
            );
        })}
        </div>
    ),
}));

vi.mock("../../src/components/Menu", () => ({
    default: ({ startLocal }) => (
        <button onClick={startLocal}>Start Local</button>
    ),
}));


import { checkWinner } from "../../src/utils/gameLogic";

describe("App", () => {
    it("Should starts local game when clicking start local", async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        expect(screen.getByText(/local match/i)).toBeInTheDocument();
    });

    it("Should highlights squares when there is a winner", async () => {
        const user = userEvent.setup();

        checkWinner.mockReturnValue("X");

        render(<App />);

        await user.click(screen.getByText(/start local/i));

        const squares = screen.getAllByTestId("square");

        const highlighted = squares.filter(
            (sq) => sq.dataset.highlight === "true"
        );

        expect(highlighted.length).toBeGreaterThan(0);
    });
    
});

vi.mock("../../src/utils/gameLogic", () => ({
    checkWinner: vi.fn(() => null),
}));

vi.mock("../../src/components/Board", () => ({
    default: ({ board, handleClick }) => (
        <div>
        {board.map((value, i) => (
            <button
            key={i}
            aria-label={`square ${i}`}
            onClick={() => handleClick(i)}
            >
            {value ?? ""}
            </button>
        ))}
        </div>
    ),
}));

vi.mock("../../src/components/Controls", () => ({
    default: ({ resetBoard, fullReset }) => (
        <div>
        <button onClick={resetBoard}>Reset Board</button>
        <button onClick={fullReset}>Back to Menu</button>
        </div>
    ),
}));

vi.mock("../../src/components/Menu", () => ({
    default: ({ startLocal }) => (
        <button onClick={startLocal}>Start Local</button>
    ),
}));

vi.mock("../../src/components/Scoreboard", () => ({
    default: ({ score }) => (
        <div>
        <div>Player X {score.X}</div>
        <div>Player O {score.O}</div>
        <div>Draws {score.Draw}</div>
        </div>
    ),
}));

describe("Restart game - resetBoard", () => {
    it("clears board but keeps score", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByText(/start local/i));

        const squares = screen.getAllByRole("button", {
        name: /square/i,
        });

        await user.click(squares[0]);

        await user.click(screen.getByText(/reset/i));

        squares.forEach((sq) => {
        expect(sq).toHaveTextContent("");
        });

        expect(screen.getByText(/player x/i)).toBeInTheDocument();
    });
});