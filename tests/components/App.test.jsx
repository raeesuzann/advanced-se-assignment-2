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
    // it("Should renders heading", () => {
    //     render(<App />);

    //     const heading = screen.getByRole('heading')

    //     expect(heading).toBeInTheDocument();
    // });

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