import { describe, expect, it } from "vitest";
import App from "../../src/App";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("App", () => {
    it("Should renders heading", () => {
        render(<App />);

        const heading = screen.getByRole('heading')

        expect(heading).toBeInTheDocument();
    });
    
    it("Should starts local game when clicking start local", async () => {
        const user = userEvent.setup();
        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        expect(screen.getByText(/local match/i)).toBeInTheDocument();
    });

});

describe("Player turn display", () => {
    it("Should starts with X to move", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));


        expect(screen.getByText(/x to move/i)).toBeInTheDocument();
    });

    it("switches to O after X plays", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        const squares = screen.getAllByRole("button");

        await user.click(squares[0]); // X plays

        expect(screen.getByText(/ to move/i)).toBeInTheDocument();
    });

    it("switches back to X after O plays", async () => {
        const user = userEvent.setup();

        render(<App />);

        await user.click(screen.getByRole("button", { name: /local/i }));

        const squares = screen.getAllByRole("button");

        await user.click(squares[0]); // X
        await user.click(squares[1]); // O

        expect(screen.getByText(/x to move/i)).toBeInTheDocument();
    });
});