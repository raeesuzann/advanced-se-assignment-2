import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("Should starts local game when clicking start local", async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        expect(screen.getByText(/local match/i)).toBeInTheDocument();
    });

    it("Should highlights squares when there is a winner", async () => {
        render(<App />);
        const user = userEvent.setup();

        // start game
        await user.click(
            screen.getByRole('button', { name: /Local Multiplayer/i })
        );

        const squares = await screen.findAllByTestId('square');

        // simulate real gameplay
        await user.click(squares[0]);
        await user.click(squares[3]);
        await user.click(squares[1]);
        await user.click(squares[4]);
        await user.click(squares[2]);

        // wait for UI update
        await waitFor(() => {
            const updatedSquares = screen.getAllByTestId('square');

            const highlighted = updatedSquares.filter(sq =>
            sq.classList.contains('win')
            );

            expect(highlighted.length).toBe(3); // winning line
        });
    });
    
});

describe("Restart game - resetBoard", () => {
    it("Should clears board and start next round", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByText(/Local Multiplayer/i));

        const squares = screen.getAllByRole("button", {
            name: /square/i,
        });

        await user.click(squares[0]);

        await user.click(screen.getByText(/Next Round/i));

        const updatedSquares = screen.getAllByRole("button", {
            name: /square/i,
        });

        updatedSquares.forEach((sq) => {
            expect(sq).not.toHaveTextContent("X");
            expect(sq).not.toHaveTextContent("O");
        });

        expect(screen.getByText(/player x/i)).toBeInTheDocument();
    });

    it("Should reset entire game and return to start screen", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByText(/Local Multiplayer/i));
        const squares = screen.getAllByRole("button", {
            name: /square/i,
        });

        await user.click(squares[0]);
        await user.click(screen.getByText(/Main Menu/i));
        expect(screen.getByText(/Local Multiplayer/i)).toBeInTheDocument();
        const squaresAfterReset = screen.queryAllByRole("button", {
            name: /square/i,
        });

        expect(squaresAfterReset.length).toBe(0);
    });
});