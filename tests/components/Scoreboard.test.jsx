import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import Scoreboard from "../../src/components/Scoreboard";

vi.mock("./utils/gameLogic", () => ({
    checkWinner: () => "X",
}));

it("Should updates score when X wins", () => {
    const score = { X: 1, O: 0 };
    render(<Scoreboard score={score} />);

    const cell = screen.getByText("1");

    expect(cell).toBeInTheDocument();
});


it("Should updates score when 0 wins", () => {
    const score = { X: 1, O: 0 };
    render(<Scoreboard score={score} />);
    
    const cell = screen.getByText("0");

    expect(cell).toBeInTheDocument();
});