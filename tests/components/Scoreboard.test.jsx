import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Scoreboard from "../../src/components/Scoreboard";
import userEvent from "@testing-library/user-event";
import App from "../../src/App";

vi.mock("./utils/gameLogic", () => ({
    checkWinner: () => "X",
}));

describe("Scoreboard", () => {
    const mockScore = { X: 2, O: 1, Draw: 3 };

    it("Should renders Player X score.", () => {
        render(<Scoreboard score={mockScore} />);

        expect(screen.getByText("Player X")).toBeInTheDocument();
        expect(screen.getByText("2")).toBeInTheDocument();
    });

    it("Should renders Player O score.", () => {
        render(<Scoreboard score={mockScore} />);

        expect(screen.getByText("Player O")).toBeInTheDocument();
        expect(screen.getByText("1")).toBeInTheDocument();
    });

    it("Should renders Draws score.", () => {
        render(<Scoreboard score={mockScore} />);

        expect(screen.getByText("Draws")).toBeInTheDocument();
        expect(screen.getByText("3")).toBeInTheDocument();
    });

    it("Should renders exactly 3 score tiles.", () => {
        render(<Scoreboard score={mockScore} />);

        const articles = screen.getAllByRole("article");
        expect(articles).toHaveLength(3);
    });

    it("Should applies correct CSS classes for tones.", () => {
        render(<Scoreboard score={mockScore} />);

        expect(screen.getByText("Player X").closest("article"))
        .toHaveClass("score-tile-x");

        expect(screen.getByText("Player O").closest("article"))
        .toHaveClass("score-tile-o");

        expect(screen.getByText("Draws").closest("article"))
        .toHaveClass("score-tile-draw");
    });
});

describe("Draw detection", () => {
it("Should increments draw score when board is full and no winner", async () => {
    const user = userEvent.setup();

    render(<App />);

    await user.click(screen.getByText(/start/i));

    const squares = screen.getAllByRole("button");

    for (let i = 0; i < 9; i++) {
        await user.click(squares[i]);
    }

    expect(screen.getByText("Draws")).toBeInTheDocument();
    expect(screen.getByText("1")).toBeInTheDocument();
});
});