import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import Board from "../../src/components/Board";
import userEvent from "@testing-library/user-event";

vi.mock("./Square", () => ({
    default: ({ index }) => <button data-testid="square">{index}</button>,
}));

it("renders 9 squares", () => {
    const board = Array(9).fill(null);

    render(<Board board={board} />);

    expect(screen.getByRole('button', {name: /Square 1/i})).toBeInTheDocument();
});

describe("Board", () => {
    it("Should display board text with the title", () => {
        render(<Board />)

        const text = screen.getByLabelText(/tic tac toe board/i);

        expect(text).toBeInTheDocument()
    })

    it("Should pass correct value to thße squares", () => {
        const board = ["X", null, "O", null, null, null, null, null, null];

        render(<Board board={board} />);

        const squares = screen.getAllByTestId("square");

        expect(squares[0]).toHaveTextContent("X");
        expect(squares[2]).toHaveTextContent("O");
    });

    it("Should calls handleClick with correct index", async () => {
        const handleClick = vi.fn();
        const board = Array(9).fill(null);

        render(<Board board={board} handleClick={handleClick} />);

        const squares = screen.getAllByTestId("square");
        const buttonClick = userEvent.setup()
        await buttonClick.click(squares[3])

        expect(handleClick).toHaveBeenCalledWith(3);
    });

    it("Should disable squares when board is locked", () => {
        const board = Array(9).fill(null);

        render(<Board board={board} boardLocked={true} />);

        const squares = screen.getAllByTestId("square");

        squares.forEach((sq) => {
            expect(sq).toBeDisabled();
        });
    });

    it("Should disable square if already filled", () => {
        const board = ["X", null, null, null, null, null, null, null, null];

        render(<Board board={board} boardLocked={false} />);

        const squares = screen.getAllByTestId("square");

        expect(squares[0]).toBeDisabled();
        expect(squares[1]).not.toBeDisabled();
    });

    it("Should highlights winning squares", () => {
        const board = ["X", "X", "X", null, null, null, null, null, null];

        render(<Board board={board} winner="X" />);

        const squares = screen.getAllByTestId("square");

        expect(squares[0]).toHaveAttribute("data-highlight", "true");
        expect(squares[1]).toHaveAttribute("data-highlight", "true");
        expect(squares[2]).toHaveAttribute("data-highlight", "true");
    });
})

